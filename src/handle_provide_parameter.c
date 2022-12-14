#include "lifi_plugin.h"

// Store the amount sent in the form of a string, without any ticker or decimals. These will be
// added when displaying.
static void handle_amount_sent(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    memcpy(context->amount_sent, msg->parameter, INT256_LENGTH);
    printf_hex_array("AMOUNT SENT: ", INT256_LENGTH, context->amount_sent);
}

static void handle_amount_received(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    memcpy(context->amount_received, msg->parameter, INT256_LENGTH);
    printf_hex_array("AMOUNT RECEIVED: ", INT256_LENGTH, context->amount_received);
}

// Stores the address of the sent token
static void handle_token_sent(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    memset(context->contract_address_sent, 0, sizeof(context->contract_address_sent));
    memcpy(context->contract_address_sent,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           ADDRESS_LENGTH);
    printf_hex_array("TOKEN SENT: ", ADDRESS_LENGTH, context->contract_address_sent);
}

// Stores the address of the received token
static void handle_token_received(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    memset(context->contract_address_received, 0, sizeof(context->contract_address_received));
    memcpy(context->contract_address_received,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           ADDRESS_LENGTH);
    printf_hex_array("TOKEN RECEIVED: ", ADDRESS_LENGTH, context->contract_address_received);
}

// Stores whether the transaction has a destination call or not
static void handle_call_to(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    context->has_dest_call = 0;
    // If this address is not equal to 0x00...00, there is a destination call
    if (memcmp(&msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
               NULL_ETH_ADDRESS,
               ADDRESS_LENGTH)) {
        context->has_dest_call += 1;
    }
    PRINTF("HAS DESTINATION CALL : %d\n", context->has_dest_call);
}

// Stores the receiver's address
static void handle_address_receiver(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    memset(context->contract_address_received, 0, sizeof(context->contract_address_received));
    memcpy(context->contract_address_received,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           sizeof(context->contract_address_received));
    printf_hex_array("ADDRESS RECEIVER: ", ADDRESS_LENGTH, context->contract_address_received);
}

// Stores the destination chain ID
static void handle_chain_receiver(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    // chain_id_receiver's memory is already set to 0
    memcpy(context->chain_id_receiver,
           &msg->parameter[PARAMETER_LENGTH - INT_64_LENGTH],
           INT_64_LENGTH);
    printf_hex_array("CHAIN RECEIVER: ", INT_64_LENGTH, context->chain_id_receiver);
}

static void handle_swap_tokens_generic(ethPluginProvideParameter_t *msg,
                                       lifi_parameters_t *context) {
    switch (context->next_param) {
        case AMOUNT_RECEIVED:
            handle_amount_received(msg, context);
            context->next_param = OFFSET;
            break;
        case OFFSET:
            context->offset = U2BE(msg->parameter, PARAMETER_LENGTH - sizeof(context->offset));
            context->next_param = SKIP;
            break;
        case SKIP:
            context->skip += 3;
            context->next_param = TOKEN_SENT;
            break;
        case TOKEN_SENT:
            handle_token_sent(msg, context);
            context->next_param = TOKEN_RECEIVED;
            break;
        case TOKEN_RECEIVED:
            handle_token_received(msg, context);
            context->next_param = AMOUNT_SENT;
            break;
        case AMOUNT_SENT:
            handle_amount_sent(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

static void handle_start_bridge_tokens_via_nxtp(ethPluginProvideParameter_t *msg,
                                                lifi_parameters_t *context) {
    switch (context->next_param) {
        case OFFSET:
            context->offset = U2BE(msg->parameter, PARAMETER_LENGTH - sizeof(context->offset));
            context->next_param = SKIP;
            break;
        case SKIP:
            context->skip += 3;
            context->next_param = TOKEN_SENT;
            break;
        case TOKEN_SENT:
            handle_token_sent(msg, context);
            context->next_param = ADDRESS_RECEIVER;
            break;
        case ADDRESS_RECEIVER:
            handle_address_receiver(msg, context);
            context->next_param = AMOUNT_SENT;
            break;
        case AMOUNT_SENT:
            handle_amount_sent(msg, context);
            context->next_param = CHAIN_RECEIVER;
            break;
        case CHAIN_RECEIVER:
            handle_chain_receiver(msg, context);
            context->skip += 1;
            context->next_param = CALL_TO;
            break;
        case CALL_TO:
            handle_call_to(msg, context);
            context->next_param = NONE;
            break;
        case NONE:
            break;
        default:
            PRINTF("Param not supported\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            break;
    }
}

void handle_provide_parameter(void *parameters) {
    ethPluginProvideParameter_t *msg = (ethPluginProvideParameter_t *) parameters;
    lifi_parameters_t *context = (lifi_parameters_t *) msg->pluginContext;
    printf_hex_array("LiFi plugin provide parameter: ", PARAMETER_LENGTH, msg->parameter);

    msg->result = ETH_PLUGIN_RESULT_OK;

    if (context->skip) {
        // Skip this step, and don't forget to decrease skipping counter.
        PRINTF("PARAMETER SKIPPED\n");
        context->skip--;
    } else {
        if ((context->offset) &&
            msg->parameterOffset != context->checkpoint + context->offset + SELECTOR_SIZE) {
            PRINTF("offset: %d, checkpoint: %d, parameterOffset: %d\n",
                   context->offset,
                   context->checkpoint,
                   msg->parameterOffset);
            return;
        }
        context->offset = 0;  // Reset offset
        switch (context->selectorIndex) {
            case SWAP_TOKENS_GENERIC: {
                handle_swap_tokens_generic(msg, context);
                break;
            }
            case START_BRIDGE_TOKENS_VIA_NXTP: {
                handle_start_bridge_tokens_via_nxtp(msg, context);
                break;
            }
            default:
                PRINTF("Selector Index %d not supported\n", context->selectorIndex);
                msg->result = ETH_PLUGIN_RESULT_ERROR;
                break;
        }
    }
}
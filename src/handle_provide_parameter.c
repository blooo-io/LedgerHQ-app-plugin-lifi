#include "lifi_plugin.h"

// Store the amount sent in the form of a string, without any ticker or decimals. These will be
// added when displaying.
static void handle_amount_sent(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    memcpy(context->amount_sent, msg->parameter, INT256_LENGTH);
}

static void handle_token_sent(ethPluginProvideParameter_t *msg, lifi_parameters_t *context) {
    memset(context->contract_address_sent, 0, sizeof(context->contract_address_sent));
    memcpy(context->contract_address_sent,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           ADDRESS_LENGTH);
    printf_hex_array("TOKEN SENT: ", ADDRESS_LENGTH, context->contract_address_sent);
}

static void handle_token_received(ethPluginProvideParameter_t *msg,
                                  lifi_parameters_t *context) {
    memset(context->contract_address_received, 0, sizeof(context->contract_address_received));
    memcpy(context->contract_address_received,
           &msg->parameter[PARAMETER_LENGTH - ADDRESS_LENGTH],
           ADDRESS_LENGTH);
    printf_hex_array("TOKEN RECEIVED: ", ADDRESS_LENGTH, context->contract_address_received);
}

static void handle_swap_tokens_generic(ethPluginProvideParameter_t *msg,
                                       lifi_parameters_t *context) {
    switch (context->next_param) {
        case OFFSET: // _swapData offset        
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
        case TOKEN_SENT:
            break;
        case TOKEN_RECEIVED:
            break;
        case ADDRESS_RECEIVER:
            break;
        case CHAIN_SENDER:
            break;
        case CHAIN_RECEIVER:
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
        PRINTF("SKIPPED\n");
        // Skip this step, and don't forget to decrease skipping counter.
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
        if (context->offset) {
            PRINTF("RESET OFFSET\n");
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
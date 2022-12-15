#include "lifi_plugin.h"

static const char *get_network_name(uint8_t *chain_id) {
    for (size_t i = 0; i < NUM_LIFI_NETWORKS; i++) {
        if (!memcmp(&LIFI_NETWORK_MAPPING[i].chain_id, chain_id, INT_64_LENGTH)) {
            return (const char *) LIFI_NETWORK_MAPPING[i].name;
        }
    }
    return "Unknown Network";
}

static void reverse_array(uint8_t *chain_id, uint8_t len) {
    uint8_t temp;
    for (uint8_t i = 0; i < len / 2; i++) {
        temp = chain_id[i];
        chain_id[i] = chain_id[len - i - 1];
        chain_id[len - i - 1] = temp;
    }
}

// Set UI for the "Send" screen.
static void set_send_ui(ethQueryContractUI_t *msg, lifi_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP_TOKENS_GENERIC:
        case START_BRIDGE_TOKENS_VIA_NXTP:
            strlcpy(msg->title, "Send", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    // set network ticker (ETH, BNB, etc) if needed
    if (ADDRESS_IS_NETWORK_TOKEN(context->contract_address_sent)) {
        strlcpy(context->ticker_sent, msg->network_ticker, sizeof(context->ticker_sent));
    }

    // Convert to string.
    amountToString(context->amount_sent,
                   INT256_LENGTH,
                   context->decimals_sent,
                   context->ticker_sent,
                   msg->msg,
                   msg->msgLength);
    PRINTF("AMOUNT SENT: %s\n", msg->msg);
}

// Set UI for "Receive" screen.
static void set_receive_ui(ethQueryContractUI_t *msg, lifi_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP_TOKENS_GENERIC:
            strlcpy(msg->title, "Receive", msg->titleLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    // set network ticker (ETH, BNB, etc) if needed
    if (ADDRESS_IS_NETWORK_TOKEN(context->contract_address_received)) {
        strlcpy(context->ticker_received, msg->network_ticker, sizeof(context->ticker_received));
    }

    // Convert to string.
    amountToString(context->amount_received,
                   INT256_LENGTH,
                   context->decimals_received,
                   context->ticker_received,
                   msg->msg,
                   msg->msgLength);
    PRINTF("AMOUNT RECEIVED: %s\n", msg->msg);
}

// Set UI for "Warning" screen for unknown tokens.
static void set_warning_token_ui(ethQueryContractUI_t *msg,
                                 const lifi_parameters_t *context __attribute__((unused))) {
    switch (context->selectorIndex) {
        case SWAP_TOKENS_GENERIC:
        case START_BRIDGE_TOKENS_VIA_NXTP:
            strlcpy(msg->title, "WARNING", msg->titleLength);
            strlcpy(msg->msg, "Unknown token", msg->msgLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}

// Set UI for "To Network" screen.
static void set_to_chain_ui(ethQueryContractUI_t *msg,
                            const lifi_parameters_t *context __attribute__((unused))) {
    uint8_t chain_id[INT_64_LENGTH];
    switch (context->selectorIndex) {
        case START_BRIDGE_TOKENS_VIA_NXTP:
            memcpy(chain_id, &context->chain_id_receiver, sizeof(chain_id));
            strlcpy(msg->title, "To network", msg->titleLength);
            strlcpy(msg->msg, get_network_name(chain_id), msg->msgLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}

// Set UI for "From Network" screen.
static void set_from_chain_ui(ethQueryContractUI_t *msg,
                              const lifi_parameters_t *context __attribute__((unused))) {
    uint8_t chain_id[INT_64_LENGTH];
    switch (context->selectorIndex) {
        case SWAP_TOKENS_GENERIC:
        case START_BRIDGE_TOKENS_VIA_NXTP:
            memcpy(chain_id, msg->pluginSharedRO->txContent->chainID.value, sizeof(chain_id));
            reverse_array(chain_id, INT_64_LENGTH);
            strlcpy(msg->title, "From network", msg->titleLength);
            strlcpy(msg->msg, get_network_name(chain_id), msg->msgLength);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}

// Set UI for "To Address" screen.
static void set_address_to_ui(ethQueryContractUI_t *msg, lifi_parameters_t *context) {
    strlcpy(msg->title, "To Address", msg->titleLength);

    msg->msg[0] = '0';
    msg->msg[1] = 'x';

    switch (context->selectorIndex) {
        case START_BRIDGE_TOKENS_VIA_NXTP:
            getEthAddressStringFromBinary((uint8_t *) context->contract_address_received,
                                          msg->msg + 2,
                                          msg->pluginSharedRW->sha3,
                                          0);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}

// Set UI for "Executes Contract Call" screen.
static void set_is_contract_call_screen(ethQueryContractUI_t *msg, lifi_parameters_t *context) {
    switch (context->selectorIndex) {
        case START_BRIDGE_TOKENS_VIA_NXTP:
            // Would overflow if we wrote "Executes a contract call"
            strlcpy(msg->title, "Executes contract call", msg->titleLength);
            if (context->has_dest_call) {
                strlcpy(msg->msg, "Yes", msg->titleLength);
            } else {
                strlcpy(msg->msg, "No", msg->titleLength);
            }
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}

// Helper function that returns the enum corresponding to the screen that should be
// displayed for the swapTokensGeneric selector
static screens_t get_screen_swap_tokens_generic(ethQueryContractUI_t *msg,
                                                lifi_parameters_t *context
                                                __attribute__((unused))) {
    uint8_t index = msg->screenIndex;

    bool token_sent_found = context->tokens_found & TOKEN_SENT_FOUND;
    bool token_received_found = context->tokens_found & TOKEN_RECEIVED_FOUND;

    bool both_tokens_found = token_received_found && token_sent_found;
    bool both_tokens_not_found = !token_received_found && !token_sent_found;

    switch (index) {
        case 0:
            if (both_tokens_found) {
                return SEND_SCREEN;
            } else if (both_tokens_not_found) {
                return WARN_TOKEN_SCREEN;
            } else if (token_sent_found) {
                return SEND_SCREEN;
            } else {
                return WARN_TOKEN_SCREEN;
            }
        case 1:
            if (both_tokens_found) {
                return RECEIVE_SCREEN;
            } else if (both_tokens_not_found) {
                return SEND_SCREEN;
            } else if (token_sent_found) {
                return WARN_TOKEN_SCREEN;
            } else {
                return SEND_SCREEN;
            }
        case 2:
            if (both_tokens_found) {
                return FROM_CHAIN_SCREEN;
            } else if (both_tokens_not_found) {
                return WARN_TOKEN_SCREEN;
            } else if (token_sent_found) {
                return RECEIVE_SCREEN;
            }
        case 3:
            if (both_tokens_not_found) {
                return RECEIVE_SCREEN;
            } else if (token_sent_found) {
                return FROM_CHAIN_SCREEN;
            } else {
                return ERROR;
            }
        case 4:
            if (both_tokens_not_found) {
                return FROM_CHAIN_SCREEN;
            } else {
                return ERROR;
            }
        default:
            return ERROR;
    }
    return ERROR;
}

// Helper function that returns the enum corresponding to the screen that should be
// displayed for the startBridgeTokensViaNXTP selector
static screens_t get_screen_start_bridge_tokens_via_nxtp(ethQueryContractUI_t *msg,
                                                         lifi_parameters_t *context
                                                         __attribute__((unused))) {
    uint8_t index = msg->screenIndex;

    bool token_sent_found = context->tokens_found & TOKEN_SENT_FOUND;

    switch (index) {
        case 0:
            if (token_sent_found) {
                return SEND_SCREEN;
            } else {
                return WARN_TOKEN_SCREEN;
            }
        case 1:
            if (token_sent_found) {
                return FROM_CHAIN_SCREEN;
            } else {
                return SEND_SCREEN;
            }
        case 2:
            if (token_sent_found) {
                return TO_CHAIN_SCREEN;
            } else {
                return FROM_CHAIN_SCREEN;
            }
        case 3:
            if (token_sent_found) {
                return TO_ADDRESS_SCREEN;
            } else {
                return TO_CHAIN_SCREEN;
            }
        case 4:
            if (token_sent_found) {
                return CALL_TO_SCREEN;
            } else {
                return TO_ADDRESS_SCREEN;
            }
        case 5:
            if (token_sent_found) {
                return ERROR;
            } else {
                return CALL_TO_SCREEN;
            }
        default:
            return ERROR;
    }
    return ERROR;
}

void handle_query_contract_ui(void *parameters) {
    ethQueryContractUI_t *msg = (ethQueryContractUI_t *) parameters;
    lifi_parameters_t *context = (lifi_parameters_t *) msg->pluginContext;
    memset(msg->title, 0, msg->titleLength);
    memset(msg->msg, 0, msg->msgLength);
    msg->result = ETH_PLUGIN_RESULT_OK;

    screens_t screen;
    switch (context->selectorIndex) {
        case SWAP_TOKENS_GENERIC:
            screen = get_screen_swap_tokens_generic(msg, context);
            break;
        case START_BRIDGE_TOKENS_VIA_NXTP:
            screen = get_screen_start_bridge_tokens_via_nxtp(msg, context);
            break;
        default:
            PRINTF("Unhandled selector Index: %d\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    switch (screen) {
        case SEND_SCREEN:
            set_send_ui(msg, context);
            break;
        case RECEIVE_SCREEN:
            set_receive_ui(msg, context);
            break;
        case TO_CHAIN_SCREEN:
            set_to_chain_ui(msg, context);
            break;
        case FROM_CHAIN_SCREEN:
            set_from_chain_ui(msg, context);
            break;
        case TO_ADDRESS_SCREEN:
            set_address_to_ui(msg, context);
            break;
        case WARN_TOKEN_SCREEN:
            set_warning_token_ui(msg, context);
            break;
        case CALL_TO_SCREEN:
            set_is_contract_call_screen(msg, context);
            break;
        default:
            PRINTF("Received an invalid screenIndex %d\n", screen);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}
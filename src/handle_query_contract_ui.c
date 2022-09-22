#include "lifi_plugin.h"

// Set UI for the "Send" screen.
static void set_send_ui(ethQueryContractUI_t *msg, lifi_parameters_t *context) {
    switch (context->selectorIndex) {
        case SWAP_TOKENS_GENERIC:
            strlcpy(msg->title, "Send", msg->titleLength);
            break;
        case START_BRIDGE_TOKENS_VIA_NXTP:
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
        case START_BRIDGE_TOKENS_VIA_NXTP:
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

// Set UI for "Warning" screen.
static void set_warning_ui(ethQueryContractUI_t *msg,
                           const lifi_parameters_t *context __attribute__((unused))) {
    strlcpy(msg->title, "WARNING", msg->titleLength);
    strlcpy(msg->msg, "Unknown token", msg->msgLength);
}

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

// Helper function that returns the enum corresponding to the screen that should be displayed.
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
            } else if (token_received_found) {
                return WARN_TOKEN_SCREEN;
            }
        case 1:
            if (both_tokens_found) {
                return RECEIVE_SCREEN;
            } else if (both_tokens_not_found) {
                return SEND_SCREEN;
            } else if (token_sent_found) {
                return WARN_TOKEN_SCREEN;
            } else if (token_received_found) {
                return SEND_SCREEN;
            }
        case 2:
            if (both_tokens_found) {
                return ERROR;
            } else if (both_tokens_not_found) {
                return WARN_TOKEN_SCREEN;
            } else {
                return RECEIVE_SCREEN;
            }
        case 3:
            if (both_tokens_not_found) {
                return RECEIVE_SCREEN;
            } else {
                return ERROR;
            }
        default:
            return ERROR;
    }
    return ERROR;
}

static screens_t get_screen_start_bridge_tokens_via_nxtp(ethQueryContractUI_t *msg,
                                                         lifi_parameters_t *context
                                                         __attribute__((unused))) {
    uint8_t index = msg->screenIndex;

    bool token_sent_found = context->tokens_found & TOKEN_SENT_FOUND;
    bool chain_id_receiver_found = context->chain_id_receiver;  // warning here

    switch (index) {
        case 0:
            if (token_sent_found && chain_id_receiver_found) {
                return SEND_SCREEN;
            } else if (!token_sent_found && !chain_id_receiver_found) {
                return WARN_TOKEN_SCREEN;
            } else if (!token_sent_found) {
                return WARN_TOKEN_SCREEN;
            } else if (!chain_id_receiver_found) {
                return SEND_SCREEN;
            }
        case 1:
            if (token_sent_found && chain_id_receiver_found) {
                return FROM_CHAIN_SCREEN;
            } else if (!token_sent_found && !chain_id_receiver_found) {
                return SEND_SCREEN;
            } else if (!token_sent_found) {
                return SEND_SCREEN;
            } else if (!chain_id_receiver_found) {
                return FROM_CHAIN_SCREEN;
            }
        case 2:
            if (token_sent_found && chain_id_receiver_found) {
                return TO_CHAIN_SCREEN;
            } else if (!token_sent_found && !chain_id_receiver_found) {
                return FROM_CHAIN_SCREEN;
            } else if (!token_sent_found) {
                return FROM_CHAIN_SCREEN;
            } else if (!chain_id_receiver_found) {
                return WARN_CHAIN_SCREEN;
            }
        case 3:
            if (token_sent_found && chain_id_receiver_found) {
                return TO_ADDRESS_SCREEN;
            } else if (!token_sent_found && !chain_id_receiver_found) {
                return WARN_CHAIN_SCREEN;
            } else if (!token_sent_found) {
                return TO_CHAIN_SCREEN;
            } else if (!chain_id_receiver_found) {
                return TO_CHAIN_SCREEN;
            }
        case 4:
            if (token_sent_found && chain_id_receiver_found) {
                return CALL_TO_SCREEN;
            } else if (!token_sent_found && !chain_id_receiver_found) {
                return TO_CHAIN_SCREEN;
            } else if (!token_sent_found) {
                return TO_ADDRESS_SCREEN;
            } else if (!chain_id_receiver_found) {
                return TO_ADDRESS_SCREEN;
            }
        case 5:
            if (token_sent_found && chain_id_receiver_found) {
                return ERROR;
            } else if (!token_sent_found && !chain_id_receiver_found) {
                return TO_ADDRESS_SCREEN;
            } else if (!token_sent_found) {
                return CALL_TO_SCREEN;
            } else if (!chain_id_receiver_found) {
                return CALL_TO_SCREEN;
            }
        case 6:
            if (!token_sent_found && !chain_id_receiver_found) {
                return CALL_TO_SCREEN;
            } else if (!token_sent_found) {
                return ERROR;
            } else if (!chain_id_receiver_found) {
                return ERROR;
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
            get_screen_swap_tokens_generic(msg, context);
        case START_BRIDGE_TOKENS_VIA_NXTP:
            get_screen_start_bridge_tokens_via_nxtp(msg, context);
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
        case FROM_CHAIN_SCREEN:
            break;
        case TO_CHAIN_SCREEN:
            break;
        case TO_ADDRESS_SCREEN:
            set_address_to_ui(msg, context);
            break;
        case WARN_TOKEN_SCREEN:
            set_warning_ui(msg, context);
            break;
        case WARN_CHAIN_SCREEN:
            break;
        case CALL_TO_SCREEN:
            break;
        default:
            PRINTF("Received an invalid screenIndex\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }
}

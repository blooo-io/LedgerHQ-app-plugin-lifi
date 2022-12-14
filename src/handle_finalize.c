#include "lifi_plugin.h"

static void sent_network_token(lifi_parameters_t *context) {
    context->decimals_sent = WEI_TO_ETHER;
    context->tokens_found |= TOKEN_SENT_FOUND;
}

static void received_network_token(lifi_parameters_t *context) {
    context->decimals_received = WEI_TO_ETHER;
    context->tokens_found |= TOKEN_RECEIVED_FOUND;
}

void handle_finalize(void *parameters) {
    ethPluginFinalize_t *msg = (ethPluginFinalize_t *) parameters;
    lifi_parameters_t *context = (lifi_parameters_t *) msg->pluginContext;
    if (context->valid) {
        msg->numScreens = 3;

        if (context->selectorIndex == START_BRIDGE_TOKENS_VIA_NXTP) {
            msg->numScreens += 2;
        }

        if (!ADDRESS_IS_NETWORK_TOKEN(context->contract_address_sent)) {
            // Address is not network token (0x000...) so we will look for the token in the CAL.
            printf_hex_array("Setting address sent to: ",
                             ADDRESS_LENGTH,
                             context->contract_address_sent);
            msg->tokenLookup1 = context->contract_address_sent;
        } else {
            sent_network_token(context);
            msg->tokenLookup1 = NULL;
        }
        // contract_address_received contains an account address in startBridgeTokensViaNXTP
        if (context->selectorIndex == SWAP_TOKENS_GENERIC) {
            if (!ADDRESS_IS_NETWORK_TOKEN(context->contract_address_received)) {
                // Address is not network token (0x000...) so we will look for the token in the CAL.
                printf_hex_array("Setting address received to: ",
                                 ADDRESS_LENGTH,
                                 context->contract_address_received);
                msg->tokenLookup2 = context->contract_address_received;
            } else {
                received_network_token(context);
                msg->tokenLookup2 = NULL;
            }
        }

        msg->uiType = ETH_UI_TYPE_GENERIC;
        msg->result = ETH_PLUGIN_RESULT_OK;
    } else {
        PRINTF("Context not valid\n");
        msg->result = ETH_PLUGIN_RESULT_FALLBACK;
    }
}

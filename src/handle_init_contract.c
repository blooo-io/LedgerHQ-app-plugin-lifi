#include "lifi_plugin.h"

// Called once to init.
void handle_init_contract(void *parameters) {
    ethPluginInitContract_t *msg = (ethPluginInitContract_t *) parameters;

    if (msg->interfaceVersion != ETH_PLUGIN_INTERFACE_VERSION_LATEST) {
        msg->result = ETH_PLUGIN_RESULT_UNAVAILABLE;
        return;
    }

    if (msg->pluginContextLength < sizeof(lifi_parameters_t)) {
        msg->result = ETH_PLUGIN_RESULT_ERROR;
        return;
    }

    lifi_parameters_t *context = (lifi_parameters_t *) msg->pluginContext;
    memset(context, 0, sizeof(*context));
    context->valid = 1;

    // Determine a function to call
    size_t i;
    for (i = 0; i < NUM_LIFI_SELECTORS; i++) {
        if (memcmp((uint8_t *) PIC(LIFI_SELECTORS[i]), msg->selector, SELECTOR_SIZE) == 0) {
            context->selectorIndex = i;
            break;
        }
    }

    if (i == NUM_LIFI_SELECTORS) {
        // Selector was not found
        msg->result = ETH_PLUGIN_RESULT_ERROR;
        return;
    }

    // Set `next_param` to be the first field we expect to parse.
    switch (context->selectorIndex) {
        case SWAP_TOKENS_GENERIC:
            // Skip _lifiData offset
            context->skip = 1;
            // First param is _swapData offset
            context->next_param = OFFSET;
            break;
        case START_BRIDGE_TOKENS_VIA_NXTP:
            // Skip _lifiData offset
            context->skip = 1;
            // Set chain_id_receiver to 0
            memset(context->chain_id_receiver, 0, sizeof(context->chain_id_receiver));
            // First param is _nxtpData offset
            context->next_param = OFFSET;
            break;
        default:
            PRINTF("Missing selectorIndex\n");
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}

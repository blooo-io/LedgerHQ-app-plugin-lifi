#include "lifi_plugin.h"

void handle_query_contract_id(void *parameters) {
    ethQueryContractID_t *msg = (ethQueryContractID_t *) parameters;
    lifi_parameters_t *context = (lifi_parameters_t *) msg->pluginContext;

    strlcpy(msg->name, PLUGIN_NAME, msg->nameLength);

    switch (context->selectorIndex) {
        case SWAP_TOKENS_GENERIC:
            strlcpy(msg->version, "Swap Tokens", msg->versionLength);
            break;
        case START_BRIDGE_TOKENS_VIA_NXTP:
            strlcpy(msg->version, "Start Bridge Tokens Via NXTP", msg->versionLength);
            break;
        default:
            PRINTF("Selector Index :%d not supported\n", context->selectorIndex);
            msg->result = ETH_PLUGIN_RESULT_ERROR;
            return;
    }

    msg->result = ETH_PLUGIN_RESULT_OK;
}
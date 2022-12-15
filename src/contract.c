#include "lifi_plugin.h"

// Need more information about the interface for plugins? Please read the README.md!

// You can check LI.FI swap methods here
// https://louper.dev/diamond/0x362fA9D0bCa5D19f743Db50738345ce2b40eC99f?network=mainnet
//
// swapTokensGeneric 0x4630a0d8
static const uint8_t LIFI_SWAP_TOKENS_GENERIC_SELECTOR[SELECTOR_SIZE] = {0x46, 0x30, 0xa0, 0xd8};

// startBridgeTokenViaNXTP 0xc9fb76b1
static const uint8_t LIFI_START_BRIDGE_TOKEN_VIA_NXTP_SELECTOR[SELECTOR_SIZE] = {0xc9,
                                                                                 0xfb,
                                                                                 0x76,
                                                                                 0xb1};

// Array of all the different LI.FI selectors.
const uint8_t *const LIFI_SELECTORS[NUM_LIFI_SELECTORS] = {
    LIFI_SWAP_TOKENS_GENERIC_SELECTOR,
    LIFI_START_BRIDGE_TOKEN_VIA_NXTP_SELECTOR,
};

// Used to indicate that the beneficiary should be the sender.
const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00};

const uint8_t NULL_CHAIN_ID[INT_64_LENGTH] = {0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00,
                                              0x00};

const lifi_network_info_t LIFI_NETWORK_MAPPING[NUM_LIFI_NETWORKS] = {{{0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x01},  // 1
                                                                      "Ethereum"},
                                                                     {{0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x38},  // 56
                                                                      "BSC"},
                                                                     {{0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x00,
                                                                       0x89},  // 137
                                                                      "Polygon"}};
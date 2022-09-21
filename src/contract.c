#include "lifi_plugin.h"

// Need more information about the interface for plugins? Please read the README.md!

// You can check LI.FI swap methods here
// https://louper.dev/diamond/0x362fA9D0bCa5D19f743Db50738345ce2b40eC99f?network=mainnet
//
// swapTokensGeneric 0xa4baa10c
static const uint8_t LIFI_SWAP_TOKENS_GENERIC_SELECTOR[SELECTOR_SIZE] = {0xa4, 0xba, 0xa1, 0x0c};
// startBridgeTokenViaNXTP 0x7d7aecd3
static const uint8_t LIFI_START_BRIDGE_TOKEN_VIA_NXTP_SELECTOR[SELECTOR_SIZE] = {0x7d,
                                                                                 0x7a,
                                                                                 0xec,
                                                                                 0xd3};

// Array of all the different LI.FI selectors.
const uint8_t *const LIFI_SELECTORS[NUM_LIFI_SELECTORS] = {
    LIFI_SWAP_TOKENS_GENERIC_SELECTOR,
    LIFI_START_BRIDGE_TOKEN_VIA_NXTP_SELECTOR,
};

// Ask dummy address ETH
// 1inch uses `0xeeeee` as a dummy address to represent ETH.
const uint8_t LIFI_ETH_ADDRESS[ADDRESS_LENGTH] = {0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                  0xee, 0xee, 0xee, 0xee, 0xee, 0xee, 0xee,
                                                  0xee, 0xee, 0xee, 0xee, 0xee, 0xee};
// Used to indicate that the beneficiary should be the sender.
const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH] = {0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
                                                  0x00, 0x00, 0x00, 0x00, 0x00, 0x00};

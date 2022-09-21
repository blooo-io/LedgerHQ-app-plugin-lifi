#pragma once

#include <string.h>
#include "eth_internals.h"
#include "eth_plugin_interface.h"

#define PARAMETER_LENGTH 32
#define SELECTOR_SIZE    4

#define RUN_APPLICATION 1

#define NUM_LIFI_SELECTORS 2
#define SELECTOR_SIZE          4

#define PLUGIN_NAME "LiFi"

#define TOKEN_SENT_FOUND     1
#define TOKEN_RECEIVED_FOUND 1 << 1

// 1inch uses `0xeeeee` as a dummy address to represent ETH in Swap.
extern const uint8_t LIFI_ETH_ADDRESS[ADDRESS_LENGTH];

// 1inch uses 0x00000 as a dummy address to reprecent ETH in Unmoswap.
extern const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH];

// Returns 1 if corresponding address is the 1inch address for the chain token (ETH, BNB, MATIC,
// etc.. are 0xeeeee...).
#define ADDRESS_IS_NETWORK_TOKEN(_addr)                      \
    (!memcmp(_addr, LIFI_ETH_ADDRESS, ADDRESS_LENGTH) || \
     !memcmp(_addr, NULL_ETH_ADDRESS, ADDRESS_LENGTH))

typedef enum {
    SWAP_TOKENS_GENERIC,
    START_BRIDGE_TOKENS_VIA_NXTP,
} lifiSelector_t;


#define PARTIAL_FILL 1
extern const uint8_t *const LIFI_SELECTORS[NUM_LIFI_SELECTORS];

typedef enum {
    SEND_SCREEN,
    RECEIVE_SCREEN,
    BENEFICIARY_SCREEN,
    PARTIAL_FILL_SCREEN,
    WARN_SCREEN,
    ERROR,
} screens_t;

// Would've loved to make this an enum but we don't have enough room because enums are `int` and not
// `uint8_t`.
#define AMOUNT_SENT      0  // Amount sent by the user to the contract.
#define AMOUNT_RECEIVED  1  // Amount sent by the contract to the user.
#define TOKEN_SENT       2  // Address of the token the user is sending.
#define TOKEN_RECEIVED   3  // Address of the token sent to the user.
#define ADDRESS_RECEIVER 4  // Address to which the contract will send the tokens.
#define CHAIN_SENDER     5  // Chain ID of the source chain
#define CHAIN_RECEIVER   6  // Chain ID of the destinantion chain
#define OFFSET           7  // Offset to an array parameter's value
#define SKIP             8  // Placeholder to be set when the parameter skipping could not be done (after an offset)
#define NONE             9  // Placeholder variant to be set when parsing is done but data is still being sent.

// Number of decimals used when the token wasn't found in the CAL.
#define DEFAULT_DECIMAL WEI_TO_ETHER

// Ticker used when the token wasn't found in the CAL.
#define DEFAULT_TICKER ""

// Shared global memory with Ethereum app. Must be at most 5 * 32 bytes.
typedef struct lifi_parameters_t {
    uint8_t amount_sent[INT256_LENGTH];
    uint8_t amount_received[INT256_LENGTH];
    uint8_t contract_address_sent[ADDRESS_LENGTH];
    uint8_t contract_address_received[ADDRESS_LENGTH];
    char ticker_sent[MAX_TICKER_LEN];
    char ticker_received[MAX_TICKER_LEN];
    

    uint16_t offset;
    uint16_t checkpoint;
    uint8_t next_param;
    uint8_t tokens_found;
    uint8_t valid;
    uint8_t decimals_sent;
    uint8_t decimals_received;
    uint8_t selectorIndex;
    uint8_t flags;
    uint8_t skip;
} lifi_parameters_t;
// 32*2 + 2*20 + 12*2 = 128
// 2*2 + 1*8 = 12
// 12+96 = 140

// Piece of code that will check that the above structure is not bigger than 5 * 32.
// Do not remove this check.
_Static_assert(sizeof(lifi_parameters_t) <= 5 * 32, "Structure of parameters too big.");

void handle_provide_parameter(void *parameters);
void handle_query_contract_ui(void *parameters);
void lifi_plugin_call(int message, void *parameters);
void handle_finalize(void *parameters);
void handle_init_contract(void *parameters);
void handle_provide_token(void *parameters);
void handle_query_contract_id(void *parameters);

static inline void printf_hex_array(const char *title __attribute__((unused)),
                                    size_t len __attribute__((unused)),
                                    const uint8_t *data __attribute__((unused))) {
    PRINTF(title);
    for (size_t i = 0; i < len; ++i) {
        PRINTF("%02x", data[i]);
    };
    PRINTF("\n");
}
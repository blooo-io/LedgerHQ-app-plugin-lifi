#pragma once

#include <string.h>
#include "eth_internals.h"
#include "eth_plugin_interface.h"

#define PARAMETER_LENGTH 32
#define SELECTOR_SIZE    4

#define RUN_APPLICATION 1

#define NUM_LIFI_SELECTORS 2
#define SELECTOR_SIZE      4

#define NUM_LIFI_NETWORKS         14
#define LIFI_MAX_NETWORK_NAME_LEN 40

#define PLUGIN_NAME "LiFi"

#define TOKEN_SENT_FOUND     1
#define TOKEN_RECEIVED_FOUND 1 << 1

#define INT_64_LENGTH 16

// LiFi uses 0x00000 as a dummy address to represent ETH.
extern const uint8_t NULL_ETH_ADDRESS[ADDRESS_LENGTH];

// Returns 1 if corresponding address is the LiFi address for the chain token (ETH, BNB, MATIC)
#define ADDRESS_IS_NETWORK_TOKEN(_addr) !memcmp(_addr, NULL_ETH_ADDRESS, ADDRESS_LENGTH)

typedef enum {
    SWAP_TOKENS_GENERIC,
    START_BRIDGE_TOKENS_VIA_NXTP,
} lifiSelector_t;

#define PARTIAL_FILL 1
extern const uint8_t *const LIFI_SELECTORS[NUM_LIFI_SELECTORS];

typedef enum {
    SEND_SCREEN,
    RECEIVE_SCREEN,
    TO_CHAIN_SCREEN,
    FROM_CHAIN_SCREEN,
    TO_ADDRESS_SCREEN,
    WARN_TOKEN_SCREEN,
    CALL_TO_SCREEN,
    ERROR,
} screens_t;

// Would've loved to make this an enum but we don't have enough room because enums are `int` and not
// `uint8_t`.
#define AMOUNT_SENT      0  // Amount sent by the user to the contract.
#define AMOUNT_RECEIVED  1  // Amount sent by the contract to the user.
#define TOKEN_SENT       2  // Address of the token the user is sending.
#define TOKEN_RECEIVED   3  // Address of the token sent to the user.
#define ADDRESS_RECEIVER 4  // Address to which the contract will send the tokens.
#define CHAIN_RECEIVER   5  // Chain ID of the destinantion chain
#define CALL_TO          6  // Address of the destination call
#define OFFSET           7  // Offset to an array parameter's value
#define SKIP             8  // Placeholder to use when the parameter skipping happens after an offset
#define NONE             9  // Placeholder variant to be set when parsing is done but data is still being sent.

// Number of decimals used when the token wasn't found in the CAL.
#define DEFAULT_DECIMAL WEI_TO_ETHER

// Ticker used when the token wasn't found in the CAL.
#define DEFAULT_TICKER ""

typedef struct lifi_network_info_s {
    uint8_t chain_id[INT_64_LENGTH];
    char name[LIFI_MAX_NETWORK_NAME_LEN];
} lifi_network_info_t;

// Hardcoded chain IDs to display the involved networks in the bridge methods
extern const lifi_network_info_t LIFI_NETWORK_MAPPING[NUM_LIFI_NETWORKS];

// This will be compared to chain_id_receiver in context
extern const uint8_t NULL_CHAIN_ID[INT_64_LENGTH];

// Shared global memory with Ethereum app. Must be at most 5 * 32 bytes.
typedef struct lifi_parameters_t {
    uint8_t amount_sent[INT256_LENGTH];
    uint8_t amount_received[INT256_LENGTH];
    uint8_t contract_address_sent[ADDRESS_LENGTH];
    uint8_t contract_address_received[ADDRESS_LENGTH];  // stores the receiver address in
                                                        // startBridgeTokensViaNXTP
    char ticker_sent[MAX_TICKER_LEN];
    char ticker_received[MAX_TICKER_LEN];
    uint8_t chain_id_receiver[INT_64_LENGTH];

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
    uint8_t has_dest_call;
} lifi_parameters_t;
// 32*2 + 2*20 + 1*16 + 12*2 = 144
// 2*2 + 1*9 = 13
// 144+13 = 157

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

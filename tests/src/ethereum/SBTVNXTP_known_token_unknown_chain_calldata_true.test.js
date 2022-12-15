import { processTest, populateTransaction } from "../test.fixture";

const contractName = "LiFiDiamond";

const testLabel = "SBTVNXTP_known_token_unknown_chain_calldata_false"; // <= Name of the test
const testDirSuffix = "SBTVNXTP_known_token_unknown_chain_calldata_false"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0x1231deb6f5749ef6ce6943a275a1d3e7486f4eae";
const chainID = 1;

// From : https://etherscan.io/tx/0x3c4b2885602d9d2dee1688184c7508d9858177a12602227a00abb224741422d0
const inputData = "0xc9fb76b100000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000200b6571c7f3928b8f5e6e0d925aeb67ed899381196f46a2518a5e5917c219999c4000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001800000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000052753e545bd06d9305abb6a52000d5acac30bff10000000000000000000000000000000000000000000000000000000002faf0800000000000000000000000000000000000000000000000000000000000000089000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007636f6e6e65787400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e7472616e73666572746f2e78797a0000000000000000000000000000000000000000000000000000000000006090de2ec76eb1dc3b5d632734415c93c44fd113000000000000000000000000997f29174a766a1da04cf77d135d59dd12fb54d10000000000000000000000008640a7769ba59e219d85802427a964068d4d99f80000000000000000000000001231deb6f5749ef6ce6943a275a1d3e7486f4eae000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa8417400000000000000000000000052753e545bd06d9305abb6a52000d5acac30bff100000000000000000000000052753e545bd06d9305abb6a52000d5acac30bff1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000089c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a47009f619f4792103e6b4b1751d092c247f96f8f783fde9bcec9e6667d08c38a7f200000000000000000000000000000000000000000000000000000000637e802d0000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000000000026000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000000580000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000997f29174a766a1da04cf77d135d59dd12fb54d10000000000000000000000008640a7769ba59e219d85802427a964068d4d99f80000000000000000000000001231deb6f5749ef6ce6943a275a1d3e7486f4eae0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000002faf08000000000000000000000000000000000000000000000000000000000000000890000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000002c54c0f00000000000000000000000052753e545bd06d9305abb6a52000d5acac30bff109f619f4792103e6b4b1751d092c247f96f8f783fde9bcec9e6667d08c38a7f200000000000000000000000000000000000000000000000000000000637e8022c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024000000000000000000000000031efc4aeaa7c39e54a33fdc3c46ee2bd70ae0a090000000000000000000000006090de2ec76eb1dc3b5d632734415c93c44fd11300000000000000000000000000000000000000000000000000000000637a8cd200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041eeaa51bafc18a42a74e9ff1c7e56914f0207c78871fd408c7bf701be306e363f7968e736f4fa351cf8cdfc9d88b908fb2f6341bce214b8215a4923457a29cec51b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";


// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 10, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 7, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 7, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);

import { processTest } from "../test.fixture";

const contractName = "LiFiDiamond";

const testLabel = "swap_tokens_generic_known_to_known"; // <= Name of the test
const testDirSuffix = "swap_tokens_generic_known_to_known"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

// From : https://etherscan.io/tx/0xc8c305f5ee847dc2787449d0fad1da0f1c78bece8e43055b8157375612f62bfe
const rawTx = "0x02f904530158850342770c00850342770c0083059695941231deb6f5749ef6ce6943a275a1d3e7486f4eae80b903e44630a0d89b1e41d1562eeaa306f3e8fce23cb777dd947f7ae2a6f40f48a728d45331f15900000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000010000000000000000000000000051e7bcbeb2b963d81b3074b7f786e39c4173b265000000000000000000000000000000000000000000000001051561c8bc58b95a0000000000000000000000000000000000000000000000000000000000000160000000000000000000000000000000000000000000000000000000000000000e7472616e73666572746f2e78797a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002a3078303030303030303030303030303030303030303030303030303030303030303030303030303030300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000def1c0ded9bec7f1a1670819833240f027b25eff000000000000000000000000def1c0ded9bec7f1a1670819833240f027b25eff000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000005d21dba0000000000000000000000000000000000000000000000000000000000000000e000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000128803ba26d000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000005d21dba00000000000000000000000000000000000000000000000001051c6265b6ba3c7d0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002ba0b86991c6218b36c1d19d4a2e9eb0ce3606eb480001f4c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000869584cd00000000000000000000000010000000000000000000000000000000000000110000000000000000000000000000000000000000000000e145b841a163999f4f000000000000000000000000000000000000000000000000c001a079790b89ff43be578fefa45724ab2aa8d06aba4e4e4a7c5e96f7e6895e9baa62a02050fa55efda678b961e5ee9844b3f313e0193232ca4c4d0e88901645de66fe0";

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 6, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 6, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, rawTx, signedPlugin, "", testNetwork)
);

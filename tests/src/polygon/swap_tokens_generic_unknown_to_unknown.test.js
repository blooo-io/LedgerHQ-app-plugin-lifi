import { processTest, populateTransaction } from "../test.fixture";

const contractName = "LiFiDiamond";

const testLabel = "swap_tokens_generic_unknown_to_unknown"; // <= Name of the test
const testDirSuffix = "swap_tokens_generic_unknown_to_unknown"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x362fA9D0bCa5D19f743Db50738345ce2b40eC99f";
const chainID = 137;

// From https://polygonscan.com/tx/0x7ad82d9bfced42156c990ed981a92b01ede55c87aa3fe6f400c52ee572ded196
// With token address altered : from 0x2791bca1f2de4661ed88a30c99a7a9449aa84174 to 0x2791bca1f2de4661ed8800000000000000000000
const inputData = "0xa4baa10c000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001801cc9025c0440ce2f4fbbff89c7a84c932d5e9bfb7475d1241056274b9facdb60000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000003b56a704c01d650147ade2b8cee594066b3f94210000000000000000000000002791bca1f2de4661ed8800000000000000000000000000000000000000000000cc231e2c7e7f21cb12477543aa9fcd882f6fe15900000000000000000000000000000000000000000000000000000000000000890000000000000000000000000000000000000000000000056bc75e2d63100000000000000000000000000000000000000000000000000000000000000000000563616e676f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57000000000000000000000000216b4b4ba9f3e719726886d34a177484278bfcae0000000000000000000000003b56a704c01d650147ade2b8cee594066b3f94210000000000000000000000002791bca1f2de4661ed88000000000000000000000000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000000000c0000000000000000000000000000000000000000000000000000000000000042454e3f31b00000000000000000000000000000000000000000000000000000000000000200000000000000000000000003b56a704c01d650147ade2b8cee594066b3f94210000000000000000000000002791bca1f2de4661ed88000000000000000000000000000000000000000000000000000000000000000000056bc75e2d6310000000000000000000000000000000000000000000000000000000000000006575e200000000000000000000000000000000000000000000000000000000006575e200000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000220000000000000000000000000000000000000000000000000000000000000034000000000000000000000000000000000000000000000000000000000000003a0000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f0000000000000000000000008c208b7b5625d78deb49240ef28126cbe2738098010000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000003e000000000000000000000000000000000000000000000000000000000632a471afc250753d1984b51a3228fdc282a59d5000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000f3938337f7294fef84e9b2c6d548a93f956cc28100000000000000000000000000000000000000000000000000000000000000e491a32b690000000000000000000000003b56a704c01d650147ade2b8cee594066b3f94210000000000000000000000000000000000000000000000056bc75e2d631000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000004de5b46a13fd188976f8c3cd439ebfbf155ba443efd9000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e400000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";

// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 8, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanosp",
        label: "Nano S+",
        steps: 8, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);

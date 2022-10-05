import { processTest, populateTransaction } from "../test.fixture";

const contractName = "LiFiDiamond";

const testLabel = "SBTVNXTP_known_token_known_chain_calldata_false"; // <= Name of the test
const testDirSuffix = "SBTVNXTP_known_token_known_chain_calldata_false"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x362fa9d0bca5d19f743db50738345ce2b40ec99f";
const chainID = 137;

// From : https://polygonscan.com/tx/0xdb51e528f2868a11c467d191b9cc2841ebfb23d379b056230f041599ec7bdcbe
const inputData = "0x7d7aecd300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000180257cca20df54619fdd9ed1807bb6ee817f4451c63a7f6ebacfbff745691d875c000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000008ac76a51cc950d9822d68b83fe1ad97b32cd580d000000000000000000000000e0d432e1e450f312182924dbf2ef72b7738e681300000000000000000000000000000000000000000000000000000000000000380000000000000000000000000000000000000000000000000000000000221c7d000000000000000000000000000000000000000000000000000000000000000e7472616e73666572746f2e78797a0000000000000000000000000000000000000000000000000000000000002a9ea5e8cddf40730f4f4f839f673a51600c314e000000000000000000000000997f29174a766a1da04cf77d135d59dd12fb54d10000000000000000000000006db8506a7454c5a83b9e68dfc89fd7413ce97a5d000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f0000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000008ac76a51cc950d9822d68b83fe1ad97b32cd580d000000000000000000000000e0d432e1e450f312182924dbf2ef72b7738e6813000000000000000000000000e0d432e1e450f312182924dbf2ef72b7738e6813000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000890000000000000000000000000000000000000000000000000000000000000038c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a4709970812e349506a523ca4fd3776879e3c80ec0fdd5b79a63b83647c1b8d467b00000000000000000000000000000000000000000000000000000000000221c7d000000000000000000000000000000000000000000000000000000006335f53800000000000000000000000000000000000000000000000000000000000002600000000000000000000000000000000000000000000000000000000000000280000000000000000000000000000000000000000000000000000000000000052000000000000000000000000000000000000000000000000000000000000005a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000997f29174a766a1da04cf77d135d59dd12fb54d10000000000000000000000006db8506a7454c5a83b9e68dfc89fd7413ce97a5d000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f00000000000000000000000000000000000000000000000000000000000000890000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000221c7d00000000000000000000000000000000000000000000000000000000000000380000000000000000000000008ac76a51cc950d9822d68b83fe1ad97b32cd580d0000000000000000000000000000000000000000000000001ac77c259359a24b000000000000000000000000e0d432e1e450f312182924dbf2ef72b7738e68139970812e349506a523ca4fd3776879e3c80ec0fdd5b79a63b83647c1b8d467b0000000000000000000000000000000000000000000000000000000006335f530c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002400000000000000000000000006090de2ec76eb1dc3b5d632734415c93c44fd1130000000000000000000000002a9ea5e8cddf40730f4f4f839f673a51600c314e00000000000000000000000000000000000000000000000000000000633201dd00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000041b00e90d7c332728884cd5b88f4a31de8d2f569a51b5ecf95cf3c7165fd738628450027f5df76d22af503385f82ec5932edea078ec95486d814a17168ec99aed21b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";


// Create serializedTx and remove the "0x" prefix
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 11, // <= Define the number of steps for this test case and this device
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

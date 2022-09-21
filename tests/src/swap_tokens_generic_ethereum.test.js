import { processTest, populateTransaction } from "./test.fixture";

const contractName = "GenericSwapFacet";

const testLabel = "swapTokensGneneric"; // <= Name of the test
const testDirSuffix = "swap_tokens_generic"; // <= directory to compare device snapshots to
const testNetwork = "polygon";
const signedPlugin = false;

const contractAddr = "0x362fA9D0bCa5D19f743Db50738345ce2b40eC99f";
const chainID = 137;

// // From : https://etherscan.io/tx/0x5043d48467dafbfae7ab3221047fd29925da2e35275fbe29a355939e8b81b0ef
// const inputData = "0xa4baa10c00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000180ec650fe2f9b1edce84ba0cbfe23de727eb0019316d5db47bd6edac4fbcc574940000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef8280000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c5f37dedd6240ee4862680619cbf4d07ffbcd41500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000270801d946c9400000000000000000000000000000000000000000000000000000000000000000000e7472616e73666572746f2e78797a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d0000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d00000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef82800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000270801d946c940000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000e287c025200000000000000000000000000f2f400c138f9fb900576263af0bc7fcde2b1b8a80000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000018000000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef828000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000f2f400c138f9fb900576263af0bc7fcde2b1b8a8000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f0000000000000000000000000000000000000000000000270801d946c940000000000000000000000000000000000000000000000000000010124e178d9e818d0000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c800000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000001a0000000000000000000000000000000000000000000000000000000000000056000000000000000000000000000000000000000000000000000000000000007400000000000000000000000000000000000000000000000000000000000000a200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000064eb5625d900000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef82800000000000000000000000095e6f48254609a6ee006f7d493c8e5fb97094cef0000000000000000000000000000000000000000000000270801d946c940000000000000000000000000000000000000000000000000000000000000000000000000000000000000080bf510fcbf18b91105470639e9561022937712000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000324b4be83d500000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000270801d946c940000000000000000000000000000000000000000000000000000000000000000002a000000000000000000000000056178a0d5f301baf6cf3e1cd53d9863437345bf9000000000000000000000000f2f400c138f9fb900576263af0bc7fcde2b1b8a800000000000000000000000055662e225a3376759c24331a9aed764f8f0c9fbb0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000109a6d53f7bb97d00000000000000000000000000000000000000000000000270801d946c940000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006320382d01ffffffffffffffffffffffffffffffffffffff360bc3a5632037b500000026000000000000000000000000000000000000000000000000000000000000018000000000000000000000000000000000000000000000000000000000000001e00000000000000000000000000000000000000000000000000000000000000024f47261b0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000024f47261b000000000000000000000000004fa0d235c4abf4bcf4787af4cf447de572ef8280000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000421bad3bb47084569ea9ed7cc4fc6b695702d92a6836fb591eb4135035911effc74807d8cf218290eb69a9f10ad681f43371c8fdd8294c2b91501b00ec323e8bae0f0300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000014414284aab00000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000004000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000000001f4000000000000000000000000000001f4800000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000242e1a7d4d00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000024432ce0a7c00000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000044000000000000000000000000f2f400c138f9fb900576263af0bc7fcde2b1b8a800000000000000000000000000000000000000000000000000000000000001c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a405971224000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000100000000000000000000000000000001000000000000000000000000000000000000000000000000000a5961f2977e6e00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004470bdb947000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000010918d3550050ecc0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000018414284aab00000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000044000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000001000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000064d1660f99000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002e9b3012000000000000000000000000000000000000000000000000";

// // From : https://etherscan.io/tx/0xd38a1049783d7d232ee63b7c7092e74484717e10fde6ccd010b537afd3ddcf0d
// const inputData = "0xa4baa10c00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000180a2bc4006d4f561a4aaee11e81bd009f553981a0bd9664a2f9202e55ed2f27dfa000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a700000000000000000000000020cc2656c05ad1ade57281358f4b37aa1d71805f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000001c6bf52634000000000000000000000000000000000000000000000000000000000000000000126f6276696f75732e746563686e6f6c6f6779000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57000000000000000000000000216b4b4ba9f3e719726886d34a177484278bfcae0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c944e90c64b2c07662a292be6244bdf05cda44a7000000000000000000000000000000000000000000000000001c6bf52634000000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000000e40b86a4c1000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee000000000000000000000000000000000000000000000000001c6bf526340000000000000000000000000000000000000000000000000006358b2d0effec80e9000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc200000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000001000000000000000000004de47b504a15ef05f4eed1c07208c5815c49022a0c1900000000000000000000000000000000000000000000000000000000";

// From : https://etherscan.io/tx/0xba5c36b3f94cc5c36177f402d91042336bbb02a47637b8135643a97451ca36bb
//const inputData = "0xa4baa10c000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001809f4054f6436628d85be7402e166a16968a372f2f3885610bb2039c1157229c0f000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000007367409e0c12b2b7caa5c990e11a75e0d86580fc00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000006585658ae64a32756a900000000000000000000000000000000000000000000000000000000000000057275626963000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000006352a56caadc4f1e25cd6c75970fa768a3304e640000000000000000000000006352a56caadc4f1e25cd6c75970fa768a3304e640000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000000000000000000000000006585658ae64a32756a900000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000006a490411a3200000000000000000000000004954f93d189c9afb6e09c47a55d9a124537ab08000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000003058ef90929cb8180174d74c507176cca6835d73000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f0000000000000000000000000000000000000000000006585658ae64a32756a9000000000000000000000000000000000000000000000000000000062390626400000000000000000000000000000000000000000000000000000006f9de41420000000000000000000000000000000000000000000000000000000000000002000000000000000000000000933a06c631ed8b5e4f3848c91a1cfc45e5c7eab30000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000002600000000000000000000000003058ef90929cb8180174d74c507176cca6835d730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000024bd6015b400000000000000000000000004954f93d189c9afb6e09c47a55d9a124537ab0800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000648a6a1e85000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000353c1f0bc78fbbc245b3c93ef77b1dcc5b77d2a027100000000000000000000000000000000000000000000000000006f9de414200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000001a49f865422000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000001000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000004400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000064d1660f99000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";
// Create serializedTx and remove the "0x" prefix
//const serializedTx = populateTransaction(contractAddr, inputData, chainID);

//const rawTx = "0x02f909d301288504e3b292008504e3b292008307f4a094362fa9d0bca5d19f743db50738345ce2b40ec99f80b90964a4baa10c000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000001809f4054f6436628d85be7402e166a16968a372f2f3885610bb2039c1157229c0f000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000007367409e0c12b2b7caa5c990e11a75e0d86580fc00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000006585658ae64a32756a900000000000000000000000000000000000000000000000000000000000000057275626963000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000006352a56caadc4f1e25cd6c75970fa768a3304e640000000000000000000000006352a56caadc4f1e25cd6c75970fa768a3304e640000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000000000000000000000000006585658ae64a32756a900000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000006a490411a3200000000000000000000000004954f93d189c9afb6e09c47a55d9a124537ab08000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000006b175474e89094c44da98b954eedeac495271d0f000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec70000000000000000000000003058ef90929cb8180174d74c507176cca6835d73000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f0000000000000000000000000000000000000000000006585658ae64a32756a9000000000000000000000000000000000000000000000000000000062390626400000000000000000000000000000000000000000000000000000006f9de41420000000000000000000000000000000000000000000000000000000000000002000000000000000000000000933a06c631ed8b5e4f3848c91a1cfc45e5c7eab30000000000000000000000000000000000000000000000000000000000000140000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000030000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000002600000000000000000000000003058ef90929cb8180174d74c507176cca6835d730000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000024bd6015b400000000000000000000000004954f93d189c9afb6e09c47a55d9a124537ab0800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000648a6a1e85000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000353c1f0bc78fbbc245b3c93ef77b1dcc5b77d2a027100000000000000000000000000000000000000000000000000006f9de414200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000001a49f865422000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec700000000000000000000000000000001000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000004400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000064d1660f99000000000000000000000000dac17f958d2ee523a2206206994597c13d831ec7000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c080a0ab4c0e1827edd48b35af2dc075d720cbd6ef6276ef827afbabbf5276b5d9bf5ea006dd7a6190ee87145441a6ef81c3bff12b09e0670a3ccf13c5ede849d1256a27";


const inputData = "0xa4baa10c00000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000180d6b6a6bc751e60f653f52b500d431eb0c1456e9ede1508318ee7b12cc4c0d84a000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f000000000000000000000000be2f0aa33ade86b3c324f50f25eeb1a366b7ebe8000000000000000000000000000000000000000000000000000000000000008900000000000000000000000000000000000000000000000000000000002dc6c0000000000000000000000000000000000000000000000000000000000000000e7472616e73666572746f2e78797a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d0000000000000000000000001111111254fb6c44bac0bed2854e76f90643097d0000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f00000000000000000000000000000000000000000000000000000000002dc6c000000000000000000000000000000000000000000000000000000000000000c000000000000000000000000000000000000000000000000000000000000003487c02520000000000000000000000000013927a60c7bf4d3d00e3c1593e0ec713e35d2106000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000001800000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f00000000000000000000000020bf018fddba3b352f3d913fe1c81b846fe0f490000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f00000000000000000000000000000000000000000000000000000000002dc6c000000000000000000000000000000000000000000000000000000000002c578f00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001a000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000002080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000a4b757fed600000000000000000000000020bf018fddba3b352f3d913fe1c81b846fe0f4900000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000c2132d05d31c914a87c6611c10748aeb04b58e8f0000000000000000000f42401111111254fb6c44bac0bed2854e76f90643097d00000000000000000000000000000000000000000000000000000000002c578f000000000000000000000000000000000000000000000000000000002e9b3012000000000000000000000000000000000000000000000000";
const serializedTx = populateTransaction(contractAddr, inputData, chainID);

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 6, // <= Define the number of steps for this test case and this device
    },
    // {
    //     name: "nanox",
    //     label: "Nano X",
    //     steps: 3, // <= Define the number of steps for this test case and this device
    // },
    // {
    //     name: "nanosp",
    //     label: "Nano S+",
    //     steps: 3, // <= Define the number of steps for this test case and this device
    // }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, "", signedPlugin, serializedTx, testNetwork)
);
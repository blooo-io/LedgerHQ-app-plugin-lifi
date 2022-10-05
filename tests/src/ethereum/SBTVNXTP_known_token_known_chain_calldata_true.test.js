import { processTest, populateTransaction } from "../test.fixture";

const contractName = "LiFiDiamond";

const testLabel = "SBTVNXTP_known_token_known_chain_calldata_true"; // <= Name of the test
const testDirSuffix = "SBTVNXTP_known_token_known_chain_calldata_true"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

const contractAddr = "0x362fa9d0bca5d19f743db50738345ce2b40ec99f";
const chainID = 1;

// From : https://etherscan.io/tx/0x39dc29aea5ed260908f759790e002590095228db060f49b6756f8fa174eae2f5
const inputData = "0x7d7aecd300000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000180ccbb4800d6fe0973cbe50373cb622525ef78d6bbc6a30d28fb83ceda3908f8f50000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f7183a19da97f5f304092edebe52e68e6a0134920000000000000000000000000000000000000000000000000000000000000089000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000086c6966692d6170690000000000000000000000000000000000000000000000000000000000000000000000006090de2ec76eb1dc3b5d632734415c93c44fd113000000000000000000000000997f29174a766a1da04cf77d135d59dd12fb54d10000000000000000000000006db8506a7454c5a83b9e68dfc89fd7413ce97a5d000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619000000000000000000000000f7183a19da97f5f304092edebe52e68e6a013492000000000000000000000000f7183a19da97f5f304092edebe52e68e6a013492000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000089b3ef29b379a3a8df82a406d285edca2900e0b0a2e865e69fb2e6deb8ad6d051970603d62396198544d8c06f725ade71606ba4c7904e1d6c5457f68eb18abdbb3000000000000000000000000000000000000000000000000016345785d8a0000000000000000000000000000000000000000000000000000000000006322a58d00000000000000000000000000000000000000000000000000000000000002600000000000000000000000000000000000000000000000000000000000001380000000000000000000000000000000000000000000000000000000000000272000000000000000000000000000000000000000000000000000000000000027a000000000000000000000000000000000000000000000000000000000000010e4cf76d313000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f7183a19da97f5f304092edebe52e68e6a013492ccbb4800d6fe0973cbe50373cb622525ef78d6bbc6a30d28fb83ceda3908f8f50000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f7183a19da97f5f304092edebe52e68e6a0134920000000000000000000000000000000000000000000000000000000000000089000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000086c6966692d61706900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57000000000000000000000000216b4b4ba9f3e719726886d34a177484278bfcae0000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014d7fed018591b200000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000de446c67b6d00000000000000000000000000000000000000000000000000000000000000200000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619000000000000000000000000000000000000000000000000014d7fed018591b2000000000000000000000000000000000000000000000009ae9f44e206c14ea9000000000000000000000000000000000000000000000009fb47d2e3bd112ec9000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f00000000000000000000000000000000000000000000000000000000000001600000000000000000000000008c208b7b5625d78deb49240ef28126cbe273809801000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000da000000000000000000000000000000000000000000000000000000000631f05655e53bc7d62c34bc2bc62d05f711cd2f4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003a00000000000000000000000000000000000000000000000000000000000001b58000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a41b5ab708fe1fe11cd6121006497b8549e8a69500000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000631ebf15000000000000000000000000000000000000000000000000000000000000002b7ceb23fd6bc0add59e62ac25578270cff1b9f6190001f40d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000bb800000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003200000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a41b5ab708fe1fe11cd6121006497b8549e8a69500000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000631ebf15000000000000000000000000000000000000000000000000000000000000002b7ceb23fd6bc0add59e62ac25578270cff1b9f6190001f42791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000260000000000000000000000000a41b5ab708fe1fe11cd6121006497b8549e8a6950000000000000000000000000000000000000000000000000000000000000d0500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004000000000000000000000000f3938337f7294fef84e9b2c6d548a93f956cc281000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000004df98312a29a91d9fac706f4d2adeb1fa4540fad167300000000000000000000000074ef12c4acb03d131bb7cf2ff5ce7d03675d91fa0000000000000000000000000000000000000000000000000000000000001a0b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000c8db3501281c192ffe9697a1b905b161ca0cd64d000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000004e17380615f37993b5a96adf3d443b6e0ac50a2119980000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000013800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000997f29174a766a1da04cf77d135d59dd12fb54d10000000000000000000000006db8506a7454c5a83b9e68dfc89fd7413ce97a5d000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000890000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619000000000000000000000000000000000000000000000000014d851e4c685d6d000000000000000000000000f7183a19da97f5f304092edebe52e68e6a01349270603d62396198544d8c06f725ade71606ba4c7904e1d6c5457f68eb18abdbb3000000000000000000000000000000000000000000000000000000006322a585b3ef29b379a3a8df82a406d285edca2900e0b0a2e865e69fb2e6deb8ad6d0519000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f000000000000000000000000000000000000000000000000000000000000024000000000000000000000000031efc4aeaa7c39e54a33fdc3c46ee2bd70ae0a090000000000000000000000006090de2ec76eb1dc3b5d632734415c93c44fd11300000000000000000000000000000000000000000000000000000000631eb23200000000000000000000000000000000000000000000000000000000000010e4cf76d313000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000001c00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f7183a19da97f5f304092edebe52e68e6a013492ccbb4800d6fe0973cbe50373cb622525ef78d6bbc6a30d28fb83ceda3908f8f50000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f7183a19da97f5f304092edebe52e68e6a0134920000000000000000000000000000000000000000000000000000000000000089000000000000000000000000000000000000000000000000016345785d8a000000000000000000000000000000000000000000000000000000000000000000086c6966692d61706900000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000def171fe48cf0115b1d80b88dc8eab59176fee57000000000000000000000000216b4b4ba9f3e719726886d34a177484278bfcae0000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f6190000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000014d7fed018591b200000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000de446c67b6d00000000000000000000000000000000000000000000000000000000000000200000000000000000000000007ceb23fd6bc0add59e62ac25578270cff1b9f619000000000000000000000000000000000000000000000000014d7fed018591b2000000000000000000000000000000000000000000000009ae9f44e206c14ea9000000000000000000000000000000000000000000000009fb47d2e3bd112ec9000000000000000000000000362fa9d0bca5d19f743db50738345ce2b40ec99f00000000000000000000000000000000000000000000000000000000000001600000000000000000000000008c208b7b5625d78deb49240ef28126cbe273809801000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000000da000000000000000000000000000000000000000000000000000000000631f05655e53bc7d62c34bc2bc62d05f711cd2f4000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003a00000000000000000000000000000000000000000000000000000000000001b58000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a41b5ab708fe1fe11cd6121006497b8549e8a69500000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000631ebf15000000000000000000000000000000000000000000000000000000000000002b7ceb23fd6bc0add59e62ac25578270cff1b9f6190001f40d500b1d8e8ef31e21c99d1db9a6444d3adf12700000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000bb800000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000003200000000000000000000000002791bca1f2de4661ed88a30c99a7a9449aa841740000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000a41b5ab708fe1fe11cd6121006497b8549e8a69500000000000000000000000000000000000000000000000000000000000027100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000d000000000000000000000000e592427a0aece92de3edee1f18e0157c05861564000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000631ebf15000000000000000000000000000000000000000000000000000000000000002b7ceb23fd6bc0add59e62ac25578270cff1b9f6190001f42791bca1f2de4661ed88a30c99a7a9449aa84174000000000000000000000000000000000000000000000000000000000000000000eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000060000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000260000000000000000000000000a41b5ab708fe1fe11cd6121006497b8549e8a6950000000000000000000000000000000000000000000000000000000000000d0500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000004000000000000000000000000f3938337f7294fef84e9b2c6d548a93f956cc281000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000004df98312a29a91d9fac706f4d2adeb1fa4540fad167300000000000000000000000074ef12c4acb03d131bb7cf2ff5ce7d03675d91fa0000000000000000000000000000000000000000000000000000000000001a0b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000003000000000000000000000000c8db3501281c192ffe9697a1b905b161ca0cd64d000000000000000000000000000000000000000000000000000000000000271000000000000000000000000000000000000000000000000000000000000000a0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000d500b1d8e8ef31e21c99d1db9a6444d3adf127000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000001000000000000000000004e17380615f37993b5a96adf3d443b6e0ac50a2119980000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000411e70fa2e467c4d55518f71aefb854dc91ac59025693a6cb71d47cb0c9507843d580522970840efaf58b4e0e2734daa395524a80b234d5acb5deb2cb2826189a01b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000";


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

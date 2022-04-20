import { processTest } from "../test.fixture";

const contractName = "AggregationRouterV3";

const testLabel = "swapKnownToKnownV3"; // <= Name of the test
const testDirSuffix = "swap_known_to_known_v3"; // <= directory to compare device snapshots to
const testNetwork = "ethereum";
const signedPlugin = false;

// From : https://etherscan.io/tx/0x28f440290bb6fb4f1b55af9f8de546acc165e208850a372062751f13f0505577
const rawTx = "0xf91e4d8210e6850430e2340083095f9c9411111112542d85b3ef69ae05771c2dccff4faa2680b91de47c025200000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d854062600000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000180000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000d417144312dbf50465b1c641d016962017ef6240000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d8540626000000000000000000000000b71d05cf5cdf7a9b15b20b9aab5e91332c271c960000000000000000000000000000000000000000000000000000000215c274c0000000000000000000000000000000000000000000000571b04a3e1b42d143380000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001c400000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000fa0000000000000000000000000000000000000000000000000000000000000168000000000000000000000000000000000000000000000000000000000000019a000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000e64b3af37c000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000024000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000020000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000d245636885000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000d417144312dbf50465b1c641d016962017ef6240000000000000000000000000b71d05cf5cdf7a9b15b20b9aab5e91332c271c96000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d8540626000000000000000000000000000000000000000000000113250f08e85953c597000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000180000000000000000000000000000000000000000000000000000000000000092080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000064eb5625d9000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000003ef51736315f52d568d6d2cf289419b9cfffe782000000000000000000000000000000000000000000000000000000006ac07dc0000000000000000000000000000000000000000000000000000000008000000000000000000000003ef51736315f52d568d6d2cf289419b9cfffe78200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000006e4f3432b1a00000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000006800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006ac07dc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a3ba0a2805000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000000000000000000000000000000000000000014000000000000000000000000000000000000000000000000000000000000001e000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000038000000000000000000000000000000000000000000000000000000000000005a000000000000000000000000000000000000000000000000000000000000005c0000000000000000000000000000000000000000000000000000000000000006423b872dd000000000000000000000000b2e39aa495cfe1656b2e2523f9550e09a185ebd70000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c3f451306484000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000006423b872dd0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000b2e39aa495cfe1656b2e2523f9550e09a185ebd700000000000000000000000000000000000000000000000000000006f4dce100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044f4a215c3000000000000000000000000000000000000000000000000c3f451306484000000000000000000000000000000000000000000000000000000000006f4dce100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044296637bf000000000000000000000000000000000000000000000000c3f451306484000000000000000000000000000000000000000000000000000000000006f4dce1000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001e4961d5b1e000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000a000000000000000000000000000000000000000000000000000000000000000020000000000000000000000003ef51736315f52d568d6d2cf289419b9cfffe7820000000000000000000000003ef51736315f52d568d6d2cf289419b9cfffe7820000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000004000000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000044cf6fc6e3000000000000000000000000b2e39aa495cfe1656b2e2523f9550e09a185ebd7000000000000000000000000000000000000000000000000000000000000000500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002463592c2b0000000000000000000000000000000000000000000000000000000060e75bc00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040ddc2e309d3994524063188ed596749518e68ebf60893e7bdadf558a347f94794ab30b9bdb7da7f88f30c2ec7681a8a0b3d36b027da0fdabe0740239211565c8d0000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000244b3af37c000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000044000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000003200000000000000000000000000000032800000000000000000000000c1409a2c5673299fb15da5f03c27eb1ac88f7d8c0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000104128acb08000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d85406260000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000001000276a400000000000000000000000000000000000000000000000000000000000000a00000000000000000000000000000000000000000000000000000000000000040000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000d417144312dbf50465b1c641d016962017ef62400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000624b3af37c000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000024000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000800000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000004e45636885000000000000000000000000000000000000000000000000000000000000000e00000000000000000000000000000000000000000000000000000000000000001000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000d417144312dbf50465b1c641d016962017ef6240000000000000000000000000b71d05cf5cdf7a9b15b20b9aab5e91332c271c96000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d854062600000000000000000000000000000000000000000000045e8b3b3532e97d7da100000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000028080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000184b3af37c000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000024000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000019000000000000000000000000000000190000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000044a9059cbb00000000000000000000000017890deb188f2de6c3e966e053da1c9a111ed4a500000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a4b757fed600000000000000000000000017890deb188f2de6c3e966e053da1c9a111ed4a5000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000d417144312dbf50465b1c641d016962017ef62400000000000000000002dc6c0fd3dfb524b2da40c8a6d703c62be36b5d85406260000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000002647f8fe7a000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000044000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d854062600000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a405971224000000000000000000000000d417144312dbf50465b1c641d016962017ef6240000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000100000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000200000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004470bdb947000000000000000000000000d417144312dbf50465b1c641d016962017ef624000000000000000000000000000000000000000000000057fc42bf6546cddb8430000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000001a4b3af37c000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000044000000000000000000000000d417144312dbf50465b1c641d016962017ef6240000000000000000000000000000000010000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000064d1660f99000000000000000000000000d417144312dbf50465b1c641d016962017ef6240000000000000000000000000b71d05cf5cdf7a9b15b20b9aab5e91332c271c960000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000025a02ffb0d2ea81d167c48ff63dac855f97a6e6c7ff0aebf475b11975b679cee5a99a04d631a7415a68db419dac59d148e9732233bd6d9a6801daa262c7d8be2c1ff02";

const devices = [
    {
        name: "nanos",
        label: "Nano S",
        steps: 11, // <= Define the number of steps for this test case and this device
    },
    {
        name: "nanox",
        label: "Nano X",
        steps: 7, // <= Define the number of steps for this test case and this device
    }
];

devices.forEach((device) =>
    processTest(device, contractName, testLabel, testDirSuffix, rawTx, signedPlugin, "", testNetwork)
);
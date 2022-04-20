import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { waitForAppScreen, zemu } from '../test.fixture';

test('Swap known token to known', zemu(async (sim, eth) => {
    // Known ERC20 to known ERC20 (SWAP 20 DELTA rLP to 2,856.812467 USDC)
    // https://etherscan.io/tx/0x28f440290bb6fb4f1b55af9f8de546acc165e208850a372062751f13f0505577
    const tx = eth.signTransaction(
        "44'/60'/0'/0/0",
        'f911cc81d18507aef40a008307284d9411111112542d85b3ef69ae05771c2dccff4faa2680b911a47c025200000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d854062600000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000180000000000000000000000000fcfc434ee5bff924222e084a8876eee74ea7cfba000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d8540626000000000000000000000000597af8c7b5eba854a8b4d729be9c6dc9c465310c000000000000000000000000000000000000000000000001158e460913d0000000000000000000000000000000000000000000000000000000000000a893957600000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000600000000000000000000000000000000000000000000000000000000000000c00000000000000000000000000000000000000000000000000000000000000320000000000000000000000000000000000000000000000000000000000000048000000000000000000000000000000000000000000000000000000000000009000000000000000000000000000000000000000000000000000000000000000b400000000000000000000000000000000000000000000000000000000000000ca0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000001a4b3af37c000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000044000000000000000000000000fcfc434ee5bff924222e084a8876eee74ea7cfba0000000000000000000000000000003c000000000000000000000000000001f400000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000064d1660f99000000000000000000000000fcfc434ee5bff924222e084a8876eee74ea7cfba000000000000000000000000d80efb96ce5a97349cc76607961cdef6b201349d00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a4b757fed6000000000000000000000000d80efb96ce5a97349cc76607961cdef6b201349d000000000000000000000000fcfc434ee5bff924222e084a8876eee74ea7cfba000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000002dc6c0fd3dfb524b2da40c8a6d703c62be36b5d8540626000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000003c483f1291f00000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000360000000000000000000000000fcfc434ee5bff924222e084a8876eee74ea7cfba000000000000000000000000000001b8000000000000000000000000000001b800000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000040000000000000000000000000000000000000000000000000000000000000016000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000064eb5625d9000000000000000000000000fcfc434ee5bff924222e084a8876eee74ea7cfba000000000000000000000000febc601e29bf081626c68878d38ce50f9d9dc886000000000000000000000000000000000000000000000000000000000000000100000000000000000000000000000000000000000000000000000000800000000000000000000000febc601e29bf081626c68878d38ce50f9d9dc88600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a48201aa3f000000000000000000000000fcfc434ee5bff924222e084a8876eee74ea7cfba0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000001ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002800000000000000000000000000000000000000000000000000000000000004480000000000000000000000000000000000000000000000000000000000000240000000000000000000000000000000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000184b3af37c000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000024000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000003200000000000000000000000000000032000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc20000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000044a9059cbb000000000000000000000000397ff1542f962076d0bfe58ea045ffa2d347aca000000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a4b757fed6000000000000000000000000397ff1542f962076d0bfe58ea045ffa2d347aca0000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb480000000000000000002dc6c0597af8c7b5eba854a8b4d729be9c6dc9c465310c000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000002647f8fe7a000000000000000000000000000000000000000000000000000000000000000808000000000000000000000000000000000000000000000000000000000000044000000000000000000000000fd3dfb524b2da40c8a6d703c62be36b5d854062600000000000000000000000000000000000000000000000000000000000001e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000a405971224000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000000000000000000000000000010000000000000000000000000000000100000000000000000000000000000000000000000000000000000000007a045b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004470bdb947000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb4800000000000000000000000000000000000000000000000000000000aa477fb30000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000018080',
    );
    await waitForAppScreen(sim);
    await sim.navigateAndCompareSnapshots('.', 'swap_known_to_known_v4', [8, 0]);

    await tx;
}));

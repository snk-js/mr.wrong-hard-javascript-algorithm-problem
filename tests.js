import findOutMrWrong from "./index.js";
const chai = require("chai");
const assert = chai.assert;

describe("Tests", () => {
    it("Conversation 1", () => {
        const conversation = [
            "John:I'm in 1st position.",
            "Peter:I'm in 2nd position.",
            "Tom:I'm in 1st position.",
            "Peter:The man behind me is Tom.",
        ];
        assert.strictEqual(findOutMrWrong(conversation), "Tom");
    });

    // it("Conversation 2", () => {
    //     const conversation = [
    //         "John:I'm in 1st position.",
    //         "Peter:I'm in 2nd position.",
    //         "Tom:I'm in 1st position.",
    //         "Peter:The man in front of me is Tom.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "John");
    // });

    // it("Conversation 2.5", () => {
    //     const conversation = [
    //         "John:The man behind me is Peter.",
    //         "Peter:There is 1 people in front of me.",
    //         "Tom:There are 2 people behind me.",
    //         "Peter:The man behind me is Tom.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), null);
    // });

    // it("Conversation 3", () => {
    //     const conversation = [
    //         "John:I'm in 1st position.",
    //         "Peter:There is 1 people in front of me.",
    //         "Tom:There are 2 people behind me.",
    //         "Peter:The man behind me is Tom.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "Tom");
    // });

    // it("Conversation 5", () => {
    //     const conversation = [
    //         "Dowfls:There is 0 people behind me.",
    //         "Dowfls:I'm in 4th position.",
    //         "Ljiyxbmr:I'm in 2nd position.",
    //         "Ljiyxbmr:There is 1 people in front of me.",
    //         "Cvvugb:There are 2 people in front of me.",
    //         "Cvvugb:There is 1 people behind me.",
    //         "Tzjlvruhk:The man behind me is Dowfls.",
    //         "Tzjlvruhk:There are 2 people in front of me.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), null);
    // });

    // it("Conversation 6", () => {
    //     const conversation = [
    //         "Tom:The man behind me is Bob.",
    //         "Bob:The man in front of me is Tom.",
    //         "Bob:The man behind me is Gary.",
    //         "Gary:The man in front of me is Bob.",
    //         "Fred:I'm in 1st position.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "Fred");
    // });

    // it("Conversation 7", () => {
    //     const conversation = ["Wrong:The man behind me is Wrong."];
    //     assert.strictEqual(findOutMrWrong(conversation), "Wrong");
    // });

    // it("Conversation 8", () => {
    //     const conversation = [
    //         "Fixsq:The man in front of me is Tnsrs.",
    //         "Pktj:The man in front of me is Tnsrs.",
    //         "Irnanfww:I'm in 6th position.",
    //         "Irnanfww:There are 5 people in front of me.",
    //         "Zfgderkbm:There is 0 people in front of me.",
    //         "Vhayfjd:There are 4 people in front of me.",
    //         "Tnsrs:There is 1 people in front of me.",
    //         "Vhayfjd:I'm in 5th position.",
    //         "Zfgderkbm:There are 5 people behind me.",
    //         "Pktj:There are 2 people in front of me.",
    //         "Tnsrs:The man in front of me is Zfgderkbm.",
    //         "Fixsq:The man behind me is Tnsrs.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "Fixsq");
    // });
    // it("Conversation 9", () => {
    //     const conversation = [
    //         "Bcdvt:The man in front of me is Fhnb.",
    //         "Bcdvt:The man behind me is Ofulabc.",
    //         "Ewryjljj:There are 4 people behind me.",
    //         "Ewryjljj:I'm in 3rd position.",
    //         "Fhnb:The man behind me is Bcdvt.",
    //         "Fhnb:There are 3 people behind me.",
    //         "Iycbhshv:There are 6 people in front of me.",
    //         "Iycbhshv:I'm in 7th position.",
    //         "Ofulabc:The man behind me is Iycbhshv.",
    //         "Ofulabc:The man in front of me is Bcdvt.",
    //         "Rhwrubvz:There is 0 people in front of me.",
    //         "Rhwrubvz:There is 1 people behind me.",
    //         "Yaxhtf:There is 0 people in front of me.",
    //         "Yaxhtf:The man behind me is Rhwrubvz.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "Rhwrubvz");
    // });
    // it("Conversation 10", () => {
    //     const conversation = [
    //         "Oappmqcyj:The man behind me is Ofmb.",
    //         "Bkano:I'm in 2nd position.",
    //         "Ofmb:There are 5 people in front of me.",
    //         "Oappmqcyj:The man in front of me is Ffelkbks.",
    //         "Ffelkbks:There are 2 people behind me.",
    //         "Jfachafbe:There are 4 people behind me.",
    //         "Bkano:There is 1 people behind me.",
    //         "Vyxq:I'm in 3rd position.",
    //         "Ofmb:There is 0 people behind me.",
    //         "Jfachafbe:The man in front of me is Bkano.",
    //         "Ffelkbks:I'm in 4th position.",
    //         "Vyxq:There are 3 people behind me.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "Bkano");
    // });
    // it("Conversation 11", () => {
    //     const conversation = [
    //         "Dedwngbn:The man behind me is Nrxxvd.",
    //         "Trazlwkdo:There is 1 people in front of me.",
    //         "Trazlwkdo:I'm in 2nd position.",
    //         "Ywxc:The man in front of me is Trazlwkdo.",
    //         "Ywxc:I'm in 3rd position.",
    //         "Nrxxvd:The man in front of me is Dedwngbn.",
    //         "Dedwngbn:The man in front of me is Ywxc.",
    //         "Tnfyhbn:There is 1 people behind me.",
    //         "Tnfyhbn:There are 3 people in front of me.",
    //         "Nrxxvd:I'm in 5th position.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "Tnfyhbn");
    // });
    // it("Conversation 12", () => {
    //     const conversation = [
    //         "Jgatt:The man in front of me is Wafxmw.",
    //         "Wafxmw:The man behind me is Jgatt.",
    //         "Pamqaabuj:There are 2 people in front of me.",
    //         "Dsfy:I'm in 4th position.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "Pamqaabuj");
    // });
    // it("Conversation 13.5", () => {
    //     const conversation = [
    //         "Aron:The man behind me is Jack.",
    //         "Iris:There are 0 people behind me.",
    //         "Vole:The man in front of me is Danny.",
    //         "Danny:I'm in 8th position.",
    //         "Vane:The man in front of me is Ned.",
    //         "Dirk:The man behind me is Aron.",
    //         "Aron:The man in front of me is Dirk.",
    //         "Danny:The man in front of me is Vane.",
    //         "Jack:The man in front of me is Aron.",
    //         "Ned:The man behind me is Vane.",
    //         "Ethan:The man in front of me is Ulm.",
    //         "Ulm:I'm in 1st position.",
    //         "Ethan:There are 5 people behind me.",
    //     ];
    //     assert.strictEqual(findOutMrWrong(conversation), "Ulm");
    // });

    // it('Conversation 13', () => {
    //   const conversation = [
    //     "Tdja:I'm in 26th position.",
    //     "Etef:I'm in 20th position.",
    //     'Jmfypsrfs:The man in front of me is Etup.',
    //     'Zhmxmbwf:The man in front of me is Jthesvw.',
    //     'Jthesvw:There are 30 people in front of me.',
    //     'Qhgvnttev:The man in front of me is Hoqf.',
    //     'Osjoqmhb:There are 17 people in front of me.',
    //     "Gkao:I'm in 7th position.",
    //     'Vovw:The man behind me is Ytron.',
    //     'Dqbhevsr:There are 11 people in front of me.',
    //     'Gkao:The man behind me is Kcagaricw.',
    //     'Bpputnpkl:There are 12 people in front of me.',
    //     "Etup:I'm in 2nd position.",
    //     'Zeveynn:There is 1 people behind me.',
    //     'Hoxwc:The man in front of me is Hnlmxr.',
    //     'Byuvi:The man behind me is Etup.',
    //     'Xzbzjzbq:The man behind me is Eouukf.',
    //     'Rkfkk:There are 14 people in front of me.',
    //     'Tqbq:The man in front of me is Izsu.',
    //     'Hoxwc:There are 22 people in front of me.',
    //     "Qyvttq:I'm in 9th position.",
    //     "Zddtqyi:I'm in 17th position.",
    //     'Hoqf:There are 24 people behind me.',
    //     'Wapq:There are 5 people in front of me.',
    //     "Dfviuroh:I'm in 27th position.",
    //     "Hoxwc:I'm in 23th position.",
    //     'Tdja:The man behind me is Dfviuroh.',
    //     "Zeveynn:I'm in 33th position.",
    //     'Zeveynn:There are 32 people in front of me.',
    //     "Nuzclj:I'm in 19th position.",
    //     'Ytron:The man in front of me is Kcagaricw.',
    //     'Hnlmxr:The man in front of me is Pljot.',
    //     'Xzbzjzbq:There are 10 people behind me.',
    //     'Pljot:The man behind me is Hnlmxr.',
    //     'Osjoqmhb:The man behind me is Nuzclj.',
    //     'Dxenetaix:The man behind me is Jthesvw.',
    //     'Zhmxmbwf:There are 31 people in front of me.',
    //     'Dfviuroh:The man in front of me is Tdja.',
    //     'Qyvttq:There are 8 people in front of me.',
    //     'Rkfkk:There are 19 people behind me.',
    //     'Xzbzjzbq:The man in front of me is Hoxwc.',
    //     'Eouukf:The man behind me is Tdja.',
    //     'Iaue:There are 33 people in front of me.',
    //     'Izsu:The man in front of me is Dfviuroh.',
    //     "Dxenetaix:I'm in 30th position.",
    //     "Byuvi:I'm in 1st position.",
    //     'Qhgvnttev:The man behind me is Dqbhevsr.',
    //     'Tqbq:The man behind me is Dxenetaix.',
    //     'Nuzclj:The man behind me is Etef.',
    //     'Xbeuyb:There are 20 people behind me.',
    //     "Axvmqdfh:I'm in 16th position.",
    //     'Etef:The man behind me is Pljot.',
    //     'Dfviuroh:The man behind me is Izsu.',
    //     "Izsu:I'm in 28th position.",
    //     'Osjoqmhb:There are 16 people behind me.',
    //     'Hoqf:There are 9 people in front of me.',
    //     'Bpputnpkl:The man behind me is Xbeuyb.',
    //     "Kcagaricw:I'm in 8th position.",
    //     'Qyvttq:There are 25 people behind me.',
    //     'Pljot:There are 13 people behind me.',
    //     'Pljot:There are 20 people in front of me.',
    //     'Nuzclj:There are 18 people in front of me.'
    //   ]
    //   assert.strictEqual(findOutMrWrong(conversation), "Ytron");
    // });
    // it('Conversation 14', () => {
    //   const conversation = [
    //     'Dswl:There are 5 people in front of me.',
    //     'Pijaub:The man behind me is Vokjetzd.',
    //     'Ujcnnc:There are 10 people in front of me.',
    //     'Dswl:The man behind me is Ryvsj.',
    //     "Vokjetzd:I'm in 5th position.",
    //     'Vqba:The man behind me is Sptlpks.',
    //     "Prflqhd:I'm in 13th position.",
    //     'Sptlpks:The man behind me is Kogvgv.',
    //     "Sptlpks:I'm in 2nd position.",
    //     'Ufehi:The man behind me is Ufehi.',
    //     'Msgsnvu:There is 1 people behind me.',
    //     'Ryvsj:There are 6 people behind me.',
    //     "Ryvsj:I'm in 7th position.",
    //     'Ryvsj:The man in front of me is Dswl.',
    //     'Pijaub:There are 9 people behind me.',
    //     'Pijaub:The man in front of me is Kogvgv.',
    //     'Vqba:There are 12 people behind me.',
    //     'Vokjetzd:There are 8 people behind me.',
    //     'Prflqhd:There are 12 people in front of me.',
    //     'Ufehi:The man in front of me is Vokjetzd.',
    //     "Kogvgv:I'm in 3rd position.",
    //     'Ufehi:There are 2 people behind me.',
    //     'Dswl:The man in front of me is Vokjetzd.',
    //     'Vapqbjz:The man in front of me is Gartszl.',
    //     'Gartszl:There are 5 people behind me.',
    //     'Vqba:There are 0 people in front of me.'
    //   ]
    //   assert.strictEqual(findOutMrWrong(conversation), "Ufehi");
    // });
});

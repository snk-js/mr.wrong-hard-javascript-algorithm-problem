import findOutMrWrong from "./index.js";
const chai = require("chai");
const assert = chai.assert;


describe("Tests", () => {
  it('Conversation 1', () => {
    const conversation = [
      "John:I'm in 1st position.",
      "Peter:I'm in 2nd position.",
      "Tom:I'm in 1st position.",
      "Peter:The man behind me is Tom."
    ];
    assert.strictEqual(findOutMrWrong(conversation), "Tom");
  });

  it('Conversation 2', () => {
    const conversation = [
      "John:I'm in 1st position.",
      "Peter:I'm in 2nd position.",
      "Tom:I'm in 1st position.",
      "Peter:The man in front of me is Tom."
    ];
    assert.strictEqual(findOutMrWrong(conversation), "John");
  });

  it('Conversation 3', () => {
    const conversation = [
      "John:I'm in 1st position.",
      "Peter:There is 1 people in front of me.",
      "Tom:There are 2 people behind me.",
      "Peter:The man behind me is Tom."
    ];
    assert.strictEqual(findOutMrWrong(conversation), "Tom");
  });

  it('Conversation 4', () => {
    const conversation = [
      "John:The man behind me is Peter.",
      "Peter:There is 1 people in front of me.",
      "Tom:There are 2 people behind me.",
      "Peter:The man behind me is Tom."
    ];
    assert.strictEqual(findOutMrWrong(conversation), null);
  });

  it('Conversation 5', () => {
    const conversation = [
      "Dowfls:There is 0 people behind me.",
      "Dowfls:I'm in 4th position.",
      "Ljiyxbmr:I'm in 2nd position.",
      "Ljiyxbmr:There is 1 people in front of me.",
      "Cvvugb:There are 2 people in front of me.",
      "Cvvugb:There is 1 people behind me.",
      "Tzjlvruhk:The man behind me is Dowfls.",
      "Tzjlvruhk:There are 2 people in front of me."
    ]
    assert.strictEqual(findOutMrWrong(conversation), null);
  });

  it('Conversation 6', () => {
    const conversation = [
      "Tom:The man behind me is Bob.",
      "Bob:The man in front of me is Tom.",
      "Bob:The man behind me is Gary.",
      "Gary:The man in front of me is Bob.",
      "Fred:I'm in 1st position."
    ];
    assert.strictEqual(findOutMrWrong(conversation), "Fred");
  });

  it('Conversation 7', () => {
    const conversation = [
      "Wrong:The man behind me is Wrong.",
    ];
    assert.strictEqual(findOutMrWrong(conversation), "Wrong");
  });
});

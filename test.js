const { Block, Blockchain } = require('./blockchain');

const blockchain = new Blockchain();

const block = new Block(
  Date.now().toString(),
  { foo: 'Bar', importantData: 123 }
);
blockchain.addBlock(block);

console.log(blockchain.chain);

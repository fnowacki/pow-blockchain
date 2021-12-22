const crypto = require('crypto');

const hash = (message) => (
  crypto
    .createHash('sha256')
    .update(message)
    .digest('hex')
);

class Block {
  constructor(timestamp, data = {}) {
    this.timestamp = timestamp;
    this.data = data;
    this.hash = this.getHash();
    this.previousHash = '';
    this.nonce = 0;
  }

  getHash() {
    return hash(this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce)
  }

  mine(difficulty) {
    while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
      this.nonce++;
      this.hash = this.getHash();
    }
  }
}

class Blockchain {
  constructor() {
    // chain contains all the blocks, the first one is a genesis block
    this.chain = [new Block(Date.now().toString())];
    this.difficulty = 1;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block) {
    block.previousHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);

    this.chain.push(Object.freeze(block));
  }

  isValid() {
    for (let i = 1; i < Blockchain.chain.length; i++) {
      const currentBlock = blockchain.chain[i];
      const previousBlock = blockchain.chain[i - 1];

      if (currentBlock.hash !== currentBlock.getHash() || previousBlock.hash !== currentBlock.previousHash) {
        return false;
      }

      return true;
    }
  }
}

module.exports = { Blockchain, Block };

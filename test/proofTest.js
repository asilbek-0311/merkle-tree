// const {assert} = require("chai");
// const {hashProof, sha256, concatHash, concatLetters} = require('./testUtil');
// const MerkleTree = require('../MerkleTree');
import MerkleTree from '../MerkleTree.js';
import utils from './testUtil.js';
const { hashProof, sha256, concatHash, concatLetters } = utils;
import { assert } from 'chai';

const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const root = 'eb100814abc896ab18bcf6c37b6550eeadeae0c312532286a4cf4be132ace526';
const hashTree = new MerkleTree(leaves.map(sha256), concatHash);
const lettersTree = new MerkleTree(leaves, concatLetters);

console.log('Starting Merkle proof test for each leaf...\n');

leaves.forEach((leaf, i) => {
  console.log(`Testing proof for leaf ${leaves[i]}...\n`);

  const proof = hashTree.getProof(i);
  const hashedProof = hashProof(leaf, proof).toString('hex');

  if (hashedProof !== root) {
    const lettersProof = lettersTree.getProof(i);
    console.log(
      "The resulting hash of your proof is wrong.\n" +
      `We were expecting: ${root}\n` +
      `We received: ${hashedProof}\n` +
      `In ${leaves.join('')} Merkle tree, the proof of ${leaves[i]} you gave us is:\n` +
      `${JSON.stringify(lettersProof, null, 2)}\n`
    );
  } else {
    console.log(`Proof for leaf ${leaves[i]} is correct.\n`);
  }

  assert.equal(hashedProof, root, `Error: Expected root does not match for leaf ${leaves[i]}`);
});

console.log('Finished Merkle proof test.\n');

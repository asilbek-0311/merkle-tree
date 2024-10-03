// const { assert } = require("chai");
// const MerkleTree = require('../MerkleTree');
// const verify = require('../verify');
import {assert} from 'chai';
import MerkleTree from '../MerkleTree.js';
import verify from '../verify.js';

const concat = (a, b) => `Hash(${a} + ${b})`;

const leaves = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];
const root = "Hash(Hash(Hash(Hash(A + B) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";

// Initialize tree
let tree = new MerkleTree(leaves.slice(0), concat);

// Untampered proofs
console.log("Running tests for untampered proofs:");
leaves.forEach((leaf, i) => {
  try {
    const proof = tree.getProof(i);
    assert.equal(verify(proof, leaves[i], root, concat), true);
    console.log(`Test passed for leaf index ${i}`);
  } catch (error) {
    console.error(`Test failed for leaf index ${i}: ${error.message}`);
  }
});

// Tampered proofs
console.log("\nRunning tests for tampered proofs:");

// Verifying a different node with a proof
try {
  let proof = tree.getProof(2);
  assert.equal(verify(proof, leaves[3], root, concat), false);
  console.log("Test passed for verifying a different node with a proof");
} catch (error) {
  console.error(`Test failed for verifying a different node with a proof: ${error.message}`);
}

// Verifying a different root
try {
  let proof = tree.getProof(2);
  const badRoot = "Hash(Hash(Hash(Hash(A + C) + Hash(C + D)) + Hash(Hash(E + F) + Hash(G + H))) + Hash(Hash(I + J) + K))";
  assert.equal(verify(proof, leaves[2], badRoot, concat), false);
  console.log("Test passed for verifying a different root");
} catch (error) {
  console.error(`Test failed for verifying a different root: ${error.message}`);
}

// Flipping a node's position
try {
  let proof = tree.getProof(3);
  proof[1].left = !proof[1].left;
  assert.equal(verify(proof, leaves[3], root, concat), false);
  console.log("Test passed for flipping a node's position");
} catch (error) {
  console.error(`Test failed for flipping a node's position: ${error.message}`);
}

// Editing a hash
try {
  let proof = tree.getProof(5);
  proof[2].data = "Q";
  assert.equal(verify(proof, leaves[5], root, concat), false);
  console.log("Test passed for editing a hash");
} catch (error) {
  console.error(`Test failed for editing a hash: ${error.message}`);
}

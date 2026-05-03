const crypto = require("crypto");


const HASH_ALGO = "sha256";


function hash(data) {
  return crypto.createHash(HASH_ALGO).update(data).digest("hex");
}


function hashLeaf(data) {
  return hash("LEAF:" + data);
}

function hashNode(left, right) {
  return hash("NODE:" + left + right);
}


function buildMerkleTree(leaves) {
  if (!Array.isArray(leaves) || leaves.length === 0) {
    throw new Error("No leaves provided for Merkle Tree");
  }

  
  let level = leaves.map(hashLeaf).sort();

  const tree = [level];

  while (level.length > 1) {
    const nextLevel = [];

    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] || left; 

      const parent = hashNode(left, right);
      nextLevel.push(parent);
    }

    level = nextLevel;
    tree.push(level);
  }

  return {
    root: level[0],
    tree
  };
}


function getMerkleProof(tree, index) {
  if (!tree || tree.length === 0) {
    throw new Error("Invalid Merkle tree");
  }

  let proof = [];

  for (let level = 0; level < tree.length - 1; level++) {
    const nodes = tree[level];

    const isRightNode = index % 2;
    const pairIndex = isRightNode ? index - 1 : index + 1;

    if (pairIndex < nodes.length) {
      proof.push({
        position: isRightNode ? "left" : "right",
        hash: nodes[pairIndex]
      });
    }

    index = Math.floor(index / 2);
  }

  return proof;
}


function verifyMerkleProof(leafData, proof, root) {
  if (!Array.isArray(proof)) return false;

  let computedHash = hashLeaf(leafData);

  for (const step of proof) {
    if (!step.hash || !step.position) return false;

    if (step.position === "left") {
      computedHash = hashNode(step.hash, computedHash);
    } else if (step.position === "right") {
      computedHash = hashNode(computedHash, step.hash);
    } else {
      return false;
    }
  }

  return computedHash === root;
}


module.exports = {
  buildMerkleTree,
  getMerkleProof,
  verifyMerkleProof
};
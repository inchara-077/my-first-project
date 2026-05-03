const crypto = require("crypto");

// ==========================
// 🔐 CONFIG
// ==========================
const HASH_ALGO = "sha256";

// ==========================
// 🔐 HASH FUNCTION
// ==========================
function hash(data) {
  return crypto.createHash(HASH_ALGO).update(data).digest("hex");
}

// ==========================
// 🔐 DOMAIN SEPARATION
// ==========================
function hashLeaf(data) {
  return hash("LEAF:" + data);
}

function hashNode(left, right) {
  return hash("NODE:" + left + right);
}

// ==========================
// 🌳 BUILD MERKLE TREE
// ==========================
function buildMerkleTree(leaves) {
  if (!Array.isArray(leaves) || leaves.length === 0) {
    throw new Error("No leaves provided for Merkle Tree");
  }

  // Deterministic ordering
  let level = leaves.map(hashLeaf).sort();

  const tree = [level];

  while (level.length > 1) {
    const nextLevel = [];

    for (let i = 0; i < level.length; i += 2) {
      const left = level[i];
      const right = level[i + 1] || left; // duplicate if odd

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

// ==========================
// 📜 GENERATE MERKLE PROOF
// ==========================
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

// ==========================
// 🔍 VERIFY MERKLE PROOF
// ==========================
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

// ==========================
// 🌍 EXPORTS
// ==========================
module.exports = {
  buildMerkleTree,
  getMerkleProof,
  verifyMerkleProof
};
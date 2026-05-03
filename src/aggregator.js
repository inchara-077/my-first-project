const { buildMerkleTree, getMerkleProof } = require("./merkle");

// Optional: sort hashes to make aggregation order-independent
function sortHashes(hashes) {
  return [...hashes].sort();
}

function aggregateProofs(processedProofs) {
  // Extract only valid proofs
  const validProofs = processedProofs.filter(p => p.status === "valid");

  const hashes = validProofs.map(p => p.hash);

  // 🔥 CRITICAL: deterministic ordering
  const orderedHashes = sortHashes(hashes);

  const merkleRoot = buildMerkleTree(orderedHashes);

  // Attach proofs
  validProofs.forEach((proof, index) => {
    proof.merkle_proof = getMerkleProof(orderedHashes, index);
    proof.merkle_root = merkleRoot;
  });

  return {
    merkle_root: merkleRoot,
    total_proofs: processedProofs.length,
    valid_proofs: validProofs.length,
  };
}

module.exports = { aggregateProofs };
const { buildMerkleTree, getMerkleProof } = require("./merkle");


function sortHashes(hashes) {
  return [...hashes].sort();
}

function aggregateProofs(processedProofs) {
 
  const validProofs = processedProofs.filter(p => p.status === "valid");

  const hashes = validProofs.map(p => p.hash);

  
  const orderedHashes = sortHashes(hashes);

  const merkleRoot = buildMerkleTree(orderedHashes);

 
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
const nacl = require("tweetnacl");
const util = require("tweetnacl-util");
const crypto = require("crypto");

function recomputeHash(canonical) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(canonical))
    .digest("hex");
}

function verifySignature(hash, signature, publicKey) {
  try {
    const messageUint8 = util.decodeUTF8(hash);

    const signatureUint8 = util.decodeBase64(signature);
    const publicKeyUint8 = util.decodeBase64(publicKey);

    return nacl.sign.detached.verify(
      messageUint8,
      signatureUint8,
      publicKeyUint8
    );
  } catch (error) {
    console.error("Verification Error:", error.message);
    return false;
  }
}

function verifyProofs(proofs) {
  const results = proofs.map((proof, index) => {

    // Recompute hash from canonical payload
    const recomputedHash = recomputeHash(proof.canonical);

    // Check integrity
    const hashMatches = recomputedHash === proof.hash;

    // Verify signature only if hash matches
    const signatureValid = hashMatches
      ? verifySignature(
          proof.hash,
          proof.signature,
          proof.public_key
        )
      : false;

    return {
      index,
      proof_id: proof.canonical.proof_id,

      stored_hash: proof.hash,
      recomputed_hash: recomputedHash,

      hash_matches: hashMatches,
      signature_valid: signatureValid,

      status:
        hashMatches && signatureValid
          ? "valid"
          : "tampered"
    };
  });

  return {
    total: proofs.length,
    results
  };
}

module.exports = {
  verifyProofs
};
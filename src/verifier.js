const nacl = require("tweetnacl");
const util = require("tweetnacl-util");

// 🔐 Single proof verification
function verifySignature(data, signature, publicKey) {
  try {
    const message = JSON.stringify(data);

    const messageUint8 = util.decodeUTF8(message);
    const signatureUint8 = util.decodeBase64(signature);
    const publicKeyUint8 = util.decodeBase64(publicKey);

    return nacl.sign.detached.verify(
      messageUint8,
      signatureUint8,
      publicKeyUint8
    );
  } catch (err) {
    console.error("Verification error:", err);
    return false;
  }
}

// 🔥 Batch verification (THIS WAS MISSING)
function verifyProofs(proofs) {
  const results = proofs.map((proof, index) => {
    const isValid = verifySignature(
      proof.data,
      proof.signature,
      proof.public_key
    );

    return {
      index,
      proof_id: proof.proof_id,
      hash: require("crypto")
        .createHash("sha256")
        .update(JSON.stringify(proof.data))
        .digest("hex"),
      signature_valid: isValid,
      status: isValid ? "valid" : "invalid"
    };
  });

  return {
    total: proofs.length,
    results
  };
}

// ✅ EXPORT BOTH
module.exports = {
  verifySignature,
  verifyProofs
};
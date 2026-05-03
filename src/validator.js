const { ProofError, ERROR_CODES } = require("./errors");

function validateProof(proof) {
  if (!proof.proof_id)
    throw new ProofError(ERROR_CODES.MISSING_FIELD, "Missing proof_id");

  if (!proof.source)
    throw new ProofError(ERROR_CODES.MISSING_FIELD, "Missing source");

  if (!proof.timestamp)
    throw new ProofError(ERROR_CODES.MISSING_FIELD, "Missing timestamp");

  if (!proof.data || typeof proof.data !== "object")
    throw new ProofError(ERROR_CODES.INVALID_TYPE, "Invalid data field");

  if (isNaN(Date.parse(proof.timestamp)))
    throw new ProofError(
      ERROR_CODES.INVALID_TIMESTAMP,
      "Invalid timestamp format"
    );

  return true;
}

module.exports = { validateProof };
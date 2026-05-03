class ProofError extends Error {
  constructor(code, message) {
    super(message);
    this.code = code;
  }
}

const ERROR_CODES = {
  MISSING_FIELD: "MISSING_FIELD",
  INVALID_TYPE: "INVALID_TYPE",
  INVALID_TIMESTAMP: "INVALID_TIMESTAMP",
};

module.exports = { ProofError, ERROR_CODES };
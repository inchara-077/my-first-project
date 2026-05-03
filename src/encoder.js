const crypto = require("crypto");
const { signData } = require("./crypto");


const PRIVATE_KEY = "WzMJMjhxb1LsNLqJpaB6Sxr+cXFZsJ0icwPzjNSuYSzY3M4zzLng+5/8j/jvzkXO0gRH+KAzJ7zPDka5XuM9rA==";


const PUBLIC_KEY = "2NzOM8y54PirF/I4785FztIER/igMye2aQ5GuV7jPaw=";


function canonicalize(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  if (Array.isArray(obj)) {
    return obj.map(canonicalize);
  }

  const sortedKeys = Object.keys(obj).sort();
  const result = {};

  for (let key of sortedKeys) {
    result[key] = canonicalize(obj[key]);
  }

  return result;
}


function generateHash(canonicalString) {
  return crypto.createHash("sha256").update(canonicalString).digest("hex");
}


function encodeProof(proof) {
  try {
    
    const canonicalObj = canonicalize(proof);
    const canonicalString = JSON.stringify(canonicalObj);

    
    const hash = generateHash(canonicalString);

    
    const signature = signData(canonicalString, PRIVATE_KEY);

    return {
      status: "valid",
      canonical: canonicalObj,
      hash,
      signature,
      public_key: PUBLIC_KEY,
      algorithm: "sha256",
      canonical_version: "RFC8785-inspired-v2"
    };

  } catch (error) {
    return {
      status: "invalid",
      error: error.message
    };
  }
}

module.exports = {
  encodeProof
};
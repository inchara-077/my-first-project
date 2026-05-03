const crypto = require("crypto");
const { signData } = require("./crypto");

// 🔐 PASTE YOUR PRIVATE KEY HERE (from genKeys.js output)
const PRIVATE_KEY = "WzMJMjhxb1LsNLqJpaB6Sxr+cXFZsJ0icwPzjNSuYSzY3M4zzLng+5/8j/jvzkXO0gRH+KAzJ7zPDka5XuM9rA==";

// 🔓 PASTE YOUR PUBLIC KEY HERE
const PUBLIC_KEY = "2NzOM8y54PirF/I4785FztIER/igMye2aQ5GuV7jPaw=";

// ✅ Canonical JSON (sorted keys recursively)
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

// ✅ Generate SHA256 hash
function generateHash(canonicalString) {
  return crypto.createHash("sha256").update(canonicalString).digest("hex");
}

// ✅ MAIN ENCODER FUNCTION
function encodeProof(proof) {
  try {
    // 1. Canonicalize
    const canonicalObj = canonicalize(proof);
    const canonicalString = JSON.stringify(canonicalObj);

    // 2. Hash
    const hash = generateHash(canonicalString);

    // 3. 🔐 REAL SIGNATURE (Ed25519)
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
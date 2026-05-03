const nacl = require("tweetnacl");
const util = require("tweetnacl-util");

// Generate key pair
const keyPair = nacl.sign.keyPair();

const publicKeyBase64 = util.encodeBase64(keyPair.publicKey);
const secretKey = keyPair.secretKey;

// Data with timestamp
const data = {
  temperature: 28
};

const timestamp = Date.now();

// Convert message to string
const message = JSON.stringify(data);

// Sign the message
const signature = nacl.sign.detached(
  util.decodeUTF8(message),
  secretKey
);

// Convert signature to base64
const signatureBase64 = util.encodeBase64(signature);

// Final proof object
const proof = {
  proof_id: "101",
  data,
  signature: signatureBase64,
  public_key: publicKeyBase64,
  timestamp
};

// Output
console.log("\n🔥 GENERATED PROOF:\n");
console.log(JSON.stringify(proof, null, 2));
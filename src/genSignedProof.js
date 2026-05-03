const nacl = require("tweetnacl");
const util = require("tweetnacl-util");


const keyPair = nacl.sign.keyPair();

const publicKeyBase64 = util.encodeBase64(keyPair.publicKey);
const secretKey = keyPair.secretKey;


const data = {
  temperature: 28
};

const timestamp = Date.now();


const message = JSON.stringify(data);


const signature = nacl.sign.detached(
  util.decodeUTF8(message),
  secretKey
);


const signatureBase64 = util.encodeBase64(signature);


const proof = {
  proof_id: "101",
  data,
  signature: signatureBase64,
  public_key: publicKeyBase64,
  timestamp
};


console.log("\n🔥 GENERATED PROOF:\n");
console.log(JSON.stringify(proof, null, 2));
const nacl = require("tweetnacl");
const util = require("tweetnacl-util");

function generateKeyPair() {
  const keyPair = nacl.sign.keyPair();
  return {
    publicKey: util.encodeBase64(keyPair.publicKey),
    privateKey: util.encodeBase64(keyPair.secretKey)
  };
}

function signData(message, privateKey) {
  const msgUint8 = util.decodeUTF8(message);
  const secretKeyUint8 = util.decodeBase64(privateKey);

  const signature = nacl.sign.detached(msgUint8, secretKeyUint8);
  return util.encodeBase64(signature);
}

function verifySignature(message, signature, publicKey) {
  const msgUint8 = util.decodeUTF8(message);
  const sigUint8 = util.decodeBase64(signature);
  const pubKeyUint8 = util.decodeBase64(publicKey);

  return nacl.sign.detached.verify(msgUint8, sigUint8, pubKeyUint8);
}

module.exports = {
  generateKeyPair,
  signData,
  verifySignature
};
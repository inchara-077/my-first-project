const { generateKeyPair } = require("./crypto");

const keys = generateKeyPair();

console.log("Public Key:", keys.publicKey);
console.log("Private Key:", keys.privateKey);
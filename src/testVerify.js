const { verifyProofs } = require("./verifier");

const generatedProof = require("./generatedProof.json");

const result = verifyProofs([generatedProof]);

console.log("Verification Result:");
console.log(JSON.stringify(result, null, 2));
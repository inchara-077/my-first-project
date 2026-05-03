const { verifyProof } = require("./verifier");

// 👇 COPY ONE RESULT FROM YOUR TERMINAL OUTPUT
const testInput = {
  canonical: {
    data: { temperature: 28 },
    proof_id: "101",
    source: "sensor_A",
    timestamp: "2026-05-02T11:00:00Z"
  },

  hash: "9110e5b17094ba8f653d272924e3b1df7997e589856b2ac5d459f917e78f3da7",

  signature: "ed69da7fc685c4889082ff42d4ac987824ad64c307042e633d118f392ace7fb2",

  merkle_proof: [
    {
      position: "right",
      hash: "bc1e31428ede71df56fce330444baaf88c2a3d3884414a5fb214f97b50999f0e"
    }
  ],

  merkle_root: "5f29d6556c6dfff606598a262fd7bfca32df850541055f910dae52cd439831de"
};

const result = verifyProof(testInput);

console.log("Verification Result:");
console.log(JSON.stringify(result, null, 2));
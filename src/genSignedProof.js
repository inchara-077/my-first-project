const fs = require("fs");
const crypto = require("crypto");

function sha256(data) {
    return crypto.createHash("sha256").update(data).digest("hex");
}

const canonical = {
    proof_id: "101",
    source: "sensor_A",
    timestamp: Date.now(),
    data: {
        temperature: 28
    }
};

const hash = sha256(
    JSON.stringify(canonical)
);

const proof = {
    canonical,
    hash,
    signature: "demo-signature",
    public_key: "demo-public-key",
    merkle_proof: [
        {
            position: "right",
            hash: sha256("node")
        }
    ],
    merkle_root: sha256(hash)
};

fs.writeFileSync(
    "./src/generatedProof.json",
    JSON.stringify(proof, null, 4)
);

console.log("✅ generatedProof.json created");
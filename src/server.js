const express = require("express");
const crypto = require("crypto");

const app = express();

app.use(express.json());

function sha256(data) {
    return crypto.createHash("sha256").update(data).digest("hex");
}

function verifyProof(proof) {
    try {
        // Check canonical object
        if (!proof.canonical) {
            return {
                status: "rejected",
                reason: "Missing canonical proof"
            };
        }

        // Timestamp validation
        const now = Date.now();

        if (!proof.canonical.timestamp) {
            return {
                status: "rejected",
                reason: "Missing timestamp"
            };
        }

        const proofTime = Number(proof.canonical.timestamp);

        // 10 minute window
        const maxAge = 10 * 60 * 1000;

        if (Math.abs(now - proofTime) > maxAge) {
            return {
                status: "rejected",
                reason: "Expired timestamp"
            };
        }

        // Hash verification
        const recalculatedHash = sha256(
            JSON.stringify(proof.canonical)
        );

        if (recalculatedHash !== proof.hash) {
            return {
                status: "rejected",
                reason: "Hash mismatch"
            };
        }

        // Merkle root check
        if (!proof.merkle_root) {
            return {
                status: "rejected",
                reason: "Missing merkle root"
            };
        }

        return {
            status: "verified"
        };

    } catch (err) {
        return {
            status: "rejected",
            reason: err.message
        };
    }
}

app.post("/attest", (req, res) => {

    const proofs = req.body.proofs;

    if (!Array.isArray(proofs)) {
        return res.status(400).json({
            success: false,
            error: "proofs must be an array"
        });
    }

    const results = proofs.map((proof, index) => {

        const verification = verifyProof(proof);

        return {
            index,
            ...verification
        };
    });

    const valid = results.filter(r => r.status === "verified").length;

    const invalid = results.filter(r => r.status !== "verified").length;

    res.json({
        success: true,
        summary: {
            total: proofs.length,
            valid,
            invalid
        },
        results
    });
});

app.listen(3000, () => {
    console.log("🔥 Server running on http://localhost:3000");
});
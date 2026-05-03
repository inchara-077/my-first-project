const express = require("express");
const bodyParser = require("body-parser");
const nacl = require("tweetnacl");
const util = require("tweetnacl-util");

const app = express();
app.use(bodyParser.json());

app.post("/attest", (req, res) => {
  try {
    const proofs = req.body.proofs;

    if (!Array.isArray(proofs)) {
      return res.status(400).json({
        success: false,
        error: "Expected 'proofs' to be an array"
      });
    }

    const results = proofs.map((proof, index) => {
      const { proof_id, data, signature, public_key, timestamp } = proof;

      let signature_valid = false;
      let reason = "OK";

      try {
       
        const now = Date.now();
        if (!timestamp || now - timestamp > 5 * 60 * 1000) {
          return {
            index,
            proof_id,
            status: "rejected",
            reason: "Expired or missing timestamp"
          };
        }

        const message = JSON.stringify(data);

        signature_valid = nacl.sign.detached.verify(
          util.decodeUTF8(message),
          util.decodeBase64(signature),
          util.decodeBase64(public_key)
        );

        if (!signature_valid) {
          reason = "Invalid signature";
        }

      } catch (err) {
        reason = "Verification error";
      }

      return {
        index,
        proof_id,
        signature_valid,
        status: signature_valid ? "valid" : "invalid",
        reason
      };
    });

    res.json({
      success: true,
      summary: {
        total: results.length,
        valid: results.filter(r => r.status === "valid").length,
        invalid: results.filter(r => r.status === "invalid").length
      },
      results
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message
    });
  }
});

app.listen(3000, () => {
  console.log("🔥 Server running on http://localhost:3000");
});
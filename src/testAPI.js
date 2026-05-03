const axios = require("axios");

// 🔥 PASTE YOUR GENERATED PROOF HERE
const proof = {
  "proof_id": "101",
  "data": {
    "temperature": 28
  },
  "signature": "0V/l3ViQoSFe43KkNSzd/e3L2TR0AKUccO8bi5SpUNwVl5uXGVMSZigrEwumrAWnMVWo9AtmEfRWJX4mXHFrBg==",
  "public_key": "+6hacjXKZTe2xdFAgvxtxoPBeFjwNx90sXqrXsHZeQQ=",
  "timestamp": 1777809569691
};

async function test() {
  try {
    const res = await axios.post("http://localhost:3000/attest", {
      proofs: [proof]
    });

    console.log("\n🔥 CLEAN RESPONSE:\n");
    console.log(JSON.stringify(res.data, null, 2));

  } catch (err) {
    console.error("\n❌ ERROR:\n");
    console.error(err.response?.data || err.message);
  }
}

test();
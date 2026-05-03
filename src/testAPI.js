const axios = require("axios");


const proof = {
  "proof_id": "101",
  "data": {
    "temperature": 999
  },
  "signature": "aJOlKJUBlWvRacJI9Y5PYumYBjEuUHMBtdzudElPhJHCSOcgolNqzBNXOAxePbEH+4ZzIysAY4mjctNM/YTADQ==",
  "public_key": "CohPcacujMyaH2YFjeLJVFE6KH4zlBjuMn8xhDu/40o=",
  "timestamp": 1777812773134
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
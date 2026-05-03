# 🚀 Proof Attestation Gateway (PAG)

## 🔥 Overview

Proof Attestation Gateway (PAG) is a verification layer that ensures data integrity, authenticity, and trust in decentralized robotic systems.

This module verifies:

* Data integrity using cryptographic hashing
* Authenticity using digital signatures (Ed25519)
* Structured proof validation

## ⚙️ Features

* Canonical proof encoding
* Cryptographic hashing (SHA-256)
* Digital signature verification
* Batch proof validation
* Clean API response format

## 🧪 Example Output

```json
{
  "success": true,
  "summary": {
    "total": 1,
    "valid": 1,
    "invalid": 0
  },
  "results": [
    {
      "proof_id": "101",
      "status": "valid"
    }
  ]
}
```

## 🛠 Tech Stack

* Node.js
* Express.js
* TweetNaCl (Ed25519 crypto)
* Axios (API testing)

## 🚀 How to Run

```bash
npm install
node src/server.js
node src/testAPI.js
```

## 🌍 Use Case

Enables secure and verifiable communication between robots and blockchain systems in decentralized environments.

## 👨‍💻 Author

Inchara R

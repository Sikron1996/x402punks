import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

const NETWORK = process.env.NETWORK || "bsc";
const ASSET = process.env.ASSET || "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
const PAYTO = process.env.PAYTO || "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA";
const MAX_AMOUNT = process.env.MAX_AMOUNT || "1";
const DESCRIPTION = process.env.DESCRIPTION || "x402punks service payment (1 USDC)";
const PAYER = process.env.PAYER || "https://facilitator.x402bscan.io";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    payer: PAYER,
    payTo: PAYTO
  });
});

app.get("/api/pay", (req, res) => {
  if (req.query && req.query.paid === "true") {
    return res.status(200).json({
      status: "success",
      message: "✅ Payment successful"
    });
  }

  const proto = req.headers["x-forwarded-proto"] || "http";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const resourceUrl = `${proto}://${host}/api/pay`;

  const x402Response = {
    x402Version: 1,
    payer: PAYER,
    accepts: [
      {
        scheme: "exact",
        network: NETWORK,
        maxAmountRequired: String(MAX_AMOUNT),
        resource: resourceUrl,
        description: DESCRIPTION,
        mimeType: "application/json",
        payTo: PAYTO,
        maxTimeoutSeconds: 600,
        asset: ASSET
      }
    ]
  };

  res.status(402).json(x402Response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`x402punks-endpoint-demo-usd402 listening on :${PORT}`);
});

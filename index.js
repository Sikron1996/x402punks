import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

const NETWORK = process.env.NETWORK || "bsc";
const ASSET = process.env.ASSET || "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d";
const PAYTO = process.env.PAYTO || "0x6287A04a0Ca5Dad1F0b3FF05199cb500Ca45a89C";
const MAX_AMOUNT = process.env.MAX_AMOUNT || "1";
const DESCRIPTION = process.env.DESCRIPTION || "x402punks service payment (1 USD1)";
const PAYER = process.env.PAYER || "https://facilitator.x402bscan.io";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/public", express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => res.render("index"));

app.get("/api/pay", (req, res) => {
  if (req.query && req.query.paid === "true") {
    return res.status(200).json({
      status: "success",
      message: "✅ Payment successful"
    });
  }
  const proto = req.headers["x-forwarded-proto"] || "https";
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const resourceUrl = `${proto}://${host}/api/pay`;
  const x402Response = {
    x402Version: 1,
    payer: PAYER,
    accepts: [{
      scheme: "exact",
      network: NETWORK,
      maxAmountRequired: String(MAX_AMOUNT),
      resource: resourceUrl,
      description: DESCRIPTION,
      mimeType: "application/json",
      payTo: PAYTO,
      maxTimeoutSeconds: 600,
      asset: ASSET
    }]
  };
  res.status(402).json(x402Response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`x402punks-endpoint-usd1 running on port ${PORT}`));

export default async function handler(req, res) {
  if (req.query && req.query.paid === "true") {
    return res.status(200).json({
      status: "success",
      message: "✅ Payment successful"
    });
  }
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  const resourceUrl = `${proto}://${host}/api/pay`;
  const x402Response = {
    x402Version: 1,
    payer: "https://facilitator.x402bscan.io",
    accepts: [{
      scheme: "exact",
      network: "bsc",
      maxAmountRequired: "1",
      resource: resourceUrl,
      description: "x402punks service payment (1 USD1)",
      mimeType: "application/json",
      payTo: "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA",
      maxTimeoutSeconds: 600,
      asset: "0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d"
    }]
  };
  res.status(402).json(x402Response);
}

// api/pay.js — x402punks endpoint with strict validation schema for x402bscan.io

export default async function handler(req, res) {
  // ✅ Якщо callback з параметром ?paid=true — це означає успішну оплату
  if (req.query && req.query.paid === "true") {
    return res.status(200).json({
      status: "success",
      message: "✅ Payment successful"
    });
  }

  // Динамічне визначення поточного ресурсу
  const host = req.headers["x-forwarded-host"] || req.headers.host;
  const proto = req.headers["x-forwarded-proto"] || "https";
  const resourceUrl = `${proto}://${host}/api/pay`;

  // ✅ Повна відповідь згідно strict schema Definition
  const x402Response = {
    x402Version: 1,
    payer: "https://facilitator.x402bscan.io",
    accepts: [
      {
        scheme: "exact",
        network: "bsc",
        maxAmountRequired: "1",
        resource: resourceUrl,
        description: "x402punks service payment (1 USDC)",
        mimeType: "application/json",
        payTo: "0xF97a410f2f0b64Cb5820baD63d878c3A967235AA",
        maxTimeoutSeconds: 600,
        asset: "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d",

        // ✅ Обов’язкове поле для валідації — опис очікуваних запитів
        outputSchema: {
          input: {
            type: "http",
            method: "GET",
            queryParams: {
              paid: {
                type: "boolean",
                required: false,
                description: "When true, indicates the payment has been completed and verified."
              }
            }
          },
          output: {
            type: "object",
            properties: {
              status: { type: "string", example: "success" },
              message: { type: "string", example: "✅ Payment successful" }
            }
          }
        },

        // ✅ Необов’язковий блок із додатковою інформацією
        extra: {
          project: "x402punks-endpoint-demo-usd402",
          creator: "x402bscan-compatible",
          contact: "https://x402bscan.io"
        }
      }
    ]
  };

  // Повертаємо статус 402 (Payment Required)
  res.status(402).json(x402Response);
}

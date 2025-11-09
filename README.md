# x402punks-endpoint-usd1

Endpoint для прийому оплат через x402bscan (BSC, USD1).

## Параметри
- NETWORK: bsc
- ASSET: 0x8d0D000Ee44948FC98c9B98A4FA4921476f08B0d
- PAYTO: 0xF97a410f2f0b64Cb5820baD63d878c3A967235AA
- MAX_AMOUNT: 1
- DESCRIPTION: x402punks service payment (1 USD1)
- PAYER: https://facilitator.x402bscan.io

## Запуск
```
cp .env.example .env
npm install
npm start
```
Потім відкрити http://localhost:3000

## Відповідь після оплати
```json
{
  "status": "success",
  "message": "✅ Payment successful"
}
```

# x402punks-endpoint-demo-usd402

Повноцінний приклад x402 endpoint (BSC, 1 USDC) з UI, як у репозиторії x402bscan/x402-endpoint-demo-usd402, але під ваші параметри.

## Параметри (вже виставлено)
- NETWORK=bsc
- ASSET=0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d
- PAYTO=0xF97a410f2f0b64Cb5820baD63d878c3A967235AA
- MAX_AMOUNT=1
- DESCRIPTION="x402punks service payment (1 USDC)"
- PAYER=https://facilitator.x402bscan.io

## Запуск локально
```bash
cp .env.example .env
npm install
npm start
```
Потім: http://localhost:3000

## Маршрути
- `GET /` — UI з кнопкою "Pay 1 USDC (BSC)"
- `GET /api/pay` — повертає 402 Payment Required з x402 JSON
- `GET /api/pay?paid=true` — повертає
  ```json
  {
    "status": "success",
    "message": "✅ Payment successful"
  }
  ```

## Деплой
Можна деплоїти на Railway (файл railway.json вже є) або на будь-який Node.js-хостинг.

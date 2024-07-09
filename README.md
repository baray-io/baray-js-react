# Baray JS for React

## 1. Front-end Integration (React)

### Installation

```bash
npm i baray-io/baray-js-react
```

### Usage

Wrap BarayProvider at your project root.

```jsx
import React from "react"
import { BarayProvider } from "baray-js-react"

export defaut function App() {
  return (
    <BarayProvider apiKey={YOUR_BARAY_PUBLIC_KEY}>
      {/* your app */}
    </BarayProvider>
  )
}
```

At your checkout button

```jsx
import { useBaray } from "baray-js-react";

export default function Cart() {
	const baray = useBaray();

	const handleCheckOut = async () => {
		// Call your backend API to create an intent
		const intent = await createIntent();
		// Call baray-js to the payment with
		// the intent_id you created at your
		// backend
		baray.confirmPayment(intent._id);
	};

	return <button onClick={handleCheckOut}>Check Out</button>;
}
```

## 2. Backend Integration

### Installation

```bash
npm i baray-io/baray-js#dev
```

### Usage

```js
import express from "express";
import { PrivateClient } from "baray-js";

const app = exporess();

const baray = new PrivateClient(
	process.env.BARAY_PUBLIC_KEY,
	process.env.BARAY_SECRET_KEY,
	process.env.BARAY_IV_KEY,
	process.env.BARAY_WH_SK,
	process.env.BARAY_WH_IV
);

// create your intent
app.post("/api/intents", async (req, res) => {
	// Create order at your end
	const order = await createOrder();

	// Summit your important order details to baray
	// using baray-js
	const intent = await baray.createIntent({
		order_id: order._id,
		currency: order.currency,
		amount: order.amount,
	});

	// Send the intent id to your frontend to process
	// the payment
	res.json({
		id: intent.id,
	});
});

// this endpoint allow Baray to callback to
// your backend when the transaction has
// been completed. Example payload:
// { "encrypted_order_id": "encrypted_string" }
app.post("/api/webhook", async (req, res) => {
	// use baray js to decrypt the intent
	const decrypted = baray.decryptIntent(req.body.encrypted_order_id);
	// after decrypted, register the transaction
	// at your end to finish the order
	const tx = await createTransaction({
		orderId: decrypted,
	});
	// response back to Baray to confirm
	// your end has receive the transaction
	res.json(tx);
});
```

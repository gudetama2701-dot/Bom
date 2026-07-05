# Bom

Bom is a simple demo app for scanning or uploading a receipt or QR image and presenting the extracted payment details in a polished, bank-style receipt view.

## Features
- Upload an image containing a QR code
- Decode QR payloads directly in the browser
- Extract transfer-like amounts and bank-related fields
- Display a realistic receipt-style result card
- Include a sample payload for quick preview

## Run locally
1. Open the project folder in a terminal.
2. Start a local server:
   ```bash
   python -m http.server 8000
   ```
3. Visit http://127.0.0.1:8000/index.html

## Project files
- index.html — app layout and UI
- styles.css — visual styling for the receipt experience
- app.js — QR parsing and result rendering logic

# Clipboard Sync - Cross-Platform Clipboard Sharing

แอปพลิเคชันสำหรับซิงค์คลิปบอร์ดระหว่าง PC (Windows) และมือถือ (Android) โดยใช้ QR Code Pairing

## 🚀 เริ่มต้นอย่างรวดเร็ว

👉 **[⚡ QUICK START](QUICK_START.md)** - เริ่มใช้ใน 5 นาที

👉 **[📥 DOWNLOAD & INSTALL](DOWNLOAD.md)** - วิธีดาวน์โหลดและติดตั้งแบบละเอียด

👉 **[📦 RELEASE PAGE](releases/index.html)** - ⭐ **ดาวน์โหลด Desktop + Mobile APK**

## ⚙️ Requirements

### Desktop (Windows)
- Node.js 14+
- Electron
- Windows 7 or higher

### Mobile (Android)
- Android 6.0 or higher
- React Native

## 📦 Installation

### 1. Setup Desktop App

```bash
cd desktop
npm install
npm start
```

### 2. Setup Server

```bash
cd server
npm install
npm start
```

Server จะทำงานที่ `http://localhost:3000`

### 3. Setup Mobile App

```bash
cd mobile
npm install
npm start
```

## 🚀 วิธีใช้

### บน PC (Desktop)
1. เปิดแอป Desktop
2. กดปุ่ม "Generate Pairing QR Code"
3. QR Code จะปรากฏ
4. สแกน QR Code ด้วยมือถือ

### บน Mobile
1. เปิดแอป Mobile
2. กด "Scan QR Code"
3. สแกน QR Code จากหน้าจอ PC
4. ระบบจะจับคู่อุปกรณ์อัตโนมัติ

## 🔄 ฟีเจอร์

- ✅ QR Code Pairing
- ✅ Real-time Clipboard Sync
- ✅ Copy from PC → Paste on Mobile
- ✅ Copy from Mobile → Paste on PC
- ✅ Socket.io for real-time communication
- ✅ Session-based connection
- ✅ Secure device pairing

## 📊 Architecture

```
┌─────────────────┐
│   Desktop App   │  (Electron + Windows)
│  (QR Generator) │
└────────┬────────┘
         │
         │ Socket.io
         │
┌────────▼────────┐
│ Backend Server  │
│  (Node.js)      │
└────────┬────────┘
         │
         │ Socket.io
         │
┌────────▼────────┐
│  Mobile App     │  (Android)
│ (React Native)  │
└─────────────────┘
```

## 🔐 Security

- Device pairing ด้วย unique token
- Session-based connections
- CORS enabled for cross-origin requests

## 📝 Notes

- ปัจจุบันยังในเฟส Development
- Server ต้องทำงานอยู่ตลอดเวลา
- ระบบทำงานใน LAN (WiFi network)

## 🐛 Troubleshooting

### "Cannot connect to server"
- ตรวจสอบว่า Server กำลังทำงาน (`npm start` ใน folder `server`)
- ตรวจสอบ IP address ให้ตรงกัน

### "QR Code ไม่อ่านได้"
- ตรวจสอบการมองเห็นของ QR Code
- ลองเปลี่ยนระยะห่างหรือแสงสว่าง

### "Mobile ไม่ได้ synchronize"
- ตรวจสอบการเชื่อมต่อ WiFi
- ลองจับคู่อีกครั้ง

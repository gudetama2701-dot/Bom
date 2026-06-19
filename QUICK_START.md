# ⚡ Quick Start (เริ่มใช้งานอย่างรวดเร็ว)

## 🎯 5 นาที: สตาร์ทแอปปกติ

### ขั้น 1: เปิด Server (Terminal 1)
```bash
cd clipboard-sync/server
npm install
npm start
```
✅ จะเห็น: `Server running on port 3000`

### ขั้น 2: เปิด Desktop App (Terminal 2)
```bash
cd clipboard-sync/desktop
npm install
npm start
```
✅ Electron window จะเปิดขึ้น

### ขั้น 3: เปิด Mobile
- ติดตั้ง `clipboard-sync.apk` บนมือถือ
- เปิดแอป

### ขั้น 4: จับคู่
**บน Desktop:**
- กดปุ่ม "Generate Pairing QR Code"
- QR Code จะปรากฏ

**บน Mobile:**
- แตะ "📲 Scan QR Code"
- ชี้กล้องไปที่ QR Code

✅ เสร็จ!

---

## 🚀 ใช้งาน

**ส่งข้อความจาก PC → Mobile:**
1. พิมพ์ข้อความบน Desktop App
2. กด "📤 Send to Mobile"
3. มือถือรับโดยอัตโนมัติ

**ส่งข้อความจาก Mobile → PC:**
1. พิมพ์บน Mobile App
2. กด "📤 Send to PC"
3. PC clipboard อัปเดต

---

## ❌ ถ้ามีปัญหา

| ปัญหา | วิธีแก้ |
|-------|--------|
| Server ไม่เริ่ม | ตรวจสอบ port 3000 ว่างหรือไม่ |
| QR Code ไม่อ่าน | เพิ่มแสง เลื่อนห่างออก |
| ไม่ได้เชื่อมต่อ | PC และ Mobile WiFi เดียวกันไหม? |

ดู [DOWNLOAD.md](DOWNLOAD.md) สำหรับรายละเอียด

---

## 📋 Checklist
- [ ] Node.js ติดตั้งแล้ว
- [ ] โปรเจกต์ clone/ดาวน์โหลดแล้ว
- [ ] Server ทำงาน (port 3000)
- [ ] Desktop App เปิด
- [ ] Mobile App ติดตั้ง
- [ ] WiFi เชื่อมต่อเดียวกัน
- [ ] QR Code สแกนแล้ว
- [ ] ✅ Connected!

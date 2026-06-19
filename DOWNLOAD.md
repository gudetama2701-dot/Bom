# 📥 วิธีดาวน์โหลดและติดตั้ง Clipboard Sync

## 🖥️ Desktop (Windows)

### ตัวเลือกที่ 1: ดาวน์โหลด .EXE Installer (แนะนำ)
1. ดาวน์โหลด `ClipboardSync-Setup.exe`
2. ดับเบิลคลิกเพื่อติดตั้ง
3. ทำตามตัวช่วยสำหรับการติดตั้ง
4. เสร็จ! เปิดแอปจากเมนูสตาร์ท

### ตัวเลือกที่ 2: ติดตั้งจาก Source Code

**ขั้นตอนที่ 1: ติดตั้ง Node.js**
- ดาวน์โหลด: https://nodejs.org/
- เลือก LTS version (ปัจจุบัน 18+)
- ติดตั้ง

**ขั้นตอนที่ 2: Clone โปรเจกต์**
```bash
git clone https://github.com/yourusername/clipboard-sync.git
cd clipboard-sync
```

**ขั้นตอนที่ 3: ติดตั้ง Dependencies**
```bash
npm install
cd server
npm install
cd ../desktop
npm install
```

**ขั้นตอนที่ 4: เริ่มต้นใช้งาน**

เปิด 3 terminal windows:

Terminal 1 - Server:
```bash
cd server
npm start
```

Terminal 2 - Desktop:
```bash
cd desktop
npm start
```

Terminal 3 - สำหรับคำสั่งอื่น (เก็บไว้สำรอง)

---

## 📱 Mobile (Android)

### ตัวเลือกที่ 1: ดาวน์โหลด APK (ง่ายที่สุด) ⭐

**ขั้นตอนที่ 1: ดาวน์โหลด**
- ดาวน์โหลด `clipboard-sync.apk` (ประมาณ 50-100 MB)
- บันทึกลงในมือถือ

**ขั้นตอนที่ 2: เปิดใจให้กับแอปที่ไม่รู้จัก**
```
ไปที่ Settings (ตั้งค่า)
  → Security (ความปลอดภัย)
  → Unknown Sources (แหล่งที่ไม่รู้จัก)
  → เปิด ✓
```

Note: Android 12+ อาจแตกต่างกัน:
```
Settings → Apps → Special app access → Install unknown apps → ให้ Browser แอป
```

**ขั้นตอนที่ 3: ติดตั้ง**
1. เปิด File Manager
2. ไปที่โฟลเดอร์ Downloads
3. หา `clipboard-sync.apk`
4. แตะเพื่อติดตั้ง
5. ตกลง/ยืนยันการติดตั้ง

**ขั้นตอนที่ 4: เปิดแอป**
- หาแอป "Clipboard Sync" ในแอปฉันทั้งหมด
- แตะเพื่อเปิด

### ตัวเลือกที่ 2: ติดตั้งจาก Source Code (สำหรับ Developer)

**ขั้นตอนที่ 1: ติดตั้ง Requirements**
- Node.js 14+ : https://nodejs.org/
- Android Studio: https://developer.android.com/studio
- JDK 11+: https://www.oracle.com/java/technologies/javase-jdk11-downloads.html

**ขั้นตอนที่ 2: Clone โปรเจกต์**
```bash
git clone https://github.com/yourusername/clipboard-sync.git
cd clipboard-sync/mobile
```

**ขั้นตอนที่ 3: ติดตั้ง Dependencies**
```bash
npm install
```

**ขั้นตอนที่ 4: ตั้งค่า Android Environment**
- เปิด Android Studio
- ไปที่ Tools > SDK Manager
- ติดตั้ง Android SDK Platform 31+
- Accept licenses

**ขั้นตอนที่ 5: Build APK**
```bash
npm run build
```

หรือรันบนอุปกรณ์/ตัวจำลอง:
```bash
npm run android
```

---

## 🚀 การใช้งาน

### ขั้นตอนแรก (ต้องทำแค่ครั้งเดียว)

1. **เปิด Server** (บน PC)
   - ตรวจสอบให้แน่ใจว่า Server ทำงาน: http://localhost:3000

2. **เปิด Desktop App** (บน PC)
   - กดปุ่ม "Generate Pairing QR Code"
   - QR Code จะปรากฏบนหน้าจอ

3. **เปิด Mobile App** (บน Android)
   - แตะปุ่ม "📲 Scan QR Code"
   - ชี้กล้องไปที่ QR Code บนหน้าจอ PC
   - รอให้อ่าน...
   - ตกลงเมื่อขึ้น "✅ Connected!"

### การใช้งานประจำวัน

**ส่งจาก PC ไปยัง Mobile:**
1. คัดลอกข้อความบน PC (`Ctrl+C`)
2. บน Desktop App กดปุ่ม "📤 Sync Clipboard to Mobile"
3. มือถือจะรับข้อความโดยอัตโนมัติ

**ส่งจาก Mobile ไปยัง PC:**
1. พิมพ์ข้อความบน Mobile App
2. แตะปุ่ม "📤 Send to PC"
3. PC Clipboard จะอัปเดต

---

## 🔧 Troubleshooting

### "Server not found" / "Connection failed"
✅ **วิธีแก้:**
- ตรวจสอบว่า Server ทำงาน:
  ```bash
  cd server
  npm start
  ```
- ตรวจสอบ PC และมือถือเชื่อมต่อ WiFi เดียวกัน
- ไฟร์วอลล์อาจบล็อก port 3000 บน Windows:
  - ไปที่ Settings > Firewall > Allow app through firewall
  - ค้นหา Node.js หรือ port 3000
  - อนุญาตให้ผ่าน

### "Cannot scan QR Code"
✅ **วิธีแก้:**
- ตรวจสอบให้แสงสว่างพอ
- ลองเลื่อนมือถือห่างจาก QR Code ประมาณ 20-30 ซม.
- QR Code ต้องอยู่ในกรอบ

### "Permission denied" (Mobile)
✅ **วิธีแก้:**
- ไปที่ Settings > Apps > Clipboard Sync > Permissions
- เปิด Camera, Internet, Storage

### "Clipboard not sync"
✅ **วิธีแก้:**
- ตรวจสอบการเชื่อมต่อ WiFi
- ลองจับคู่ใหม่ (กดปุ่ม Disconnect แล้ว scan QR ใหม่)
- รีสตาร์ท Server

---

## 📊 ความต้องการของระบบ

### Desktop (Windows)
- Windows 7 or higher
- Node.js 14+
- RAM: 2 GB (ขั้นต่ำ), 4 GB (แนะนำ)
- Free disk space: 500 MB

### Mobile (Android)
- Android 6.0 or higher
- RAM: 2 GB (ขั้นต่ำ)
- Free storage: 200 MB

### Network
- WiFi network (PC และ Mobile อยู่เดียวกัน)
- Internet connection (สำหรับดาวน์โหลด)

---

## 🔐 ความปลอดภัย

- ✅ Token-based pairing
- ✅ Session isolation (แต่ละ pair มี session ของตัวเอง)
- ✅ No cloud storage (ข้อมูลอยู่ LAN เท่านั้น)
- ⚠️ ไม่ควรใช้บน public WiFi

---

## 💡 Tips & Tricks

1. **ตัวจำลองแทนมือถือจริง:**
   ```bash
   npm run android  # ต้องเปิด Android Emulator ก่อน
   ```

2. **ดูข้อมูล debug:**
   - Desktop: DevTools เปิดอยู่แล้ว (F12)
   - Mobile: `npm start` แล้วกด `d`

3. **รีสตาร์ท metro bundler:**
   ```bash
   npm start
   ```

4. **ล้าง cache:**
   ```bash
   npm start -- --reset-cache
   ```

---

## ❓ FAQ

**Q: ต้อง server ทำงานตลอดไหม?**
A: ใช่ Server ต้องทำงานอยู่เพื่อให้ Desktop และ Mobile สื่อสารกัน

**Q: ใช้ได้บน mobile network (4G/5G) ไหม?**
A: ปัจจุบันยังใช้ได้เฉพาะ LAN (WiFi) เท่านั้น

**Q: ลบแล้วเปิดใหม่ได้ไหม?**
A: ได้ ลบและติดตั้ง APK ใหม่ได้อยู่เสมอ

**Q: ใช้กับอุปกรณ์หลายชุดได้ไหม?**
A: ได้ แต่ต้องจับคู่แต่ละชุดเป็นอันดับแรก

---

## 📞 ติดต่อสำหรับปัญหา

หากมีปัญหา:
1. ดู Troubleshooting ข้างบน
2. ตรวจสอบ GitHub Issues
3. เปิด Issue ใหม่พร้อมรายละเอียดข้อผิดพลาด

---

**Happy syncing! 📋✨**

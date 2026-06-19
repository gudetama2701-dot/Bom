# 🎬 Getting Started - บทนำเริ่มต้น

ยินดีต้อนรับสู่ Clipboard Sync! เอกสารนี้จะช่วยให้คุณเริ่มต้นใช้งานอย่างรวดเร็ว

## เลือกเส้นทาง

### 👤 ผู้ใช้ทั่วไป (เพิ่งซื้อแอป)
👉 ไปที่ **[DOWNLOAD.md](DOWNLOAD.md)**
- ดาวน์โหลด APK
- ติดตั้งบนมือถือ
- ตั้งค่าและใช้งาน

### ⚡ ผู้ที่รีบ (ต้องเปิดใช้ 5 นาทีนี้)
👉 ไปที่ **[QUICK_START.md](QUICK_START.md)**
- คำสั่งเพียง 3 ขั้น
- ไม่มีคำศัพท์เทคนิค
- ใช้ได้ทันที

### 👨‍💻 นักพัฒนา (ต้องการสร้างจากซอร์สโค้ด)
👉 ดูการติดตั้งที่เกี่ยวข้อง:
- [server/SETUP.md](server/SETUP.md) - Backend setup
- [desktop/SETUP.md](desktop/SETUP.md) - Desktop app setup
- [mobile/SETUP.md](mobile/SETUP.md) - Mobile app setup

---

## 📊 ภาพรวม

```
PC (Windows)                Mobile (Android)
      ┌─────────┐                ┌─────────┐
      │ Desktop │  ◄────────►    │ Mobile  │
      │ App     │   Socket.io    │ App     │
      └────┬────┘                └────┬────┘
           │                          │
           │                          │
           └─────────────────────────┘
                  Backend Server
                  (Node.js)
```

---

## ✨ ฟีเจอร์

- ✅ **QR Code Pairing** - สแกน QR จับคู่อุปกรณ์
- ✅ **Real-time Sync** - ซิงค์คลิปบอร์ดแบบเรียลไทม์
- ✅ **Bidirectional** - ส่งได้ทั้งสองทาง (PC ↔ Mobile)
- ✅ **Session-based** - เซสชันแยกต่างหากสำหรับความปลอดภัย
- ✅ **Offline Ready** - ทำงานบน LAN (ไม่ต้องอินเทอร์เน็ต)

---

## 🎯 กรณีใช้งาน

1. **Copy บน PC → Paste บน Mobile**
   - ทำงาน link, ข้อความ, รหัส หลายเครื่อง

2. **Copy บน Mobile → Paste บน PC**
   - ข้อความจาก chat, หมายเลข โทรศัพท์

3. **ส่งรหัสผ่าน**
   - ส่งข้อมูลที่ละเอียดอ่อนอย่างปลอดภัย

4. **เอกสาร/ข้อมูล**
   - แชร์ข้อความหลายย่อหน้า

---

## 📚 ระดับการสนับสนุน

| ระดับ | ใช้สำหรับ | เอกสาร |
|------|---------|--------|
| 🟢 ง่ายมาก | ดาวน์โหลด APK | [DOWNLOAD.md](DOWNLOAD.md) |
| 🟡 ปกติ | เปิดจากไฟล์ | [QUICK_START.md](QUICK_START.md) |
| 🔴 ขั้นสูง | สร้างจากซอร์สโค้ด | [setup files](.) |

---

## ❓ คำถามที่พบบ่อย

### Q: ต้องให้อินเทอร์เน็ตไหม?
A: ไม่ต้อง WiFi ในบ้านก็ได้ (LAN network)

### Q: ปลอดภัยไหม?
A: ข้อมูลอยู่ LAN เท่านั้น ไม่มีระบบ Cloud

### Q: ใช้ได้กี่อุปกรณ์?
A: ปกติ 1 PC + 1 Mobile แต่สามารถขยายได้

### Q: ใช้ได้ iPhone ไหม?
A: ปัจจุบันเป็น Android เท่านั้น (อาจเพิ่ม iOS ในอนาคต)

### Q: สามารถซ้อม bug ได้ไหม?
A: ได้! GitHub Issues ยินดีรับ ใจ้

---

## 🔗 ลิงก์สำคัญ

- 📚 [README](README.md) - ภาพรวมโปรเจกต์
- ⚡ [QUICK START](QUICK_START.md) - เริ่มต้น 5 นาที
- 📥 [DOWNLOAD](DOWNLOAD.md) - วิธีดาวน์โหลด
- 🖥️ [Desktop Setup](desktop/SETUP.md)
- 📱 [Mobile Setup](mobile/SETUP.md)
- 🗄️ [Server Setup](server/SETUP.md)

---

## 🎓 บทเรียน

1. **How It Works** - [อ่าน README](README.md)
2. **Setup** - ดู SETUP.md ในโฟลเดอร์ที่เกี่ยวข้อง
3. **Troubleshooting** - [DOWNLOAD.md](DOWNLOAD.md#troubleshooting)

---

## 🤝 ให้ความช่วยเหลือ

- ❓ มีคำถาม? ดู FAQ ในเอกสาร
- 🐛 พบ bug? เปิด GitHub Issue
- 💡 ไอเดีย? สร้าง Feature Request
- 📝 ช่วยเขียน Docs? Fork & PR ได้

---

**Ready? เลือก path ของคุณข้างบน และเริ่มต้นใจ!** 🚀

---

Last updated: 2026-06-20
Version: 1.0.0

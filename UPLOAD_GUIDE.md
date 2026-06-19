# 📤 การอัปโหลด Clipboard Sync ไป GitHub

## 🚀 ขั้นตอนทั้งหมด

### ขั้นตอนที่ 1: สร้าง GitHub Repository

1. ไปที่ https://github.com/new
2. กรอก:
   - **Repository name**: `clipboard-sync`
   - **Description**: `Cross-platform clipboard sync app - PC to Mobile`
   - **Visibility**: Public (หรือ Private)
   - ✓ Add a README file (ไม่ต้องเพราะมีแล้ว)
   - ✓ Add .gitignore (Python) - หรือข้ามได้เพราะมีแล้ว
3. คลิก **"Create repository"**

---

### ขั้นตอนที่ 2: ตั้งค่า Git ท้องถิ่น

เปิด PowerShell และ cd ไปที่โปรเจกต์:

```powershell
cd "c:\Users\hp\Desktop\ลอง\clipboard-sync"
```

#### ตั้งค่า Git สำหรับครั้งแรก (ถ้ายังไม่ได้ทำ):

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

#### เริ่มต้น Repository:

```powershell
git init
git add .
git commit -m "Initial commit: Clipboard Sync v1.0.0"
```

---

### ขั้นตอนที่ 3: เชื่อมต่อกับ GitHub

```powershell
git remote add origin https://github.com/YOUR_USERNAME/clipboard-sync.git
git branch -M main
git push -u origin main
```

**หมายเหตุ:** แทน `YOUR_USERNAME` ด้วยชื่อ GitHub ของคุณ

---

### ขั้นตอนที่ 4: ยืนยันว่าสำเร็จ

ไปที่: `https://github.com/YOUR_USERNAME/clipboard-sync`

✅ ควรเห็นไฟล์ทั้งหมด

---

## 🌐 ตัวเลือกที่ 2: Netlify (สำหรับ Download Page)

### สำหรับเพียงหน้า Download:

1. ไปที่ https://app.netlify.com
2. คลิก **"Add new site"** → **"Import an existing project"**
3. เชื่อมต่อ GitHub account
4. เลือก repository `clipboard-sync`
5. ตั้งค่า:
   - **Base directory**: `releases`
   - **Build command**: (ปล่อยว่าง)
   - **Publish directory**: `releases`
6. คลิก **"Deploy site"**

✅ ได้ URL public: `https://your-site.netlify.app`

---

## 🌐 ตัวเลือกที่ 3: Vercel

ทำเหมือน Netlify:

1. ไปที่ https://vercel.com/new
2. Import GitHub repository
3. Deploy

✅ ได้ URL: `https://clipboard-sync.vercel.app`

---

## 📋 ไฟล์ที่จะอัปโหลด

```
✓ server/          (Backend)
✓ desktop/         (Electron)
✓ mobile/          (React Native)
✓ releases/        (Download Page)
✓ *.md files       (Documentation)
✓ .gitignore       (Git config)
✗ node_modules/    (ignored)
✗ *.apk            (ตัวอักษรใหญ่)
✗ *.exe            (ตัวอักษรใหญ่)
```

---

## ⚠️ อย่าลืม

1. **ไม่สามารถใช้ HTTPS ถ้ายังไม่มี repository**
2. **หลังจากอัปโหลด releases/APK ให้ update links**
3. **ตรวจสอบ .gitignore ว่าไม่ได้ ignore ไฟล์สำคัญ**

---

## 🔗 ตัวอย่าง URL หลังจากอัปโหลด

### GitHub
```
https://github.com/USERNAME/clipboard-sync
```

### Download Page (via GitHub Pages)
```
https://username.github.io/clipboard-sync/releases/
```

### Netlify
```
https://clipboard-sync.netlify.app/releases/
```

---

## 🎯 ขั้นตอนถัดไป

1. ✅ สร้าง repository GitHub
2. ✅ Push code
3. ✅ Enable GitHub Pages (Settings > Pages)
4. ✅ ทดสอบ download page

---

## 📞 ปัญหาที่อาจจะเจอ

### Git not found
```powershell
# ติดตั้ง Git สำหรับ Windows
# https://git-scm.com/download/win
```

### Authentication failed
```powershell
# ใช้ Personal Access Token แทน password
# https://github.com/settings/tokens
```

### Files too large
- ลดขนาด APK/EXE
- หรือใช้ Git LFS (Large File Storage)

---

**พร้อม? ทำตามขั้นตอนข้างบน!** 🚀

@echo off
REM 📤 Upload to GitHub - Windows Batch Script

setlocal enabledelayedexpansion

echo.
echo ============================================
echo   Clipboard Sync - GitHub Upload
echo ============================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Git is not installed!
    echo 📥 Download from: https://git-scm.com/download
    pause
    exit /b 1
)

echo ✓ Git is installed
echo.

REM Get GitHub info
set /p github_username="Enter your GitHub username: "
set /p github_email="Enter your GitHub email: "

echo.
echo ⚙️  Configuring Git...
git config --global user.name "%github_username%"
git config --global user.email "%github_email%"
echo ✓ Git configured
echo.

REM Initialize repository
if not exist ".git" (
    echo 📦 Initializing Git repository...
    git init
    git add .
    git commit -m "Initial commit: Clipboard Sync v1.0.0"
    echo ✓ Repository initialized
) else (
    echo ✓ Repository already exists
)

echo.
echo ============================================
echo   Next Steps
echo ============================================
echo.
echo 1. Create GitHub repository:
echo    URL: https://github.com/new
echo    Name: clipboard-sync
echo.
echo 2. After creating, run these commands:
echo.
echo    git remote add origin https://github.com/%github_username%/clipboard-sync.git
echo    git branch -M main
echo    git push -u origin main
echo.
echo 3. Enable GitHub Pages:
echo    - Go to: https://github.com/%github_username%/clipboard-sync/settings/pages
echo    - Source: Deploy from a branch
echo    - Branch: main, /(root)
echo    OR: main, /releases
echo.
echo 4. Access your download page at:
echo    https://%github_username%.github.io/clipboard-sync/releases/
echo.
echo ============================================
echo.
pause

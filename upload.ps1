# 📤 PowerShell Script for GitHub Upload
# วิธีใช้: .\upload.ps1

Write-Host "`n" -ForegroundColor Yellow
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Clipboard Sync - GitHub Upload" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "`n"

# Check if Git is installed
try {
    git --version | Out-Null
    Write-Host "✓ Git is installed: " -ForegroundColor Green -NoNewline
    git --version
}
catch {
    Write-Host "❌ Git is not installed!" -ForegroundColor Red
    Write-Host "📥 Download from: https://git-scm.com/download" -ForegroundColor Yellow
    exit
}

Write-Host "`n"

# Get user input
$github_username = Read-Host "Enter your GitHub username"
$github_email = Read-Host "Enter your GitHub email"

Write-Host "`n"
Write-Host "⚙️  Configuring Git..." -ForegroundColor Yellow

# Configure Git
git config --global user.name $github_username
git config --global user.email $github_email

Write-Host "✓ Git configured" -ForegroundColor Green

# Initialize repository if not exists
if (!(Test-Path ".git")) {
    Write-Host "`n📦 Initializing Git repository..." -ForegroundColor Yellow
    git init
    git add .
    git commit -m "Initial commit: Clipboard Sync v1.0.0"
    Write-Host "✓ Repository initialized" -ForegroundColor Green
}
else {
    Write-Host "✓ Repository already exists" -ForegroundColor Green
}

Write-Host "`n"
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "   Next Steps" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "`n"

Write-Host "1️⃣  Create GitHub repository:" -ForegroundColor Yellow
Write-Host "    URL: https://github.com/new" -ForegroundColor White
Write-Host "    Name: clipboard-sync" -ForegroundColor White
Write-Host ""

Write-Host "2️⃣  After creating, run these commands:" -ForegroundColor Yellow
Write-Host ""
Write-Host "    git remote add origin https://github.com/$github_username/clipboard-sync.git" -ForegroundColor Cyan
Write-Host "    git branch -M main" -ForegroundColor Cyan
Write-Host "    git push -u origin main" -ForegroundColor Cyan
Write-Host ""

Write-Host "3️⃣  Enable GitHub Pages:" -ForegroundColor Yellow
Write-Host "    - Go to: https://github.com/$github_username/clipboard-sync/settings/pages" -ForegroundColor White
Write-Host "    - Source: Deploy from a branch" -ForegroundColor White
Write-Host "    - Branch: main" -ForegroundColor White
Write-Host "    - Folder: /releases" -ForegroundColor White
Write-Host ""

Write-Host "4️⃣  Access your download page at:" -ForegroundColor Yellow
Write-Host "    https://$github_username.github.io/clipboard-sync/releases/" -ForegroundColor Cyan
Write-Host ""

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "`n"

$continue = Read-Host "Ready to proceed? (y/n)"

if ($continue -eq "y" -or $continue -eq "Y") {
    Write-Host "`n✅ Setup complete!" -ForegroundColor Green
    Write-Host "📖 See UPLOAD_GUIDE.md for detailed instructions" -ForegroundColor Yellow
}

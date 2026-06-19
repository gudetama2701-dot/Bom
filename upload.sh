#!/bin/bash
# 📤 Quick Upload Script for Clipboard Sync

echo "🚀 Clipboard Sync - GitHub Upload Helper"
echo "=========================================="
echo ""

# Check if Git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed!"
    echo "📥 Download from: https://git-scm.com/download"
    exit 1
fi

echo "✓ Git found: $(git --version)"
echo ""

# Configure Git if needed
echo "📋 Setting up Git configuration..."
read -p "Enter your GitHub username: " github_username
read -p "Enter your GitHub email: " github_email

git config --global user.name "$github_username"
git config --global user.email "$github_email"

echo "✓ Git configured"
echo ""

# Initialize repository
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    git add .
    git commit -m "Initial commit: Clipboard Sync v1.0.0"
    echo "✓ Repository initialized"
else
    echo "✓ Repository already exists"
fi

echo ""
echo "🔗 Connect to GitHub:"
echo ""
echo "1. Go to: https://github.com/new"
echo "2. Create repository named: clipboard-sync"
echo "3. Run this command:"
echo ""
echo "   git remote add origin https://github.com/$github_username/clipboard-sync.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""
echo "4. Enable GitHub Pages:"
echo "   - Go to: https://github.com/$github_username/clipboard-sync/settings/pages"
echo "   - Select 'Deploy from a branch'"
echo "   - Choose 'main' and '/releases' folder"
echo ""
echo "✅ Done! Your project will be available at:"
echo "   https://$github_username.github.io/clipboard-sync/"
echo ""

#!/bin/bash
#
# Deploy Script for collective-context.org
# Builds Astro and properly deploys to GitHub Pages
#

echo "🚀 Starting deployment for collective-context.org..."

# 1. Build Astro
echo "📦 Building Astro site..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# 2. Copy all dist contents to root (GitHub Pages serves from root)
echo "📂 Copying dist files to root..."
cp -r dist/* .
cp -r dist/.[^.]* . 2>/dev/null  # Copy hidden files if any

# 3. Ensure CNAME exists
echo "🌐 Ensuring CNAME file..."
echo "collective-context.org" > CNAME

# 4. List what we're deploying
echo "📋 Files ready for deployment:"
ls -la index.html _astro/ 2>/dev/null || echo "Warning: Some expected files missing"

# 5. Git operations
echo "📤 Committing and pushing..."
git add -A
git commit -m "🚀 Deploy Astro site with all assets

- Built with npm run build
- Copied all dist/* to root  
- Includes _astro/ CSS and JS
- CNAME configured

Deployed via deploy.sh script"

git push origin main

echo "✅ Deployment complete!"
echo "🌐 Check https://collective-context.org in 2-3 minutes"
echo ""
echo "Note: GitHub Actions will process the deployment."
echo "Check status at: https://github.com/collective-context/collective-context.github.io/actions"
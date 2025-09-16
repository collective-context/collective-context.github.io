# 🚀 Claude-1 Arbeitsanweisung: Volle Astro Funktionalität aktivieren

## Mission Brief
Die temporäre HTML funktioniert gut, aber jetzt wollen wir die volle Astro-Power mit Navigation, Multiple Pages und allem was dazugehört.

## Aktueller Status
✅ Temporäre inline-styled HTML ist live  
✅ Deploy Script existiert  
❌ Astro Assets (CSS/JS) nicht korrekt deployed  
❌ Navigation/Multiple Pages nicht verfügbar

---

## 📋 PHASE 1: Astro Build Verification

### Schritt 1.1: Check Astro Installation
**User führt aus:**
```bash
cd ~/prog/ai/collective-context.github.io

# Verify Astro ist installiert
npm list @astrojs/starlight
npm list astro

# Falls nicht installiert:
npm install
```

**Claude-1 Aufgabe:**
- Bestätige Astro ist korrekt installiert
- Check alle Dependencies vorhanden

### Schritt 1.2: Test Local Build
**User führt aus:**
```bash
# Clean build
rm -rf dist

# Build Astro
npm run build

# Check was generiert wurde
ls -la dist/
ls -la dist/_astro/ 2>/dev/null || echo "No _astro folder"
find dist -type f -name "*.css" | head -5
find dist -type f -name "*.js" | head -5
```

**Claude-1 Aufgabe:**
- Verifiziere dist/ enthält:
  - index.html
  - _astro/ Ordner mit CSS/JS
  - Weitere HTML Pages

---

## 🔧 PHASE 2: GitHub Actions Fix

### Schritt 2.1: Update GitHub Actions Workflow
**User updated `.github/workflows/deploy.yml`:**
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
        
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
          
      - name: Install dependencies
        run: npm ci
        
      - name: Build Astro site
        run: npm run build
        
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**Claude-1 Aufgabe:**
- Stelle sicher Workflow uploaded dist/ Ordner
- Nicht Root Directory!

---

## 📁 PHASE 3: Astro Content Structure

### Schritt 3.1: Verify Content Structure
**User führt aus:**
```bash
# Check ob Content existiert
ls -la src/content/docs/

# Falls leer, create basic structure:
mkdir -p src/content/docs/quickstart
mkdir -p src/content/docs/agents
mkdir -p src/content/docs/guides
```

### Schritt 3.2: Create Essential Pages
**User erstellt `src/content/docs/index.mdx`:**
```markdown
---
title: Collective Context
description: Multi-Agent KI-Orchestrierung
template: splash
hero:
  tagline: Orchestriere 4 KI-Agenten parallel in tmux. Die Zukunft der Software-Entwicklung.
  actions:
    - text: 4-Agent Setup
      link: /quickstart/4-agent-setup/
      icon: right-arrow
      variant: primary
    - text: GitHub
      link: https://github.com/collective-context
      icon: external
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## 🎯 Multi-Instanz KI-Orchestrierung

**4 parallele KI-Agenten in tmux** - battle-tested in der Praxis.

<CardGrid stagger>
  <Card title="Claude-1 & Claude-2" icon="robot">
    System Architect + Code Reviewer arbeiten parallel
  </Card>
  <Card title="Aider-1 & Aider-2" icon="code">
    Main Dev + Test Dev implementieren gleichzeitig
  </Card>
</CardGrid>

## Das 4-Agent Setup

\`\`\`
┌─────────────────┬─────────────────┐
│   Claude-1      │   Claude-2      │
│   (Architect)   │   (Reviewer)    │
├─────────────────┼─────────────────┤
│   Aider-1       │   Aider-2       │
│   (Main Dev)    │   (Parallel)    │
└─────────────────┴─────────────────┘
\`\`\`
```

**User erstellt `src/content/docs/quickstart/4-agent-setup.md`:**
```markdown
---
title: 4-Agent Setup Guide
description: In 5 Minuten zum CC Standard
---

# 4-Agent Setup

Der Collective Context Standard Workflow.

## Installation

\`\`\`bash
pip install collective-context-commander
\`\`\`

## Tmux Setup

\`\`\`bash
tmux new-session -s cc
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v
\`\`\`

## Start Agents

In jedem Pane:
- **Pane 0**: `ccc agent start claude-1`
- **Pane 1**: `ccc agent start claude-2`
- **Pane 2**: `aider --model gpt-4`
- **Pane 3**: `aider --model gpt-4 --test`
```

---

## 🚀 PHASE 4: Deploy Full Astro

### Schritt 4.1: Build & Test Locally
**User führt aus:**
```bash
# Fresh build
npm run build

# Test locally
npm run preview

# Open http://localhost:4322
# Verify:
# - Navigation works
# - CSS loaded
# - Multiple pages accessible
```

**Claude-1 Aufgabe:**
- User soll bestätigen local version funktioniert
- Navigation sidebar sichtbar?
- Styling korrekt?

### Schritt 4.2: Deploy via GitHub Actions
**User führt aus:**
```bash
# Remove old manual deployments
rm -f index.html
rm -rf _astro 2>/dev/null
git rm index.html 2>/dev/null

# Commit Astro source files
git add .github/workflows/deploy.yml
git add src/
git add astro.config.mjs
git add package.json

git commit -m "🚀 Deploy full Astro site with GitHub Actions

- Fixed workflow to deploy dist/ folder
- Added content pages
- Navigation and multi-page support
- Proper CSS/JS asset handling"

git push origin main
```

**Claude-1 Aufgabe:**
- User soll GitHub Actions beobachten
- Nach 3-5 Minuten sollte volle Astro Site live sein

---

## ✅ PHASE 5: Verification

### Schritt 5.1: Check Deployment
**User Aktionen:**
1. Öffne https://github.com/collective-context/collective-context.github.io/actions
2. Warte auf grünen Haken
3. Clear Browser Cache: Ctrl+Shift+R

### Schritt 5.2: Test Live Site
**User testet auf collective-context.org:**
- [ ] Homepage lädt mit Starlight Theme
- [ ] Navigation Sidebar links sichtbar
- [ ] Quick Start Page erreichbar
- [ ] CSS vollständig geladen
- [ ] Responsive Design funktioniert

---

## 🚨 Troubleshooting

### Falls Site noch alte Version zeigt:
```bash
# Force cache clear
curl -I "https://collective-context.org/?v=$(date +%s)"

# Wait 5-10 minutes for CDN refresh
```

### Falls GitHub Actions fehlschlägt:
```bash
# Check logs in Actions tab
# Common fixes:
npm ci  # reinstall dependencies
npm run build  # test local build
```

### Falls nur index.html aber keine Assets:
- Verify workflow verwendet `path: ./dist`
- Nicht `path: .` (root)

---

## 📊 Success Criteria

Astro Site ist vollständig wenn:
- ✅ Navigation Sidebar funktioniert
- ✅ Multiple Pages erreichbar
- ✅ CSS/JS Assets laden korrekt
- ✅ Starlight Theme sichtbar
- ✅ Dark/Light Mode Toggle works

## Alternative: Manual Deployment

Falls GitHub Actions Probleme macht:
```bash
# Build
npm run build

# Copy EVERYTHING to root
cp -r dist/* .
cp -r dist/.[^.]* . 2>/dev/null

# Add all
git add -A

# Commit
git commit -m "Manual full Astro deployment"

# Push
git push
```

**Du bist Claude-1, der Architect. Führe den User zur vollen Astro-Funktionalität!** 🚀

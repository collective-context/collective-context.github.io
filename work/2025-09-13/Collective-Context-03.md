# 📚 Claude-1 Zusatz-Briefing: Astro & GitHub Pages Context

## Wichtige Vorab-Information
Dies ist eine **Ergänzung** zu deiner Domain Setup Anweisung. Du hast bereits den Domain-Setup Plan - hier ist der technische Context über unser aktuelles Setup.

---

## 🏗️ Aktueller Projekt-Status

### Repository Details
- **Location**: `~/prog/claude/collective-context.github.io`
- **GitHub URL**: https://github.com/collective-context/collective-context.github.io
- **Current Site**: https://collective-context.github.io (funktioniert bereits!)
- **Target Domain**: https://collective-context.org (das konfigurieren wir jetzt)

### Technologie-Stack
- **Framework**: Astro 4.x mit Starlight Theme
- **Build Tool**: npm/Node.js
- **Deployment**: GitHub Actions → GitHub Pages
- **Content**: Markdown/MDX Dateien in `src/content/docs/`

---

## 📁 Projekt-Struktur (Wichtig für CNAME Placement)

```
collective-context.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions Workflow
├── public/                     # Static Assets (HIER kommt CNAME rein!)
│   └── CNAME                   # Domain file (wird zu root beim Build)
├── src/
│   ├── content/
│   │   └── docs/               # Markdown Content
│   │       ├── index.md        # Homepage
│   │       └── quickstart/     # Guides
│   └── styles/                 # CSS
├── dist/                       # Build Output (git-ignored)
├── astro.config.mjs           # Hauptconfig (HIER site: URL ändern!)
├── package.json               # Dependencies
└── CNAME                      # Backup im Root (Sicherheit)
```

---

## 🔧 Astro Config Details

Die aktuelle `astro.config.mjs` sieht so aus:

```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://collective-context.github.io',  // ← DAS musst du ändern!
  integrations: [
    starlight({
      title: 'Collective Context',
      description: 'Multi-Agent KI-Orchestrierung für 10x Produktivität',
      // ... weitere config
    }),
    react(),
    mdx(),
    sitemap(),
  ],
});
```

**Was passiert beim Build:**
1. `npm run build` erstellt `dist/` Ordner
2. Alles aus `public/` wird nach `dist/` kopiert (inkl. CNAME)
3. GitHub Actions deployed `dist/` zu GitHub Pages

---

## 🚀 GitHub Actions Workflow

Der `.github/workflows/deploy.yml` ist bereits konfiguriert:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
    
# Workflow:
# 1. Checkout Code
# 2. Setup Node.js
# 3. npm ci (install)
# 4. npm run build
# 5. Upload dist/ to GitHub Pages
```

**Wichtig**: Jeder Push zu `main` triggert automatisch ein Deployment!

---

## ⚡ Commands Cheat Sheet

```bash
# Development
npm run dev              # Startet localhost:4321
npm run build           # Baut Production Version
npm run preview        # Preview Production Build

# Git
git status             # Check changes
git add .              # Stage all
git commit -m "msg"    # Commit
git push origin main   # Deploy!

# Verification
ls -la public/         # Check public folder
cat public/CNAME       # Verify domain
grep site: astro.config.mjs  # Check config
```

---

## 🎯 Kritische Punkte für Domain Setup

### 1. CNAME File Location
- **Primary**: `public/CNAME` (Astro Standard)
- **Backup**: `CNAME` im Root (für Edge Cases)
- **Content**: NUR `collective-context.org` (kein https://, kein www)

### 2. Astro Config
- Ändere `site:` von `github.io` zu `collective-context.org`
- Keine anderen Änderungen nötig
- Syntax-Fehler vermeiden (JavaScript!)

### 3. GitHub Pages Settings
- Source: Bereits auf "GitHub Actions" konfiguriert
- Custom Domain: Muss manuell eingetragen werden
- HTTPS: Erst aktivieren nach erfolgreichem DNS Check

### 4. Timing
- Push → GitHub Action: 2-3 Minuten
- DNS Check: 5-10 Minuten
- HTTPS Certificate: 15-30 Minuten
- Vollständig stabil: ~1 Stunde

---

## 🔍 Debug Commands

Falls Probleme auftreten:

```bash
# Check GitHub Action Status
echo "Check: https://github.com/collective-context/collective-context.github.io/actions"

# Local Build Test
npm run build && ls -la dist/CNAME

# DNS Verification
dig collective-context.org +short
nslookup collective-context.org

# Force Rebuild
git commit --allow-empty -m "Force rebuild" && git push
```

---

## ✅ Success Indicators

Du weißt dass alles funktioniert wenn:

1. **Lokal**: `dist/CNAME` existiert nach Build
2. **GitHub**: Actions zeigen grünen Haken
3. **DNS**: `dig` zeigt 185.199.108.153 (+ andere 3)
4. **Browser**: https://collective-context.org lädt
5. **HTTPS**: Grünes Schloss im Browser

---

## 💪 Du hast das!

Mit diesem Context + deiner Domain Setup Anweisung hast du alles was du brauchst. Das Collective Context System wird in wenigen Minuten unter seiner eigenen Domain live sein!

**Remember**: Dies ist CC in Action - Multi-Agent Orchestrierung live demonstriert! 🚀

---

*Ende des Zusatz-Briefings. Zurück zu deiner Domain Setup Mission!*

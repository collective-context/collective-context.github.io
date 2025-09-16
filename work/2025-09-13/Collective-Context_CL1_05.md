# 🚀 Claude-1 Arbeitsanweisung: Astro Site Full Deployment

## Mission Status Update
✅ **Domain Live**: collective-context.org funktioniert!  
⚠️ **Current State**: Placeholder Page  
🎯 **New Mission**: Deploy die volle Astro-Dokumentationsseite mit Multi-Agent Content

## Deine Rolle
- Technical Lead für Astro Deployment
- Content Integration Specialist
- Quality Assurance für Go-Live

---

## 📋 PHASE 1: Environment & Status Check

### Schritt 1.1: Repository Status
**User führt aus:**
```bash
# Verify wir sind im richtigen Verzeichnis
cd ~/prog/ai/collective-context.github.io
pwd

# Check current branch und status
git status
git branch

# Check ob Astro installiert ist
npm list @astrojs/starlight
```

**Claude-1 Aufgabe:**
- Verifiziere Repository ist sauber (keine uncommitted changes)
- Bestätige Astro Dependencies sind installiert
- Falls nicht: Guide durch Installation

### Schritt 1.2: Bestehende Struktur prüfen
**User führt aus:**
```bash
# Check ob Basis-Struktur existiert
ls -la src/content/docs/ 2>/dev/null || echo "Docs folder fehlt"
ls -la astro.config.mjs 2>/dev/null || echo "Astro config fehlt"

# Check aktueller Build
ls -la dist/ 2>/dev/null || echo "Noch kein Build"
```

**Claude-1 Aufgabe:**
- Evaluiere was bereits existiert
- Entscheide ob fresh install oder update nötig

---

## 📁 PHASE 2: Astro Installation (Falls nötig)

### Schritt 2.1: Astro Setup
**NUR wenn Astro noch nicht installiert:**
```bash
# Astro mit Starlight installieren
npm create astro@latest . -- --template starlight --typescript strict --install --no-git

# Bei Prompts:
# "Directory not empty. Continue?" → y
# Rest → Enter (defaults)

# Zusätzliche Dependencies
npm install @astrojs/react @astrojs/mdx @astrojs/sitemap sharp
```

**Claude-1 Aufgabe:**
- Guide durch Installation falls nötig
- Skip zu Phase 3 wenn bereits installiert

---

## 🏗️ PHASE 3: Content Structure Creation

### Schritt 3.1: Verzeichnisstruktur erstellen
**User führt aus:**
```bash
# Create alle notwendigen Directories
mkdir -p src/content/docs/{quickstart,agents,patterns,guides,checklists,ccc}
mkdir -p src/{styles,assets,components}
mkdir -p public/api

# Verify Struktur
tree src -d -L 3 2>/dev/null || find src -type d | sort
```

### Schritt 3.2: Astro Konfiguration
**User erstellt/updated `astro.config.mjs`:**
```javascript
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://collective-context.org',
  integrations: [
    starlight({
      title: 'Collective Context',
      description: 'Multi-Agent KI-Orchestrierung für 10x Produktivität',
      logo: {
        light: './src/assets/logo-light.svg',
        dark: './src/assets/logo-dark.svg',
        replacesTitle: false,
      },
      social: {
        github: 'https://github.com/collective-context',
      },
      editLink: {
        baseUrl: 'https://github.com/collective-context/collective-context.github.io/edit/main/',
      },
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: '🚀 Start',
          items: [
            { label: 'Home', link: '/' },
            { label: '4-Agent Setup', link: '/quickstart/4-agent-setup' },
            { label: 'Installation', link: '/quickstart/installation' },
          ],
        },
        {
          label: '🤖 Multi-Agent System',
          items: [
            { label: 'Übersicht', link: '/agents/overview' },
            { label: 'Tmux Workflows', link: '/agents/tmux-workflows' },
            { 
              label: 'Claude Instanzen',
              items: [
                { label: 'Claude-1 Architect', link: '/agents/claude-1' },
                { label: 'Claude-2 Reviewer', link: '/agents/claude-2' },
              ]
            },
            { 
              label: 'Aider Instanzen',
              items: [
                { label: 'Aider-1 Main Dev', link: '/agents/aider-1' },
                { label: 'Aider-2 Parallel', link: '/agents/aider-2' },
              ]
            },
          ],
        },
        {
          label: '🎭 Orchestration Patterns',
          items: [
            { label: 'Orchestra Pattern', link: '/patterns/orchestra' },
            { label: 'Swarm Pattern', link: '/patterns/swarm' },
            { label: 'Pipeline Pattern', link: '/patterns/pipeline' },
          ],
        },
        {
          label: '📚 Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: '✈️ Checklists',
          autogenerate: { directory: 'checklists' },
        },
        {
          label: '🛠️ CCC Commander',
          items: [
            { label: 'Overview', link: '/ccc/overview' },
            { label: 'Installation', link: '/ccc/installation' },
            { label: 'CLI Reference', link: '/ccc/cli' },
          ],
        },
      ],
    }),
    react(),
    mdx(),
    sitemap(),
  ],
});
```

**Claude-1 Aufgabe:**
- Guide User durch Config-Erstellung
- Stelle sicher site: ist 'https://collective-context.org'

---

## 📝 PHASE 4: Core Content Creation

### Schritt 4.1: Homepage (src/content/docs/index.mdx)
**User erstellt diese Datei:**
```markdown
---
title: Collective Context System
description: Multi-Agent KI-Orchestrierung für 10x Produktivität
template: splash
hero:
  tagline: Orchestriere 4 KI-Agenten parallel in tmux. Claude-1 & Claude-2 arbeiten mit Aider-1 & Aider-2. Die Zukunft der Software-Entwicklung ist JETZT.
  image:
    file: ../../assets/houston.webp
  actions:
    - text: 4-Agent Setup starten →
      link: /quickstart/4-agent-setup/
      icon: rocket
      variant: primary
    - text: Tmux Workflows
      link: /agents/tmux-workflows/
      icon: terminal
---

import { Card, CardGrid } from '@astrojs/starlight/components';

## 🎯 Der CC Standard: Multi-Instanz KI-Orchestrierung

**4 parallele KI-Agenten in tmux** - keine Theorie, sondern battle-tested Praxis.

```
┌─────────────────┬─────────────────┐
│   Claude-1      │   Claude-2      │
│   (Architect)   │   (Reviewer)    │
├─────────────────┼─────────────────┤
│   Aider-1       │   Aider-2       │
│   (Main Dev)    │   (Parallel)    │
└─────────────────┴─────────────────┘
```

<CardGrid stagger>
  <Card title="Parallele Execution" icon="rocket">
    **Claude-1** designt während **Claude-2** reviewt. **Aider-1** implementiert während **Aider-2** Tests schreibt.
  </Card>
  
  <Card title="10x Produktivität" icon="graph">
    48h MVP mit 25.000 Zeilen Code. 89% Test Coverage. $112 API Kosten. Dokumentierte Erfolge.
  </Card>
  
  <Card title="Tmux Integration" icon="terminal">
    Alle Agenten in einem Terminal. Volle Kontrolle. Native Workflows. Kein Browser-Tab-Chaos.
  </Card>
  
  <Card title="Battle-Tested" icon="shield">
    Entwickelt in realen Projekten. Optimiert für Effizienz. Produktionsreif.
  </Card>
</CardGrid>

## 🚀 Quick Start in 5 Minuten

```bash
# 1. Install CCC
pip install collective-context-commander

# 2. Setup tmux layout
ccc tmux init --agents 4

# 3. Start orchestration
ccc orchestrate --start all

# 4. Sync context
ccc context init "Your project"
```

[Vollständige Anleitung →](/quickstart/4-agent-setup/)

## 📊 Real-World Resultate

| Metric | Traditional | CC Multi-Agent | Improvement |
|--------|------------|----------------|-------------|
| Development Speed | 1x | 10x | **900%** |
| Test Coverage | 40% | 89% | **122%** |
| Time to MVP | 3-4 weeks | 48 hours | **10-14x** |
| Team Size Required | 4-5 devs | 1 orchestrator | **80% reduction** |

## 🎮 Orchestration Patterns

### Sequential Pipeline
```
Claude-1 → Aider-1 → Claude-2 → Aider-2 → Production
```

### Parallel Swarm  
```
[Claude-1 + Claude-2] ⟷ [Aider-1 + Aider-2]
```

### Review Cycle
```
Claude-1 ⟷ Claude-2 (Design Review)
Aider-1 ⟷ Aider-2 (Code Review)
```

---

Built with ❤️ by [recode@ /DAO](https://github.com/recodeat) | [Discord](https://discord.gg/collective-context) | [GitHub](https://github.com/collective-context)
```

### Schritt 4.2: 4-Agent Setup Guide
**User erstellt `src/content/docs/quickstart/4-agent-setup.md`:**
```markdown
---
title: 4-Agent Setup in 5 Minuten
description: Der CC Standard Workflow - sofort einsatzbereit
---

# 4-Agent Setup Guide

## Der Collective Context Standard

Unser bewährtes Setup mit 4 spezialisierten KI-Agenten:

| Agent | Role | Temperature | Focus |
|-------|------|-------------|-------|
| **Claude-1** | System Architect | 0.3 | Design, Architecture, ADRs |
| **Claude-2** | Code Reviewer | 0.1 | Quality, Security, Best Practices |
| **Aider-1** | Main Developer | 0.5 | Implementation, Features |
| **Aider-2** | Parallel Dev | 0.5 | Tests, Refactoring, Docs |

## Prerequisites

- Linux/macOS (Windows mit WSL2)
- Python 3.10+
- tmux (`apt install tmux`)
- API Keys (Claude oder OpenAI)

## Installation

### Step 1: CCC Commander
```bash
pip install collective-context-commander
```

### Step 2: API Configuration
```bash
export ANTHROPIC_API_KEY="sk-ant-..."
export OPENAI_API_KEY="sk-..."
```

### Step 3: Tmux Layout
```bash
# Automated setup
ccc tmux init --agents 4

# Or manual:
tmux new-session -d -s cc
tmux split-window -h
tmux split-window -v
tmux select-pane -t 0
tmux split-window -v
tmux attach-session -t cc
```

### Step 4: Start Agents

**Pane 0 - Claude-1:**
```bash
ccc agent start claude-1 --role architect --temperature 0.3
```

**Pane 1 - Claude-2:**
```bash
ccc agent start claude-2 --role reviewer --temperature 0.1
```

**Pane 2 - Aider-1:**
```bash
aider --model gpt-4 --auto-commits --yes
```

**Pane 3 - Aider-2:**
```bash
aider --model gpt-4 --test-cmd pytest --yes
```

## Context Synchronization

```bash
# Initialize project context
ccc context init "Building next-gen e-commerce platform"

# Sync to all agents
ccc context sync --all
```

## Tmux Navigation

| Command | Action |
|---------|--------|
| `Ctrl-b →/←/↑/↓` | Navigate panes |
| `Ctrl-b z` | Zoom pane |
| `Ctrl-b d` | Detach |
| `tmux attach` | Reattach |

## Success Metrics

Mit diesem Setup erreichst du:
- **4x Development Speed**
- **80%+ Test Coverage**
- **50% weniger Bugs**
- **$50-100 pro Projekt** (API Kosten)

---

[← Back to Home](/) | [Tmux Workflows →](/agents/tmux-workflows/)
```

### Schritt 4.3: Custom Styles
**User erstellt `src/styles/custom.css`:**
```css
:root {
  --sl-color-accent-low: #6366f120;
  --sl-color-accent: #6366f1;
  --sl-color-accent-high: #4f46e5;
}

/* Terminal aesthetic */
.terminal-box {
  background: #1e1e1e;
  border: 2px solid #6366f1;
  border-radius: 8px;
  padding: 1rem;
  font-family: 'JetBrains Mono', monospace;
}

/* Multi-agent visualization */
.agent-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
}

.agent-card {
  padding: 1rem;
  border: 2px solid var(--sl-color-accent);
  border-radius: 8px;
  background: var(--sl-color-accent-low);
}

/* Hero gradient */
.hero-gradient {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

**Claude-1 Aufgabe:**
- Stelle sicher alle 3 Core Files werden erstellt
- Guide bei Problemen mit Editoren

---

## 🚀 PHASE 5: Build & Deploy

### Schritt 5.1: Local Build Test
**User führt aus:**
```bash
# Build the site
npm run build

# Check for errors
echo "Build Exit Code: $?"

# Verify output
ls -la dist/
ls -la dist/CNAME
```

**Claude-1 Aufgabe:**
- Falls Build Fehler: Analysiere und löse
- Verifiziere CNAME ist in dist/

### Schritt 5.2: Local Preview
**User führt aus:**
```bash
# Start preview server
npm run preview

# Open browser at http://localhost:4322
```

**Claude-1 Aufgabe:**
- User soll bestätigen dass Site lokal gut aussieht
- Check: Navigation, Links, Styling

### Schritt 5.3: Git Commit & Deploy
**User führt aus:**
```bash
# Stage all changes
git add .

# Commit mit descriptiver Message
git commit -m "🚀 Deploy full Astro documentation site

- Add homepage with 4-agent setup focus
- Add quick start guide
- Add multi-agent workflow documentation
- Configure navigation and styling
- Ready for production"

# Push to trigger deployment
git push origin main

# Check deployment status
echo "Check: https://github.com/collective-context/collective-context.github.io/actions"
```

**Claude-1 Aufgabe:**
- Bestätige erfolgreichen Push
- User soll GitHub Actions Status checken

---

## ✅ PHASE 6: Verification

### Schritt 6.1: Deployment Check
**User Aktionen:**
1. Öffne https://github.com/collective-context/collective-context.github.io/actions
2. Warte auf grünen Haken (2-3 Minuten)

### Schritt 6.2: Live Site Test
**User testet:**
```bash
# Test mit curl
curl -I https://collective-context.org

# Should show: HTTP/2 200
```

**Browser Tests:**
1. https://collective-context.org - Homepage mit 4-Agent Diagram
2. https://collective-context.org/quickstart/4-agent-setup/ - Guide
3. Navigation funktioniert
4. Mobile responsive

**Claude-1 Aufgabe:**
- Celebrate wenn alles funktioniert! 🎉
- Bei Problemen: Debug und fix

---

## 🎯 Success Criteria

Mission erfolgreich wenn:
- ✅ collective-context.org zeigt volle Astro Site
- ✅ 4-Agent Setup prominent auf Homepage
- ✅ Navigation funktioniert
- ✅ Quick Start Guide zugänglich
- ✅ Responsive Design funktioniert

## Timeline
- Build & Deploy: 5 Minuten
- GitHub Actions: 2-3 Minuten
- Live auf collective-context.org: ~10 Minuten total

**Du bist Claude-1, der Architect. Führe den User durch das volle Deployment der CC Documentation Site!**

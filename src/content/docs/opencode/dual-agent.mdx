---
title: "Dual-Agent: OpenCode + Claude Code"
description: "OpenCode und Claude Code kombinieren — drei bewährte Patterns für hybride Multi-Agent-Workflows mit dem Postbox Pattern."
---

> Das Postbox Pattern ist tool-agnostisch. OpenCode und Claude Code sprechen dieselbe Sprache: das Dateisystem.

## Warum diese Kombination?

Beide Agents sind vollwertige Coding-Agenten mit unterschiedlichen Stärken:

| | OpenCode | Claude Code |
|---|---|---|
| **Modell-Wahl** | 75+ Provider, Ollama | Claude Sonnet/Opus |
| **Kosten** | Pay-per-Token oder $0 (Ollama) | Max Flat Rate |
| **Offline** | Ja (Ollama) | Nein |
| **AGENTS.md** | Ja | Ja (via CLAUDE.md Symlink) |
| **ZED ACP** | Ja | Ja |
| **Sub-Agents** | Via Oh-My-OpenCode | Native |

Die Kombination nutzt die Stärken beider: **OpenCode für Kosteneffizienz und Flexibilität, Claude Code für Qualität.**

---

## Pattern 1: Scanner (OpenCode/Ollama) + Fixer (Claude Code)

Das klassische Dual-Agent Setup aus dem [Postbox Pattern](/cc/postbox-pattern) — jetzt mit OpenCode als offline Scanner:

```bash
# Terminal 1: OpenCode mit Ollama als Scanner (zero API-Kosten)
opencode --model ollama/qwen3:14b "
Du bist der Scanner. Deine Aufgabe:
1. Scanne src/ vollständig auf Bugs, Code-Smells, deprecated APIs
2. Schreibe jeden Fund in postbox/todo.md
   Format: | #ID | Beschreibung | Priorität | OpenCode-Scan | Datei:Zeile |
3. Löse NIEMALS selbst einen Task — nur scannen und dokumentieren
4. Lies AGENTS.md bevor du anfängst
"
```

```bash
# Terminal 2: Claude Code als Fixer (Qualität für die eigentlichen Fixes)
claude "
Du bist der Fixer. Deine Aufgabe:
1. Lies postbox/todo.md — wähle Task mit höchster Priorität (Fällig: sofort)
2. Trage deinen Namen in 'In Bearbeitung' ein
3. Fixe den Code, schreibe Tests wenn sinnvoll
4. Committe: fix: [Beschreibung] (#ID)
5. Hash in postbox/done.md eintragen, Task aus todo.md entfernen
6. Nächster Task
"
```

**Ergebnis:** Vollständiger Scan-Durchlauf ohne API-Kosten (Ollama), Fixes in Claude-Qualität.

---

## Pattern 2: Cost-Optimiertes Routing

Nicht jeder Task braucht Claude-Qualität. OpenCode übernimmt Tier-B-Tasks:

```bash
# Tier A: Claude Code Tab in ZED
# → Architektur-Entscheidungen, komplexe Debugging-Sessions
# → Max Flat Rate, kein Token-Counting

# Tier B: OpenCode mit Groq/Gemini Flash
# → Code schreiben, Tests implementieren, Refactoring
opencode --model groq/llama-3.3-70b-versatile "
Implementiere Unit-Tests für alle Funktionen in src/auth.py.
Lies AGENTS.md für Projekt-Konventionen.
Committe mit: test: auth.py unit tests
"

# Tier C: OpenCode mit Ollama
# → Credentials-nahe Analyse, interne Docs, Bulk-Scans
opencode --model ollama/qwen3:14b "
Analysiere db_config.py auf Datenschutz-Risiken.
Schreibe Bericht in postbox/attachments/todo/security-review.md
"
```

Vollständige Routing-Strategie: [LLM Routing Strategie](/cc/llm-routing)

---

## Pattern 3: Oh-My-OpenCode als Koordinator

[Oh-My-OpenCode](https://github.com/code-yeongyu/oh-my-opencode) transformiert OpenCode in ein mehrstufiges Agent-Team:

```bash
# Installation
bunx oh-my-opencode install

# Starten
opencode  # Oh-My-OpenCode wird automatisch aktiviert
```

**Was Oh-My-OpenCode hinzufügt:**

```
Standard OpenCode:
  User-Prompt → LLM → Code-Änderung

Oh-My-OpenCode:
  User-Prompt
    → Planer-Agent (analysiert Task, zerlegt in Subtasks)
    → Coder-Agent (implementiert)
    → Tester-Agent (schreibt + führt Tests aus)
    → Reviewer-Agent (prüft Qualität, schlägt Verbesserungen vor)
    → Merger-Agent (combined, committet)
```

Konkret für einen Feature-Task:

```bash
opencode "
Implementiere eine Rate-Limiting-Middleware für FastAPI.
- Redis als Backend (REDIS_URL env var)
- Limits: 100 req/min pro IP, 1000 req/min pro API-Key
- Tests mit pytest + pytest-asyncio
- AGENTS.md Regeln gelten
"
# Oh-My-OpenCode koordiniert automatisch:
# 1. Planer schreibt Subtask-Liste
# 2. Coder implementiert parallel (LSP-aware)
# 3. Tester schreibt pytest-Tests
# 4. Reviewer prüft auf Security + Style
# 5. Commit mit korrektem Format
```

---

## Anti-Patterns

**Zwei Agenten schreiben gleichzeitig in dieselbe Datei:**
```bash
# ❌ Race Condition
# Terminal 1: opencode fixt auth.py
# Terminal 2: claude fixt auth.py (gleichzeitig)

# ✓ Koordination via todo.md
# Fixer trägt "In Bearbeitung: Claude Code" ein bevor er startet
# OpenCode überspringt Tasks die "In Bearbeitung" markiert sind
```

**OpenCode für Architektur-Entscheidungen mit billigem Modell:**
```bash
# ❌ Falsches Routing
opencode --model ollama/qwen3:7b "Redesigne die gesamte Datenbankschicht"

# ✓ Richtiges Routing
# Architektur → Claude Code Tab (Tier A)
# Implementierung der Architektur → OpenCode (Tier B)
```

**AGENTS.md nicht synchron halten:**
```bash
# ❌ Agenten wissen unterschiedliche Dinge
# OpenCode liest AGENTS.md
# Claude Code liest CLAUDE.md (veraltete Kopie)

# ✓ Einheitliche Quelle
ln -s AGENTS.md CLAUDE.md  # CLAUDE.md → Symlink → AGENTS.md
echo "CLAUDE.md" >> .gitignore
# Jetzt lesen beide Agenten dieselbe Datei
```

---

## Postbox-Koordination (vollständiges Beispiel)

```
postbox/
├── todo.md            ← OpenCode schreibt Scan-Ergebnisse
├── done.md            ← Claude Code schreibt erledigte Tasks + Commit-Hash
└── README.md          ← Regeln für beide Agenten
```

Format in todo.md (kompatibel mit beiden Tools):
```markdown
| #ID | Beschreibung | Prio | Fällig | Agent | Datei |
|-----|------|------|--------|-------|-------|
| #023 | auth.py:89 — fehlende Fehlerbehandlung bei DB-Timeout | Hoch | sofort | OpenCode-Scan | auth.py:89 |
```

Format in done.md:
```markdown
| #023 | auth.py:89 DB-Timeout-Fix + Regression-Test | Claude Sonnet 4.6 | a3f8b12 | 2026-03-01 |
```

---

*Zurück: [ZED Integration](/opencode/zed-integration) · [Postbox Pattern](/cc/postbox-pattern) · [Praxis-Patterns](/terminal/patterns)*

*Ressourcen: [opencode.ai](https://opencode.ai/) · [Oh-My-OpenCode](https://github.com/code-yeongyu/oh-my-opencode)*

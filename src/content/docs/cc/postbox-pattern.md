---
title: Postbox Pattern
description: Shared Task State zwischen Agenten via postbox/todo.md und postbox/done.md
---

## Das Postbox-Konzept

Das Postbox Pattern ist der einfachste Mechanismus für **asynchrone Koordination zwischen mehreren AI-Agenten** ohne API-Overhead oder Message-Passing-Infrastruktur.

**Kernidee:** Zwei Dateien im Dateisystem fungieren als geteiltes Task-Board.

```
postbox/
├── todo.md    ← Offene Tasks (jeder Agent kann lesen und schreiben)
└── done.md    ← Erledigte Tasks (mit Commit-Referenz)
```

## Warum Dateisystem statt API?

- **Kein Code nötig**: Agenten nutzen ihre normalen Datei-Lese/Schreib-Fähigkeiten
- **Kein Overhead**: Keine Nachrichtenwarteschlange, kein State-Management-Service
- **Git-natürlich**: todo.md und done.md sind normale Dateien, werden committed
- **Debuggbar**: Menschen können jederzeit einsehen, was Agenten koordinieren
- **Tool-agnostisch**: Jeder Agent, der Dateien lesen kann, versteht das Format

## Format: postbox/todo.md

```markdown
# Todo — Offene Tasks

> Zuletzt aktualisiert: DATUM von AGENT

## Offene Tasks

| ID | Task | Priorität | Quelle | Datei:Zeile |
|----|------|-----------|--------|-------------|
| #001 | Fehlende Fehlerbehandlung in login() | hoch | Gemini-Scan | src/auth.py:45 |
| #002 | Deprecated API in user_service | mittel | Gemini-Scan | src/users.py:123 |
| #003 | Test für edge case fehlt | niedrig | Claude | tests/test_auth.py |

## In Bearbeitung

| ID | Task | Agent | Seit |
|----|------|-------|------|
| #001 | Fehlende Fehlerbehandlung | Claude Code Tab | 2026-02-24 14:30 |
```

## Format: postbox/done.md

```markdown
# Done — Erledigte Tasks

| ID | Task | Agent | Commit | Datum |
|----|------|-------|--------|-------|
| #001 | Fehlende Fehlerbehandlung in login() | Claude Code Tab | abc1234 | 2026-02-24 14:45 |
```

## Workflow-Rollen

### Scanner-Agent (z.B. Gemini CLI)
```
Systemprompt:
"Du bist der Scanner. Deine einzige Aufgabe:
1. Scanne src/ nach [Problemen]
2. Schreibe jeden Fund in postbox/todo.md
3. Löse niemals selbst einen Task
4. Beginne sofort nach dem Schreiben mit dem nächsten Scan"
```

### Fixer-Agent (z.B. Claude Code Tab)
```
Systemprompt:
"Du bist der Fixer. Deine Aufgabe:
1. Lese postbox/todo.md
2. Wähle den Task mit höchster Priorität
3. Markiere ihn als 'In Bearbeitung'
4. Fixe den Code, committe
5. Verschiebe den Task nach postbox/done.md (mit Commit-Hash)
6. Beginne sofort mit dem nächsten Task"
```

## Initialisierung

```bash
mkdir -p postbox

cat > postbox/todo.md << 'EOF'
# Todo — Offene Tasks

| ID | Task | Priorität | Quelle | Datei:Zeile |
|----|------|-----------|--------|-------------|

EOF

cat > postbox/done.md << 'EOF'
# Done — Erledigte Tasks

| ID | Task | Agent | Commit | Datum |
|----|------|-------|--------|-------|

EOF

git add postbox/
git commit -m "feat: postbox pattern initialisiert"
```

## Praktische Hinweise

- **Keine Locks nötig**: Bei realen Projekten schreiben Agenten selten gleichzeitig in dieselbe Datei. Wenn doch, löst ein kurzer Human-in-the-loop-Check das Problem.
- **IDs nicht wiederverwenden**: Erledigte Tasks in done.md behalten ihre ID — so bleibt die Audit-History klar.
- **Commit-Referenzen**: Der Fixer-Agent sollte immer den Commit-Hash in done.md eintragen — ermöglicht `git show abc1234` für Details.

[Weiter: LLM Routing Strategie](/cc/llm-routing)

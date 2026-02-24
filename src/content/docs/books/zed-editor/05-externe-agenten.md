---
title: "5. Externe Agenten"
description: Claude Code, Gemini CLI und andere externe Agenten via ACP — so funktioniert die Integration.
---

# Externe Agenten

## Was ist ACP?

Das **Agent Client Protocol (ACP)** ist ZEDs Interface für externe KI-Tools.
Es ermöglicht, dass CLI-basierte Agenten wie Claude Code oder Gemini CLI innerhalb
von ZED laufen — als wären sie ein eingebettetes System.

## Konfigurierte Agenten anzeigen

Settings → External Agents (`Ctrl+,` → "External Agents")

Typische Konfiguration:
- Claude Agent ✓
- Codex CLI ✓
- Gemini CLI ✓

## Claude Code Tab

Claude Code (Version 2.x) läuft als eigener Terminal-Prozess in einem ZED-Tab.
Es nutzt dein **Anthropic-Konto via OAuth — keine separaten API-Key Kosten entstehen.**

**Starten:** Im Agent Panel `+` → "Claude Agent" → "/login" → "rechts auf Login Claude" klicken.

:::note[Native Installer]
Ab Claude Code 2.x wurde von npm auf einen nativen Installer umgestellt.
Falls du eine Warnung siehst: `claude install` ausführen.
:::

## Bekannte Einschränkungen (Stand ZED 0.224.11)

Laut offizieller ZED-Dokumentation sind folgende Features für externe Agenten
**noch nicht implementiert:**

- Thread History wiederherstellen
- Checkpoints
- Token Usage Anzeige (unnötig im Abo-Betrieb)
- Model Selection innerhalb von ZED

Das ist kein Bug — das steht explizit in der Doku mit dem Hinweis "should be supported in the future".

→ Weiter: [Storage-Architektur](/books/zed-editor/06-storage-architektur/)

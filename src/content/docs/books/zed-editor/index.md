---
title: "ZED Editor — Verstehen"
description: Ein praktischer Leitfaden zur KI-Architektur des ZED Editors. Entstanden aus praktischer Anwendung.
---

# ZED Editor — Verstehen

> *"Wir haben unnötigerweise in SQLite-Datenbanken herumgebastelt, bevor wir ins Handbuch geschaut haben.
> Dieses Buch soll dafür sorgen, dass dir das nicht passiert."*

## Warum dieses Buch?

ZED ist ein moderner Code-Editor mit tief integrierter KI. Das klingt einfach — ist es aber nicht,
wenn man nicht versteht, dass ZED **drei völlig verschiedene KI-Systeme** hat, die unterschiedlich
funktionieren, unterschiedlich speichern und unterschiedliche Fähigkeiten haben.

Wer das nicht weiß, erlebt Folgendes:
- Die KI kann plötzlich keine Threads mehr lesen, obwohl sie es gestern noch konnte
- Die Schrift im Eingabefeld ist plötzlich Monospace
- Die Thread-History ist "verschwunden"
- git-Befehle können von der KI nicht mehr angestoßen werden

All das hat eine simple Erklärung — aber nur wenn man die Architektur kennt.

## Inhaltsverzeichnis

1. [Was ist ZED?](/books/zed-editor/01-was-ist-zed/) — Editor, KI-Plattform oder beides?
2. [Die drei Panels](/books/zed-editor/02-drei-panels/) — Text Thread, Agent Panel, Claude Code Tab
3. [Das Agent Panel](/books/zed-editor/03-agent-panel/) — Werkzeuge, Dateizugriff, Terminal
4. [Text Threads](/books/zed-editor/04-text-threads/) — Wofür sie gedacht sind (und wofür nicht)
5. [Externe Agenten](/books/zed-editor/05-externe-agenten/) — Claude Code, Gemini CLI via ACP
6. [Storage-Architektur](/books/zed-editor/06-storage-architektur/) — Wo ZED was speichert
7. [Die wichtigste Lektion](/books/zed-editor/07-die-wichtigste-lektion/) — Docs first, debug second

## Versions-Info

- Getestet mit: **ZED 0.224.11**
- Betriebssystem: Debian Linux
- Stand: Februar 2026

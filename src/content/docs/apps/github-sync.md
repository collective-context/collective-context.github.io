---
title: "GitHub Sync — Deploy mit einem Push"
description: "Statische Website auf GitHub? Automatisch live auf deinem cBUZZ.IO LEMP-Server — ohne FTP, ohne manuelles Hochladen."
---

import { Aside, Steps, Card, CardGrid } from '@astrojs/starlight/components';

# GitHub Sync — Deploy mit einem Push

**Du pflegst deine Website auf GitHub. Wir deployen sie automatisch.**
Kein FTP. Kein manuelles Hochladen. Kein Warten.

---

## Das Problem, das wir lösen

Du baust deine Website mit [Publii](https://getpublii.com/), Jekyll, Hugo oder einem anderen Static Site Generator — und willst sie auf deinem **cBUZZ.IO Hosting-Server** live haben.

Bisher hieß das: exportieren, SFTP öffnen, Dateien hochladen, warten, prüfen.

**Mit GitHub Sync entfällt das komplett.**

---

## So funktioniert es

<Steps>

1. **GitHub-Repo verbinden**
   Du trägst einmalig die URL deines GitHub-Repositories in ein einfaches Admin-Panel ein — ähnlich wie du in WordPress oder Ghost eine Einstellung speicherst.

2. **Push = Deploy**
   Sobald du Änderungen in dein GitHub-Repo pushst, erkennt der Server das automatisch und synchronisiert deine Website — in Sekunden.

3. **Nur Änderungen werden übertragen**
   Das System nutzt Delta-Sync (rsync): Nur geänderte Dateien wandern auf den Server. Kein unnötiger Datenverkehr, kein Komplett-Upload bei jeder Kleinigkeit.

</Steps>

---

## Was du brauchst

- Ein **cBUZZ.IO Combo-Paket** (€9,90/Mo) — beinhaltet LEMP-Stack, SSH und rsync
- Ein **öffentliches GitHub-Repository** mit deiner statischen Website
- 5 Minuten für die Einrichtung

---

## Was im Hintergrund passiert

```
Du → git push → GitHub
                   │
                   └─ Webhook → cBUZZ.IO Server
                                    │
                                    ├─ git pull (nur neue Commits)
                                    └─ rsync → dein htdocs/
                                                   │
                                                   └─ ✓ Website live
```

Technisch setzt das auf **GitHub Webhooks** + einen schlanken Python-Service auf deinem Server, der ohne externe Abhängigkeiten auskommt. Die Verbindung ist via HTTPS abgesichert, Webhook-Signaturen werden kryptografisch verifiziert (HMAC-SHA256).

---

## Für wen ist das?

<CardGrid>
  <Card title="Content Creator" icon="pencil">
    Du schreibst in Publii oder Obsidian, exportierst als statisches HTML und willst dich nicht um Deployment kümmern.
  </Card>
  <Card title="Entwickler & Freelancer" icon="laptop">
    Du nutzt Jekyll, Hugo oder Astro und willst einen sauberen Git-Workflow: commit → push → live.
  </Card>
  <Card title="Kleine Agenturen" icon="group">
    Mehrere Kunden-Websites, ein einheitlicher Prozess: jede Domain bekommt ihre eigene Sync-Konfiguration.
  </Card>
  <Card title="Technisch Neugierige" icon="rocket">
    Du willst verstehen wie Deployment-Automation funktioniert — und ein echtes Beispiel als Ausgangspunkt haben.
  </Card>
</CardGrid>

---

## Admin-Panel

Die Einrichtung läuft über ein minimales Web-Interface unter `https://deine-domain.int.cy/scripts/admin`:

| Feld | Beschreibung |
|------|-------------|
| **Repository URL** | z.B. `https://github.com/Jo-Felsch/key-it` |
| **Branch** | Standard: `main` |
| **Webhook Secret** | Optionaler Sicherheitsschlüssel für GitHub |
| **Passwort** | Schützt das Admin-Panel selbst |

Gespeichert. Fertig. Der Rest läuft automatisch.

---

## Sicherheit

- Das Admin-Panel ist passwortgeschützt (HTTP Basic Auth)
- Webhook-Anfragen von GitHub werden kryptografisch signiert und verifiziert
- Der Sync-Prozess läuft ohne Root-Rechte ausschließlich innerhalb deines Verzeichnisses
- Credentials werden niemals im Klartext gespeichert

---

## Verfügbarkeit

<Aside type="caution" title="Early Access">
GitHub Sync ist aktuell in Entwicklung und wird als Teil des **cBUZZ.IO Combo-Pakets** ausgerollt.
Interesse? Schreib uns: [hosting@cbuzz.io](mailto:hosting@cbuzz.io)
</Aside>

Geplante Erweiterungen:
- **Private Repositories** via SSH Deploy Key
- **Build-Hook**: `publii build` oder `npm run build` vor dem Sync ausführen
- **Deploy-Log** im Admin-Panel: letzter Status + Zeitstempel
- **Multi-Repo**: Theme-Repo + Content-Repo getrennt verwalten

---

## Technischer Hintergrund

Wer tiefer einsteigen will: Die vollständige Architektur-Dokumentation und der Quellcode liegen im [collective-context GitHub-Repository](https://github.com/collective-context/collective-context.github.io/tree/main/hosting-scripts/bin/src).

Das Projekt folgt der **Kaizen-Philosophie** von collective-context.org:
*Veröffentliche schnell — update oft.*

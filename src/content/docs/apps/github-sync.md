---
title: "GitHub Seiten auf Hosting@ /cBUZZ.IO syncen"
description: "Statische Website auf GitHub? Automatisch live auf deinem cBUZZ.IO LEMP-Server — ohne FTP, ohne manuelles Hochladen."
---

import { Aside, Steps, Card, CardGrid } from '@astrojs/starlight/components';

**Du pflegst deine Website auf GitHub. Wir deployen sie automatisch.**
Kein SFTP. Kein manuelles Hochladen. Kein Warten.

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

- Ein **cBUZZ.IO Combo Paket** (€9,90/Mo) oder 
- Oder ein **cBUZZ.IO Unlimited Paket** (€19,90/Mo)
- Beide haben den LEMP-Stack mit SFTP und rsync integriert
- Ein **öffentliches GitHub-Repository** mit deiner statischen Website
- 5 Minuten für die Einrichtung ● https://cBUZZ.IO/hosting

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

## Kompatibilität mit Vercel

**Ja — cBUZZ.IO und Vercel können gleichzeitig laufen.** Beide holen sich die Dateien aus demselben GitHub-Repository.

### Was ist Vercel?

[Vercel](https://vercel.com/) ist eine Cloud-Plattform für Frontend-Deployment, entwickelt von den Machern von Next.js. Vercel ist besonders populär bei Entwicklern, weil es:

- **Automatisch deployt** — jeder Push auf GitHub löst einen Build aus
- **Kostenlos für Einzelpersonen** — großzügiges Free-Tier mit `*.vercel.app`-Subdomain
- **CDN weltweit** — Seiten werden von Edge-Standorten ausgeliefert
- **Serverless Functions** — kleine Backend-Funktionen direkt im Frontend-Repo

Typisches Beispiel: [`key-it.vercel.app`](https://key-it.vercel.app/) — eine Website die auf GitHub liegt und von Vercel automatisch gebaut und gehostet wird.

### Vercel + cBUZZ.IO: zwei Welten, ein Repo

| | **Vercel** | **cBUZZ.IO Hosting@** |
|---|---|---|
| Domain | `*.vercel.app` (kostenlos) | Eigene Domain, z.B. `keyit-solutions.int.cy` |
| Standort | USA/Global CDN | 🇪🇺 EU-Server, DSGVO-konform |
| Zweck | Schnelle Previews, Entwicklung | Produktiv-Hosting mit eigenem Domain |
| Kosten | Free bis €20/Mo | ab €9,90/Mo |
| SFTP/SSH | ✗ | ✓ |

**Workflow für Kunden wie Jo Felsch (key-it):**

```
GitHub: github.com/Jo-Felsch/key-it
          │
          ├─ → Vercel → key-it.vercel.app       (Preview / Entwicklung)
          │
          └─ → cBUZZ.IO → keyit-solutions.int.cy (Produktion, EU, eigene Domain)
```

Du pushst einmal — beide Plattformen deployen gleichzeitig, unabhängig voneinander.

<Aside type="tip" title="Für Next.js / Build-Projekte">
Wenn dein Repo einen Build-Schritt benötigt (z.B. `npm run build` bei Next.js oder Astro), aktiviere unseren **Build-Hook** (aktuell in Entwicklung). Damit läuft vor dem rsync automatisch dein Build — genau wie bei Vercel, nur auf deinem EU-Server.
</Aside>

---

## Technischer Hintergrund

Wer tiefer einsteigen will: Die vollständige Architektur-Dokumentation und der Quellcode liegen im [collective-context GitHub-Repository](https://github.com/collective-context/collective-context.github.io/tree/main/hosting-scripts/bin/src).

Das Projekt folgt der **Kaizen-Philosophie** von collective-context.org:
*Veröffentliche schnell — update oft.*

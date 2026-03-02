# github-sync — cBUZZ.IO GitHub → LEMP Deployment Bridge

> Status: Konzept v0.1 · Stand: 2026-03-02
> Ablage: `hosting-scripts/bin/` · Script: `src/github-sync.py`

---

## Idee in einem Satz

Der Kunde trägt seine GitHub-Repo-URL in ein einfaches Admin-Panel ein —
ab da deployt sich seine statische Website bei jedem Push automatisch auf seinen cBUZZ.IO LEMP-Server.

---

## Architektur

```
GitHub-Repo
  │
  │  (a) Webhook (Push-Event) — sofortig
  │  (b) cron: pull alle 5 min — Fallback
  ↓
github-sync.py (Python, läuft pro Domain als systemd-Service)
  ├── /admin        — Admin-Panel (HTTP Basic Auth)
  ├── /admin/save   — Config speichern
  ├── /admin/sync   — Manueller Sync-Trigger
  └── /webhook      — GitHub-Webhook-Endpoint
          │
          ├── git clone / git pull  (→ /var/www/{domain}/.github-cache/)
          └── rsync -a --delete     (→ /var/www/{domain}/htdocs/)

Nginx (pro Domain)
  └── conf/nginx/scripts.conf
        └── location /scripts/ → proxy_pass 127.0.0.1:8080
```

---

## Kundenverzeichnis-Struktur nach Setup

```
/var/www/who.at/
├── htdocs/                    ← Document Root (wird via rsync befüllt)
├── conf/
│   ├── nginx/
│   │   ├── ssl.conf           ← TLS, HTTP/3 (WordOps-generiert)
│   │   └── scripts.conf       ← GitHub-Sync nginx-Proxy (NEU)
│   └── github-sync.conf       ← Kunden-Config: Repo-URL, Auth (NEU)
├── logs/
├── scripts -> /var/www/scripts/   ← Symlink (NEU) — shared Scripts
└── .github-cache/             ← git-Clone-Cache (auto-erstellt, nicht im Repo)
```

---

## Dateien (NEU pro Kunde)

### 1. `conf/nginx/scripts.conf`

```nginx
# GitHub-Sync Admin-Panel + Webhook
# Included by: /etc/nginx/sites-available/{domain}
# github-sync.py muss laufen: systemctl start github-sync@{domain}

location /scripts/ {
    proxy_pass         http://127.0.0.1:8080/;
    proxy_set_header   Host              $host;
    proxy_set_header   X-Real-IP         $remote_addr;
    proxy_set_header   X-Forwarded-For   $proxy_add_x_forwarded_for;
    proxy_read_timeout 60s;
}
```

> **Hinweis:** Jede Domain bekommt einen eigenen Port (8080, 8081, ...).
> Alternativ: Unix-Sockets für Zero-Port-Konflikt (Phase 2).

### 2. `conf/github-sync.conf`

```ini
[github]
repo_url       = https://github.com/Jo-Felsch/key-it
branch         = main
webhook_secret = s3cr3t-von-github

[auth]
username      = admin
password_hash = sha256-hash-des-passworts

[server]
port = 8080
host = 127.0.0.1
```

### 3. Symlink `scripts/`

```bash
# Einmalig beim Kunden-Setup:
ln -s /var/www/scripts /var/www/who.at/scripts
```

`/var/www/scripts/` enthält alle geteilten Scripts (github-sync.py, zukünftige Tools).
Jedes Kundenverzeichnis teilt dieselben Scripts via Symlink.

---

## systemd-Service (pro Domain)

`/etc/systemd/system/github-sync@.service`

```ini
[Unit]
Description=cBUZZ.IO GitHub-Sync (%i)
After=network.target

[Service]
Type=simple
User=www-data
ExecStart=/var/www/scripts/github-sync.py --domain %i --port 8080
Restart=on-failure
RestartSec=5s

[Install]
WantedBy=multi-user.target
```

```bash
# Aktivieren:
systemctl enable --now github-sync@who.at
systemctl enable --now github-sync@example.com
```

> **Problem:** Alle Domains teilen Port 8080 → Port-Konflikt.
> **Lösung Phase 2:** Port aus `conf/github-sync.conf` lesen, oder Unix-Sockets.

---

## Kunden-Workflow

```
1. Kunde kauft Combo-Paket bei cBUZZ.IO (€9,90/Mo)
2. SysOps provisioniert Domain via WordOps:
      wo site create who.at --mysql --php83
3. Setup-Script (todo: provision.sh) legt an:
      - /var/www/who.at/conf/nginx/scripts.conf
      - /var/www/who.at/conf/github-sync.conf  (leer)
      - /var/www/who.at/scripts → /var/www/scripts/ (Symlink)
      - systemd github-sync@who.at starten

4. Kunde öffnet: https://who.at/scripts/admin
5. Trägt ein:
      Repo-URL:  https://github.com/Jo-Felsch/key-it
      Branch:    main
      Passwort:  wird gesetzt

6. Klickt "Jetzt synchronisieren" → erster Deploy
7. Optional: Webhook in GitHub einrichten
      → ab da: jeder Push deployt automatisch
```

---

## GitHub-Webhook einrichten (Kunden-Anleitung)

```
GitHub → Repository → Settings → Webhooks → Add webhook

Payload URL:   https://who.at/scripts/webhook
Content type:  application/json
Secret:        (dasselbe wie im Admin-Panel eingetragen)
Events:        ✓ Just the push event
```

---

## Sicherheits-Überlegungen

| Aspekt | Implementierung |
|--------|-----------------|
| Admin-Zugang | HTTP Basic Auth (Passwort als SHA-256-Hash gespeichert) |
| Webhook-Validierung | HMAC-SHA256 (GitHub `X-Hub-Signature-256`) |
| Kein Sudo | Script läuft als `www-data`, schreibt nur in `/var/www/{domain}/` |
| Credentials | Repo-URL darf public sein — kein Token nötig für public Repos |
| Private Repos | Phase 2: SSH-Deploy-Key oder GitHub Fine-grained Token als Env-Var |

---

## Offene Punkte (Roadmap)

| Prio | Thema | Beschreibung |
|------|-------|--------------|
| P1 | `provision.sh` | Setup-Script: erstellt alle Dateien + Symlink + systemd-Unit für neue Kunden |
| P1 | Port-Management | Port aus Config lesen, kein Hardcode 8080 |
| P2 | Unix-Sockets | Nginx ↔ Python via Socket statt TCP (sauberer, kein Port-Konflikt) |
| P2 | Deploy-Log | Letzten Sync-Status + Timestamp in Admin-Panel anzeigen |
| P2 | Private Repos | SSH-Deploy-Key oder GitHub-Token (als Env-Var, nie in Config) |
| P3 | Multi-Repo | Mehrere Repos pro Domain (z.B. Theme-Repo + Content-Repo) |
| P3 | Build-Hook | Vor rsync: `npm run build` oder `publii build` ausführen (optional) |

---

## Abhängigkeiten

| Tool | Paket | Warum |
|------|-------|-------|
| Python 3.8+ | vorinstalliert | HTTP-Server, Admin-Panel |
| git | `apt install git` | Clone + Pull |
| rsync | `apt install rsync` | Delta-Sync zu htdocs |
| systemd | vorinstalliert | Service-Management |

Keine pip-Pakete nötig — reines stdlib.

---

*Entwickelt für: cBUZZ.IO Combo-Paket (€9,90/Mo) · LEMP + Publii / Jekyll / Hugo*
*Nächster Schritt: `provision.sh` — automatisiertes Kunden-Setup*

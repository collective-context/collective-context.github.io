#!/usr/bin/env python3
"""
github-sync.py — cBUZZ.IO GitHub → LEMP Deployment Bridge
==========================================================
Kein Framework, keine externen Abhängigkeiten — nur Python stdlib + git + rsync.

Setup:
  python3 github-sync.py --domain who.at --port 8080

Nginx-Include:  /var/www/{domain}/conf/nginx/scripts.conf
Config:         /var/www/{domain}/conf/github-sync.conf
Symlink:        /var/www/{domain}/scripts/ → /var/www/scripts/
"""

import argparse
import base64
import configparser
import hashlib
import hmac
import html
import json
import os
import subprocess
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

# ---------------------------------------------------------------------------
# Config-Helpers
# ---------------------------------------------------------------------------

CONFIG_TEMPLATE = """\
[github]
repo_url       =
branch         = main
webhook_secret =

[auth]
username      = admin
password_hash =

[server]
port = 8080
host = 127.0.0.1
"""


def config_path(domain: str) -> Path:
    return Path(f"/var/www/{domain}/conf/github-sync.conf")


def load_config(domain: str) -> configparser.ConfigParser:
    cfg = configparser.ConfigParser()
    cfg.read_string(CONFIG_TEMPLATE)          # defaults
    cfg.read(config_path(domain))             # override with file
    return cfg


def save_config(domain: str, cfg: configparser.ConfigParser) -> None:
    p = config_path(domain)
    p.parent.mkdir(parents=True, exist_ok=True)
    with open(p, "w") as fh:
        cfg.write(fh)


def pw_hash(plain: str) -> str:
    return hashlib.sha256(plain.encode()).hexdigest()


# ---------------------------------------------------------------------------
# Sync-Engine
# ---------------------------------------------------------------------------

def run(cmd: list, cwd=None) -> tuple:
    r = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd)
    return r.returncode, r.stdout.strip(), r.stderr.strip()


def do_sync(domain: str, cfg: configparser.ConfigParser) -> tuple:
    """git clone/pull + rsync → htdocs. Returns (ok: bool, message: str)."""
    repo_url = cfg.get("github", "repo_url", fallback="").strip()
    branch   = cfg.get("github", "branch",   fallback="main").strip()
    htdocs   = f"/var/www/{domain}/htdocs"
    cache    = Path(f"/var/www/{domain}/.github-cache")

    if not repo_url:
        return False, "Kein GitHub-Repo konfiguriert — bitte im Admin-Panel eintragen."

    # git clone (einmalig) oder pull (delta)
    if (cache / ".git").exists():
        code, out, err = run(["git", "pull", "origin", branch], cwd=cache)
        action = "git pull"
    else:
        cache.mkdir(parents=True, exist_ok=True)
        code, out, err = run(
            ["git", "clone", "--depth=1", "-b", branch, repo_url, str(cache)]
        )
        action = "git clone"

    if code != 0:
        return False, f"{action} fehlgeschlagen:\n{err}"

    # rsync: nur Änderungen, gelöschte Dateien entfernen
    code, _, err = run(["rsync", "-a", "--delete", f"{cache}/", f"{htdocs}/"])
    if code != 0:
        return False, f"rsync fehlgeschlagen:\n{err}"

    return True, f"{action} + rsync OK\n{out}"


# ---------------------------------------------------------------------------
# HTTP-Handler
# ---------------------------------------------------------------------------

class SyncHandler(BaseHTTPRequestHandler):
    domain: str = ""

    def log_message(self, fmt, *args):
        pass  # Logging via systemd journal

    # --- Auth ---------------------------------------------------------------

    def _check_auth(self) -> bool:
        auth = self.headers.get("Authorization", "")
        if not auth.startswith("Basic "):
            return False
        try:
            user, pw = base64.b64decode(auth[6:]).decode().split(":", 1)
        except Exception:
            return False
        cfg = load_config(self.domain)
        ok_user = cfg.get("auth", "username",      fallback="admin")
        ok_hash = cfg.get("auth", "password_hash", fallback="")
        return user == ok_user and pw_hash(pw) == ok_hash

    def _require_auth(self) -> bool:
        if self._check_auth():
            return True
        self.send_response(401)
        self.send_header("WWW-Authenticate", 'Basic realm="cBUZZ.IO GitHub-Sync"')
        self.end_headers()
        return False

    # --- Responses ----------------------------------------------------------

    def _html(self, code: int, body: str) -> None:
        data = body.encode()
        self.send_response(code)
        self.send_header("Content-Type", "text/html; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _text(self, code: int, body: str) -> None:
        data = body.encode()
        self.send_response(code)
        self.send_header("Content-Type", "text/plain; charset=utf-8")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def _redirect(self, location: str) -> None:
        self.send_response(302)
        self.send_header("Location", location)
        self.end_headers()

    # --- Routing ------------------------------------------------------------

    def do_GET(self):
        p = urlparse(self.path).path
        if p in ("/", "/admin"):
            if self._require_auth():
                self._serve_admin()
        else:
            self._html(404, "<h1>404</h1>")

    def do_POST(self):
        p    = urlparse(self.path).path
        size = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(size)

        if p == "/webhook":
            self._handle_webhook(body)
        elif p == "/admin/save":
            if self._require_auth():
                self._handle_save(body)
        elif p == "/admin/sync":
            if self._require_auth():
                self._handle_sync()
        else:
            self._text(404, "not found")

    # --- Handlers -----------------------------------------------------------

    def _handle_webhook(self, body: bytes) -> None:
        cfg    = load_config(self.domain)
        secret = cfg.get("github", "webhook_secret", fallback="").strip()

        if secret:
            sig      = self.headers.get("X-Hub-Signature-256", "")
            expected = "sha256=" + hmac.new(
                secret.encode(), body, hashlib.sha256
            ).hexdigest()
            if not hmac.compare_digest(sig, expected):
                self._text(403, "Invalid signature")
                return

        ok, msg = do_sync(self.domain, cfg)
        self._text(200 if ok else 500, msg)

    def _handle_save(self, body: bytes) -> None:
        params = parse_qs(body.decode())
        get    = lambda k, d="": params.get(k, [d])[0].strip()

        cfg = load_config(self.domain)
        if not cfg.has_section("github"):
            cfg.add_section("github")
        if not cfg.has_section("auth"):
            cfg.add_section("auth")

        cfg.set("github", "repo_url",       get("repo_url"))
        cfg.set("github", "branch",         get("branch", "main"))

        webhook = get("webhook_secret")
        if webhook and webhook != "●●●●":
            cfg.set("github", "webhook_secret", webhook)

        new_pw = get("new_password")
        if new_pw:
            cfg.set("auth", "password_hash", pw_hash(new_pw))

        save_config(self.domain, cfg)
        self._redirect("/admin?saved=1")

    def _handle_sync(self) -> None:
        ok, msg = do_sync(self.domain, load_config(self.domain))
        prefix  = "✓" if ok else "✗"
        self._html(200, f"<pre style='font-family:monospace'>{prefix} {html.escape(msg)}</pre>"
                        "<p><a href='/admin'>← Zurück</a></p>")

    # --- Admin-Panel --------------------------------------------------------

    def _serve_admin(self) -> None:
        cfg      = load_config(self.domain)
        repo_url = html.escape(cfg.get("github", "repo_url", fallback=""))
        branch   = html.escape(cfg.get("github", "branch",   fallback="main"))
        has_sec  = bool(cfg.get("github", "webhook_secret", fallback="").strip())
        saved    = "saved=1" in self.path
        domain_e = html.escape(self.domain)

        page = f"""<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>GitHub-Sync — {domain_e}</title>
  <style>
    *   {{ box-sizing: border-box; }}
    body{{ font-family: system-ui, sans-serif; max-width: 580px;
          margin: 2rem auto; padding: 1rem; color: #222; }}
    h1  {{ font-size: 1.4rem; color: #1a3a5c; margin-bottom: .25rem; }}
    .sub{{ color: #666; font-size: .9rem; margin-bottom: 1.5rem; }}
    label{{ display: block; margin-top: 1rem; font-weight: 600; font-size: .9rem; }}
    input{{ width: 100%; padding: .5rem .75rem; margin-top: .25rem;
            border: 1px solid #ccc; border-radius: 6px; font-size: 1rem; }}
    .btn {{ display: inline-block; margin-top: 1.25rem; padding: .55rem 1.4rem;
            color: #fff; border: none; border-radius: 6px; cursor: pointer;
            font-size: 1rem; font-weight: 600; }}
    .btn-save {{ background: #e8500a; }}
    .btn-sync {{ background: #1a3a5c; }}
    .saved    {{ color: #2d6a1e; background: #e8f5e9; border: 1px solid #a5d6a7;
                padding: .5rem .75rem; border-radius: 6px; margin-bottom: 1rem; }}
    hr  {{ margin: 2rem 0; border: none; border-top: 1px solid #eee; }}
    .hint{{ font-size: .8rem; color: #666; margin-top: .25rem; }}
    code{{ background: #f4f4f4; padding: 2px 6px; border-radius: 4px; }}
  </style>
</head>
<body>
  <h1>GitHub-Sync</h1>
  <div class="sub">{domain_e}</div>

  {"<div class='saved'>✓ Einstellungen gespeichert.</div>" if saved else ""}

  <form method="post" action="/admin/save">
    <label>GitHub Repository URL
      <input name="repo_url" value="{repo_url}"
             placeholder="https://github.com/Jo-Felsch/key-it">
    </label>
    <label>Branch
      <input name="branch" value="{branch}" placeholder="main">
    </label>
    <label>Webhook Secret
      <input name="webhook_secret"
             placeholder="{'●●●● (gesetzt — leer lassen zum Behalten)' if has_sec else 'optional'}">
      <div class="hint">GitHub → Repository → Settings → Webhooks</div>
    </label>
    <label>Neues Passwort für Admin-Panel
      <input name="new_password" type="password" placeholder="leer lassen = unveränder">
    </label>
    <button type="submit" class="btn btn-save">Speichern</button>
  </form>

  <form method="post" action="/admin/sync">
    <button type="submit" class="btn btn-sync">Jetzt synchronisieren</button>
  </form>

  <hr>
  <p class="hint">
    Webhook-URL: <code>https://{domain_e}/scripts/webhook</code><br>
    Content-Type: <code>application/json</code><br>
    Events: <code>push</code>
  </p>
</body>
</html>"""
        self._html(200, page)


# ---------------------------------------------------------------------------
# Entry Point
# ---------------------------------------------------------------------------

def make_handler(domain: str):
    class Handler(SyncHandler):
        pass
    Handler.domain = domain
    return Handler


def main() -> None:
    ap = argparse.ArgumentParser(description="cBUZZ.IO GitHub-Sync")
    ap.add_argument("--domain", required=True, help="z.B. who.at")
    ap.add_argument("--port",   type=int, default=8080)
    ap.add_argument("--host",   default="127.0.0.1")
    args = ap.parse_args()

    server = HTTPServer((args.host, args.port), make_handler(args.domain))
    print(f"[github-sync] {args.domain} → http://{args.host}:{args.port}/admin")
    server.serve_forever()


if __name__ == "__main__":
    main()

# public/img/ — Statische Bilder

Dieses Verzeichnis enthält alle Bilder, die in Markdown-Seiten (`src/content/docs/`) eingebunden werden.

## Warum public/img/ und nicht src/assets/?

Astro kann Bilder in `src/assets/` automatisch optimieren — aber nur wenn sie über
`<Image />`-Komponenten oder `import`-Statements eingebunden werden.
Aus tief verschachtelten `.md`-Dateien (z.B. `books/zed-editor/`) führt das zu
`[ImageNotFound]` Build-Fehlern.

Bilder in `public/` werden von Astro **1:1 unverändert ausgeliefert** — kein
Optimierungs-Magic, kein Build-Fehler.

## Workflow

```
1. Screenshot / Bild erstellen
2. → public/img/mein-bild.png  ablegen
3. Im Markdown einbinden:  ![Alt-Text](/img/mein-bild.png)
```

Der Pfad im Markdown ist **absolut** (`/img/...`) und funktioniert von jeder Seite aus.

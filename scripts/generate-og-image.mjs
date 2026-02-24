import sharp from 'sharp';
import { writeFileSync } from 'fs';

// OG Image: 1200x630 — Collective Context Brand
const svg = `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0f172a"/>
      <stop offset="100%" style="stop-color:#1e293b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#818cf8"/>
      <stop offset="100%" style="stop-color:#38bdf8"/>
    </linearGradient>
    <filter id="glow">
      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
      <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
    </filter>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="url(#bg)"/>

  <!-- Subtle grid pattern -->
  <g opacity="0.06" stroke="#818cf8" stroke-width="1">
    <line x1="0" y1="105" x2="1200" y2="105"/>
    <line x1="0" y1="210" x2="1200" y2="210"/>
    <line x1="0" y1="315" x2="1200" y2="315"/>
    <line x1="0" y1="420" x2="1200" y2="420"/>
    <line x1="0" y1="525" x2="1200" y2="525"/>
    <line x1="150" y1="0" x2="150" y2="630"/>
    <line x1="300" y1="0" x2="300" y2="630"/>
    <line x1="450" y1="0" x2="450" y2="630"/>
    <line x1="600" y1="0" x2="600" y2="630"/>
    <line x1="750" y1="0" x2="750" y2="630"/>
    <line x1="900" y1="0" x2="900" y2="630"/>
    <line x1="1050" y1="0" x2="1050" y2="630"/>
  </g>

  <!-- Network visualization (right side) -->
  <!-- Connection lines -->
  <g opacity="0.25" stroke="url(#accent)" stroke-width="1.5">
    <line x1="870" y1="180" x2="990" y2="270"/>
    <line x1="870" y1="180" x2="960" y2="130"/>
    <line x1="870" y1="180" x2="780" y2="240"/>
    <line x1="990" y1="270" x2="1050" y2="390"/>
    <line x1="990" y1="270" x2="960" y2="130"/>
    <line x1="780" y1="240" x2="810" y2="360"/>
    <line x1="810" y1="360" x2="1050" y2="390"/>
    <line x1="810" y1="360" x2="870" y2="450"/>
    <line x1="1050" y1="390" x2="990" y2="480"/>
    <line x1="870" y1="450" x2="990" y2="480"/>
    <line x1="960" y1="130" x2="1080" y2="150"/>
    <line x1="1080" y1="150" x2="1050" y2="390"/>
  </g>

  <!-- Agent nodes -->
  <g filter="url(#glow)">
    <!-- Central node -->
    <circle cx="870" cy="315" r="22" fill="#818cf8" opacity="0.9"/>
    <circle cx="870" cy="315" r="14" fill="#c7d2fe"/>

    <!-- Surrounding nodes -->
    <circle cx="870" cy="180" r="16" fill="#38bdf8" opacity="0.85"/>
    <circle cx="990" cy="270" r="14" fill="#818cf8" opacity="0.75"/>
    <circle cx="960" cy="130" r="12" fill="#38bdf8" opacity="0.7"/>
    <circle cx="780" cy="240" r="13" fill="#818cf8" opacity="0.7"/>
    <circle cx="810" cy="360" r="15" fill="#38bdf8" opacity="0.8"/>
    <circle cx="1050" cy="390" r="13" fill="#818cf8" opacity="0.75"/>
    <circle cx="870" cy="450" r="11" fill="#38bdf8" opacity="0.65"/>
    <circle cx="990" cy="480" r="12" fill="#818cf8" opacity="0.7"/>
    <circle cx="1080" cy="150" r="10" fill="#38bdf8" opacity="0.6"/>
  </g>

  <!-- Accent bar top-left -->
  <rect x="80" y="80" width="4" height="70" fill="url(#accent)" rx="2"/>

  <!-- Main title -->
  <text x="108" y="138" font-family="system-ui, -apple-system, sans-serif" font-size="62" font-weight="800" fill="white" letter-spacing="-1">Collective</text>
  <text x="108" y="208" font-family="system-ui, -apple-system, sans-serif" font-size="62" font-weight="800" fill="url(#accent)" letter-spacing="-1">Context</text>

  <!-- Divider -->
  <rect x="108" y="232" width="480" height="2" fill="url(#accent)" opacity="0.4" rx="1"/>

  <!-- Subtitle -->
  <text x="108" y="282" font-family="system-ui, -apple-system, sans-serif" font-size="26" font-weight="400" fill="#94a3b8">Mehrere AI-Agenten. Ein gemeinsamer Kontext.</text>

  <!-- Feature pills -->
  <g font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="500">
    <!-- ZED -->
    <rect x="108" y="320" width="90" height="34" rx="17" fill="#818cf8" opacity="0.2"/>
    <rect x="108" y="320" width="90" height="34" rx="17" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.5"/>
    <text x="153" y="342" fill="#c7d2fe" text-anchor="middle">ZED Editor</text>

    <!-- ACP -->
    <rect x="210" y="320" width="78" height="34" rx="17" fill="#38bdf8" opacity="0.15"/>
    <rect x="210" y="320" width="78" height="34" rx="17" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.5"/>
    <text x="249" y="342" fill="#7dd3fc" text-anchor="middle">ACP</text>

    <!-- Claude -->
    <rect x="300" y="320" width="100" height="34" rx="17" fill="#818cf8" opacity="0.2"/>
    <rect x="300" y="320" width="100" height="34" rx="17" fill="none" stroke="#818cf8" stroke-width="1" opacity="0.5"/>
    <text x="350" y="342" fill="#c7d2fe" text-anchor="middle">Claude Code</text>

    <!-- Gemini -->
    <rect x="412" y="320" width="90" height="34" rx="17" fill="#38bdf8" opacity="0.15"/>
    <rect x="412" y="320" width="90" height="34" rx="17" fill="none" stroke="#38bdf8" stroke-width="1" opacity="0.5"/>
    <text x="457" y="342" fill="#7dd3fc" text-anchor="middle">Gemini CLI</text>
  </g>

  <!-- URL bottom left -->
  <text x="108" y="555" font-family="system-ui, -apple-system, sans-serif" font-size="20" fill="#475569">collective-context.org</text>

  <!-- Bottom accent line -->
  <rect x="0" y="618" width="1200" height="4" fill="url(#accent)" opacity="0.6"/>
</svg>`;

const svgBuffer = Buffer.from(svg);

sharp(svgBuffer)
  .png()
  .toFile('./public/og-image.png')
  .then(() => console.log('OG image generated: public/og-image.png'))
  .catch(err => { console.error(err); process.exit(1); });

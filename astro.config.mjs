import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://collective-context.org',
  integrations: [
    starlight({
      title: 'Collective Context',
      description: 'Multi-Agent KI-Orchestrierung für 10x Produktivität',
      social: [
        {
          label: 'GitHub',
          icon: 'github',
          href: 'https://github.com/collective-context',
        },
      ],
      editLink: {
        baseUrl: 'https://github.com/collective-context/collective-context.github.io/edit/main/',
      },
      customCss: [
        './src/styles/custom.css',
      ],
      sidebar: [
        {
          label: '🚀 Start',
          items: [
            { label: 'Home', link: '/' },
            { label: '4-Agent Setup', link: '/quickstart/4-agent-setup' },
            { label: 'Installation', link: '/quickstart/installation' },
          ],
        },
        {
          label: '🤖 Multi-Agent System',
          items: [
            { label: 'Übersicht', link: '/agents/overview' },
            { label: 'Tmux Workflows', link: '/agents/tmux-workflows' },
            { 
              label: 'Claude Instanzen',
              items: [
                { label: 'Claude-1 Architect', link: '/agents/claude-1' },
                { label: 'Claude-2 Reviewer', link: '/agents/claude-2' },
              ]
            },
            { 
              label: 'Aider Instanzen',
              items: [
                { label: 'Aider-1 Main Dev', link: '/agents/aider-1' },
                { label: 'Aider-2 Parallel', link: '/agents/aider-2' },
              ]
            },
          ],
        },
        {
          label: '🎭 Orchestration Patterns',
          items: [
            { label: 'Orchestra Pattern', link: '/patterns/orchestra' },
            { label: 'Swarm Pattern', link: '/patterns/swarm' },
            { label: 'Pipeline Pattern', link: '/patterns/pipeline' },
          ],
        },
        {
          label: '🗺️ Roadmap',
          items: [
            { label: 'Overview', link: '/roadmap/' },
            { label: 'Q3 2025', link: '/roadmap/2025-q3/' },
            { label: 'Q4 2025', link: '/roadmap/2025-q4/' },
          ],
        },
        {
          label: '📚 Guides',
          autogenerate: { directory: 'guides' },
        },
        {
          label: '📚 Case Studies',
          items: [
            { label: 'Übersicht', link: '/case-studies/' },
            { label: '#001: Website Launch', link: '/case-studies/001-website-launch' },
            { label: '#002: Open Source Migration', link: '/case-studies/002-open-source-migration' },
          ],
        },
        {
          label: '✈️ Checklists',
          autogenerate: { directory: 'checklists' },
        },
        {
          label: '🛠️ CCC Commander',
          items: [
            { label: 'Overview', link: '/ccc/overview' },
            { label: 'Installation', link: '/ccc/installation' },
            { label: 'CLI Reference', link: '/ccc/cli' },
          ],
        },
        {
          label: '🔒 Security',
          items: [
            { label: 'Security Notice', link: '/security/notice' },
            { label: 'Security Policy', link: '/security/policy' },
          ],
        },
        {
          label: '❓ Support',
          items: [
            { label: 'FAQ', link: '/faq' },
          ],
        },
      ],
    }),
    react(),
    mdx(),
    sitemap(),
  ],
});
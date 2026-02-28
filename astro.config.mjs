import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://collective-context.org',
  base: '/',
  integrations: [
    starlight({
      title: 'Collective Context',
      description: 'Mehrere AI-Agenten. Ein gemeinsamer Kontext. Powered by ZED + ACP.',
      defaultLocale: 'de',
      locales: {
        root: { label: 'Deutsch', lang: 'de' },
      },
      head: [
        { tag: 'meta', attrs: { property: 'og:image', content: 'https://collective-context.org/og-image.jpg' } },
        { tag: 'meta', attrs: { property: 'og:image:width', content: '1200' } },
        { tag: 'meta', attrs: { property: 'og:image:height', content: '630' } },
        { tag: 'meta', attrs: { property: 'og:type', content: 'website' } },
        { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
        { tag: 'meta', attrs: { name: 'twitter:image', content: 'https://collective-context.org/og-image.jpg' } },
      ],
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
            { label: 'Quick Start (5 Minuten)', link: '/quickstart/setup' },
            { label: 'Was ist ACP?', link: '/quickstart/what-is-acp' },
          ],
        },
        {
          label: '🏗️ ZED + ACP Fundament',
          items: [
            { label: 'ZED Editor Overview', link: '/zed/overview' },
            { label: 'Agent Client Protocol (ACP)', link: '/zed/acp' },
            { label: 'Claude Code Tab Setup', link: '/zed/claude-code-tab' },
            { label: 'Gemini CLI Setup', link: '/zed/gemini-cli' },
            { label: 'Ollama (lokal)', link: '/zed/ollama' },
            { label: 'ZED Pricing & BYOK', link: '/zed/pricing' },
          ],
        },
        {
          label: '💻 Agentic Coding Tools',
          items: [
            { label: 'Warum das Terminal?', link: '/terminal/why-terminal' },
            { label: 'Tool-Vergleich 2026', link: '/terminal/tool-comparison' },
            { label: 'Claude Code Deep-Dive', link: '/terminal/claude-code' },
            { label: 'Praxis-Patterns', link: '/terminal/patterns' },
          ],
        },
        {
          label: '🤖 OpenCode AI-Agent',
          items: [
            { label: 'Overview & Warum OpenCode?', link: '/opencode/overview' },
            { label: 'ZED Integration via ACP', link: '/opencode/zed-integration' },
            { label: 'Dual-Agent: OpenCode + Claude Code', link: '/opencode/dual-agent' },
          ],
        },
        {
          label: '🧠 Collective Context',
          items: [
            { label: 'Konzept & Architektur', link: '/cc/concept' },
            { label: 'CLAUDE.md Guide', link: '/cc/claude-md' },
            { label: 'AGENTS.md Guide', link: '/cc/agents-md' },
            { label: 'Postbox Pattern', link: '/cc/postbox-pattern' },
            { label: 'LLM Routing Strategie', link: '/cc/llm-routing' },
            { label: 'Quickstart Template', link: '/cc/quickstart-template' },
          ],
        },
        {
          label: '🎭 Patterns',
          items: [
            { label: 'Dual-Agent (Gemini + Claude)', link: '/patterns/dual-agent' },
            { label: 'Orchestra Pattern', link: '/patterns/orchestra' },
            { label: 'Pipeline Pattern', link: '/patterns/pipeline' },
            { label: 'Multi-Repo Coordination', link: '/patterns/multi-repo' },
          ],
        },
        {
          label: '📚 Case Studies',
          items: [
            { label: 'Übersicht', link: '/case-studies/' },
            { label: '#001: Claude Code Tab + Grok', link: '/case-studies/001-claude-grok' },
            { label: '#002: Dual-Agent Workflow', link: '/case-studies/002-dual-agent' },
          ],
        },
        {
          label: '🗺️ Roadmap',
          items: [
            { label: 'Overview', link: '/roadmap/' },
          ],
        },
        {
          label: '📖 Bibliothek',
          items: [
            { label: 'Alle Bücher', link: '/books/' },
            {
              label: 'Der ZED Editor',
              collapsed: true,
              items: [
                { label: 'Ganzes Buch', link: '/books/zed-editor/ganzes-buch/' },
                { label: 'Inhaltsverzeichnis', link: '/books/zed-editor/' },
                { label: '1. Was ist ZED?', link: '/books/zed-editor/01-was-ist-zed/' },
                { label: '2. Die drei Panels', link: '/books/zed-editor/02-drei-panels/' },
                { label: '3. Agent Panel', link: '/books/zed-editor/03-agent-panel/' },
                { label: '4. Text Threads', link: '/books/zed-editor/04-text-threads/' },
                { label: '5. Externe Agenten', link: '/books/zed-editor/05-externe-agenten/' },
                { label: '6. Storage-Architektur', link: '/books/zed-editor/06-storage-architektur/' },
                { label: '7. Die wichtigste Lektion', link: '/books/zed-editor/07-die-wichtigste-lektion/' },
              ],
            },
          ],
        },
        {
          label: '🗂️ Referenz',
          items: [
            { label: 'Modell-Benchmarks 2026', link: '/reference/benchmarks' },
            { label: 'Agentic Coding Sprachen 2026', link: '/reference/languages' },
            { label: 'Sitemap', link: '/sitemap' },
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
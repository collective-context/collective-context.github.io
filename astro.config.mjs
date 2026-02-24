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
          ],
        },
        {
          label: '🎭 Patterns',
          items: [
            { label: 'Dual-Agent (Gemini + Claude)', link: '/patterns/dual-agent' },
            { label: 'Orchestra Pattern', link: '/patterns/orchestra' },
            { label: 'Pipeline Pattern', link: '/patterns/pipeline' },
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
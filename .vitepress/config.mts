import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'QA Playbook',
  description: 'Práticas de automação, engenharia de qualidade e CI/CD baseadas em código e evidências reais.',
  base: '/qa-playbook/',
  lang: 'pt-BR',
  cleanUrls: true,
  lastUpdated: true,

  themeConfig: {
    siteTitle: 'QA Playbook',
    nav: [
      { text: 'Início', link: '/' },
      { text: 'Playbook', link: '/docs/01-estrategia-por-camada' },
      { text: 'Projetos de Referência', link: 'https://github.com/maikonfcosta' }
    ],

    sidebar: [
      {
        text: 'Fundamentos & Estratégia',
        items: [
          { text: '1. Estratégia por Camada', link: '/docs/01-estrategia-por-camada' },
          { text: '2. Testes Determinísticos', link: '/docs/02-testes-deterministicos' },
          { text: '3. Bug Report de Duas Camadas', link: '/docs/03-bug-report-duas-camadas' },
          { text: '4. Defeito vs. Dívida Técnica', link: '/docs/04-defeito-vs-divida' }
        ]
      },
      {
        text: 'Pipeline & Automação',
        items: [
          { text: '5. Política de Flaky Tests', link: '/docs/05-politica-flaky' },
          { text: '6. Triagem Determinística no CI', link: '/docs/06-triagem-ci' },
          { text: '7. IA no Pipeline: Limites & Uso', link: '/docs/07-ia-no-pipeline' },
          { text: '8. Test Plan de 1 Página & ADR', link: '/docs/08-test-plan-e-adr' }
        ]
      },
      {
        text: 'Templates & Snippets Reais',
        items: [
          { text: 'Template: Test Plan de 1 Página', link: '/docs/templates/test-plan-template' },
          { text: 'Template: ADR para QA', link: '/docs/templates/adr-template' },
          { text: 'Snippets: Workflows de CI & Sanitização', link: '/docs/templates/ci-workflows-snippets' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/maikonfcosta/qa-playbook' },
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/maikonfcosta/' }
    ],

    footer: {
      message: 'Engenharia de Qualidade baseada em evidências reais.',
      copyright: 'Copyright © 2026 Maikon Costa'
    },

    docFooter: {
      prev: 'Página anterior',
      next: 'Próxima página'
    },

    darkModeSwitchLabel: 'Tema',
    lightModeSwitchTitle: 'Mudar para modo claro',
    darkModeSwitchTitle: 'Mudar para modo escuro',
    sidebarMenuLabel: 'Menu',
    returnToTopLabel: 'Voltar ao topo'
  }
})

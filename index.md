---
layout: home

hero:
  name: "QA Playbook"
  text: "Práticas de Engenharia de Qualidade"
  tagline: "Sem teoria vazia. Guia prático de automação, pipelines e qualidade ancorado em código e evidências reais."
  actions:
    - theme: brand
      text: Começar a Leitura
      link: /docs/01-estrategia-por-camada
    - theme: alt
      text: Repositórios de Referência
      link: https://github.com/maikonfcosta

features:
  - title: Estratégia por Camada
    details: Pirâmide vs. troféu na prática. Por que o padrão é unitário/integração e como o ring @critical reduz o tempo de feedback em PRs.
  - title: Testes Determinísticos
    details: Isolamento real de massa e testes que passam tanto no dia 1 quanto no dia 30 sem depender de estado prévio do banco.
  - title: Triagem e Automação de CI
    details: Classificação determinística de falhas de pipeline (defeito vs. infra vs. drift) e limites de onde a IA auxilia sem assumir gates.
---

## Sobre este Playbook

Este playbook reúne decisões arquiteturais, padrões de código e critérios de qualidade aplicados no dia a dia por **Maikon Costa**.

Todo capítulo é fundamentado em dados e repositórios reais:
- **[Playwright Reference Suite](https://github.com/maikonfcosta/playwright-reference-suite)**: Suíte E2E/API sobre o Conduit com 17 testes críticos em ~10s e suíte completa noturna.
- **[Failure Classifier](https://github.com/maikonfcosta/failure-classifier)**: Classificação automática e determinística de falhas em execuções de CI.
- **[AI CI Triage](https://github.com/maikonfcosta/ai-ci-triage)**: Diagnóstico consultivo de logs de falha utilizando LLM via Groq, mantendo o gate estritamente determinístico.

# QA Playbook · Engenharia de Qualidade Moderna

> Playbook prático de engenharia de qualidade com padrões, heurísticas e arquiteturas comprovadas por código real e pipelines automatizados.

[![Deploy to GitHub Pages](https://github.com/maikonfcosta/qa-playbook/actions/workflows/deploy.yml/badge.svg)](https://github.com/maikonfcosta/qa-playbook/actions/workflows/deploy.yml)
[![VitePress](https://img.shields.io/badge/docs-VitePress-4ECDC4?logo=vite)](https://vitepress.dev/)
[![Status](https://img.shields.io/badge/status-active-success)]()

---

## 🎯 Sobre o Projeto

O **QA Playbook** é o quarto projeto do portfólio de engenharia de qualidade (P4). Reúne e consolida as decisões arquiteturais, políticas de teste e padrões aplicados nos projetos práticos anteriores:

- **[P1 · playwright-reference-suite](https://github.com/maikonfcosta/playwright-reference-suite):** Suíte de referência Playwright com fixtures limpas, isolamento por storageState e prevenção de falsos verdes com `toBeHidden()`.
- **[P2 · failure-classifier](https://github.com/maikonfcosta/failure-classifier):** GitHub Action composta em Python para classificação determinística de falhas (Ambiente vs Test Drift vs Bug de Produto) com 100% de precisão no benchmark.
- **[P3 · ai-ci-triage](https://github.com/maikonfcosta/ai-ci-triage):** GitHub Action em TypeScript que utiliza LLMs ultrarrápidos (Groq) para triagem consultiva de falhas em PRs sem afetar gates determinísticos.

---

## 📚 Capítulos do Playbook

1. **Estratégia por Camada:** Quando usar Unitário, Integração ou E2E (Trophy > Pyramid).
2. **Testes Determinísticos:** Controle estrito de estado, mock de borda e storageState.
3. **Bug Report em Duas Camadas:** Tradução simultânea entre Impacto de Negócio e Detalhe Técnico.
4. **Classificação de Achado:** Defeito real (Bug/Defect) vs Débito de Engenharia (Tech Story).
5. **Política de Flaky Tests:** Tolerância zero, quarentena explícita com `test.fixme` e prazo máximo de 1 sprint.
6. **Triagem Determinística no CI:** Classificação automatizada de falhas antes de gastar tempo de dev.
7. **IA no Pipeline:** Diretrizes para uso consultivo de LLMs com isolamento total dos gates de merge.
8. **Test Plan de 1 Página & ADR:** Documentação ágil de escopo, matriz de risco em rings (`@critical` / `@full`) e registros de decisão técnica.

---

## 🚀 Como Executar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run docs:dev

# Compilar para produção (validação estática com zero links quebrados)
npm run docs:build

# Pré-visualizar a compilação de produção
npm run docs:preview
```

---

## 👤 Autor

**Maikon Costa**  
QA Tech Lead / Senior QA  
Stack: Python · TypeScript · Playwright · Azure DevOps · CI/CD  
GitHub: [@maikonfcosta](https://github.com/maikonfcosta)

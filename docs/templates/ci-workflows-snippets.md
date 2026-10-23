# Snippets Reais de CI/CD: Triagem Determinística & IA Consultiva

Este guia reúne os trechos de configuração e código prontos para uso em esteiras do GitHub Actions baseados nos projetos de referência **P2 (`failure-classifier`)** e **P3 (`ai-ci-triage`)**.

---

## 1. Pipeline com Triagem Determinística (P2: `failure-classifier`)

Adicione esta etapa logo após a execução dos testes no seu workflow do GitHub Actions. Ela roda mesmo se os testes falharem (`if: always()`) e publica um sumário claro no build.

```yaml
name: E2E Playwright Suite

on:
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps chromium

      - name: Run Playwright Tests (Ring Critical)
        id: playwright_tests
        run: npx playwright test --grep @critical
        continue-on-error: true

      # Classificação Determinística sem IA (P2)
      - name: Run Deterministic Failure Classifier
        if: steps.playwright_tests.outcome == 'failure'
        uses: maikonfcosta/failure-classifier@v1
        with:
          report-path: test-results/results.json
          app-url: https://homolog.suaempresa.com.br
          fail-on: product_bug # Bloqueia apenas se for bug real de produto
```

---

## 2. Pipeline com IA Consultiva de Triagem (P3: `ai-ci-triage`)

A Action roda apenas em caso de falha, higieniza os logs e envia um comentário explicativo no PR sem tomar decisões de merge.

```yaml
      # Triagem Consultiva via LLM ultrarrápido (P3)
      - name: Consultative AI Failure Triage
        if: steps.playwright_tests.outcome == 'failure'
        uses: maikonfcosta/ai-ci-triage@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          groq-api-key: ${{ secrets.GROQ_API_KEY }}
          model: openai/gpt-oss-120b
          report-path: test-results/results.json
          max-retries: 2
```

---

## 3. Função de Higienização de Segredos (Sanitization)

Snippet extraído de `ai-ci-triage/src/sanitize.ts` demonstrando como evitar vazamento de credenciais nos prompts enviados para LLMs:

```typescript
// sanitize.ts — Remove tokens, senhas e chaves privadas antes de enviar ao modelo
export function sanitizeLog(rawLog: string): string {
  return rawLog
    // Bearer tokens e JWTs
    .replace(/Bearer\s+[A-Za-z0-9\-_\.]+/gi, 'Bearer [REDACTED_JWT]')
    // Senhas em query strings ou JSON
    .replace(/(password|token|secret|apiKey)["']?\s*[:=]\s*["']?[^"'\s&]+/gi, '$1=[REDACTED]')
    // Chaves privadas PEM
    .replace(/-----BEGIN[A-Z\s]+PRIVATE KEY-----[\s\S]+?-----END[A-Z\s]+PRIVATE KEY-----/g, '[REDACTED_PRIVATE_KEY]')
    // GUIDs de sessões sensíveis se aplicável
    .replace(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi, '[REDACTED_UUID]');
}
```

---

## 4. Tabela de Padrões Regex do Classificador (P2)

Snippet de regras determinísticas em Python extraído de `failure-classifier/src/rules.py`:

```python
# rules.py — Classificação determinística sem IA
import re

PATTERNS = {
    "environment_failure": [
        re.compile(r"ECONNREFUSED", re.IGNORECASE),
        re.compile(r"502\s+Bad\s+Gateway", re.IGNORECASE),
        re.compile(r"504\s+Gateway\s+Timeout", re.IGNORECASE),
        re.compile(r"net::ERR_CONNECTION_TIMED_OUT", re.IGNORECASE),
        re.compile(r"getaddrinfo\s+ENOTFOUND", re.IGNORECASE),
    ],
    "test_drift": [
        re.compile(r"Timeout\s+\d+ms\s+exceeded.*waiting\s+for\s+locator", re.IGNORECASE),
        re.compile(r"ElementHandle.*is\s+not\s+visible", re.IGNORECASE),
        re.compile(r"strict\s+mode\s+violation.*resolved\s+to\s+\d+\s+elements", re.IGNORECASE),
    ],
    "product_bug": [
        re.compile(r"expect\(received\)\.toBe\(expected\)", re.IGNORECASE),
        re.compile(r"HTTP\s+500\s+Internal\s+Server\s+Error", re.IGNORECASE),
        re.compile(r"TypeError:.*cannot\s+read\s+properties\s+of\s+undefined", re.IGNORECASE),
    ]
}

def classify(error_text: str) -> str:
    for category, regex_list in PATTERNS.items():
        if any(regex.search(error_text) for regex in regex_list):
            return category
    return "unknown"
```

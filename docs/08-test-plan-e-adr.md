# 8. Test Plan de 1 Página & ADR (Registro de Decisão Técnica)

> "Documento de teste de 40 páginas ninguém lê nem atualiza. Plano de 1 página vira contrato vivo de engenharia."

A documentação ágil em engenharia de qualidade deve ser curta, focada em risco e fácil de manter junto ao código no Git.

---

## 1. O Test Plan de 1 Página

Em vez de planos burocráticos, todo projeto adota um plano de uma página contendo estritamente o necessário:

```markdown
# Test Plan — [Nome da Feature / Módulo]

### 1. Objetivo & Escopo
- O que está sendo testado e por que esta funcionalidade existe.
- O que explicitamente NÃO está no escopo desta entrega.

### 2. Matriz de Riscos & Rings
- **@critical (Push / PR):** até 5 cenários vitais que barram o build em < 30s.
- **@full (Noturno / Regressivo):** cenários de borda, variações de dados e navegadores adicionais.

### 3. Estratégia por Camada
- Cenários cobertos em testes unitários (regras de cálculo).
- Cenários cobertos em testes de API/Integração (contrato, DTO, autenticação).
- Cenários cobertos em E2E (jornada de tela crítica).

### 4. Massa de Teste & Isolamento
- Origem dos dados: factories dinâmicas sem dependência de dados legados do banco.

### 5. Critérios de Pronto (Definition of Done)
- [ ] Pipeline CI verde.
- [ ] 0 falhas intermitentes (flakiness).
- [ ] Evidência de execução anexada ao card.
```

👉 **[Ver Template Completo de Test Plan de 1 Página](./templates/test-plan-template.md)** com matriz de riscos e estratégia de massa.

---

## 2. Architecture Decision Records (ADR) para QA

Quando uma decisão técnica relevante é tomada (ex.: escolher Groq vs OpenAI, usar Vitest em vez de Jest, ou adotar sharding no Playwright), essa decisão deve ser documentada em um arquivo ADR curto dentro do repositório (`docs/adr/`):

```markdown
# ADR 001: Adoção do Groq para Triagem de Logs no CI

### Contexto
Precisamos de inferência ultrarrápida (< 3 segundos) para analisar logs de falhas sem travar o tempo de feedback do desenvolvedor no PR.

### Decisão
Utilizar a API da Groq com o modelo `openai/gpt-oss-120b` via chamadas HTTP nativas no Node 24.

### Consequências
- **Positivas:** Tempo médio de resposta de ~1.8s; suporte a Structured Outputs nativo.
- **Negativas:** Limite de taxa (rate limit) de requisições por minuto no tier gratuito exige espaçamento na suíte de avaliação.
```

👉 **[Ver Template Estruturado de ADR para QA](./templates/adr-template.md)** com tabela de prós/contras e mitigação de riscos.


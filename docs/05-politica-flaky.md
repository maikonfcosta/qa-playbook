# 5. Política de Flaky Tests: Tolerância Zero a Testes Fantasma

> "Teste intermitente que roda 3 vezes até passar não é resiliente: é um gerador de falsos verdes."

Um teste que passa e falha sem qualquer alteração no código é um dos piores venenos para a esteira de engenharia. O time aprende a ignorar builds vermelhos e, eventualmente, um bug crítico de produção passa despercebido no meio do ruído.

---

## 1. O Exemplo Real do `toBeHidden()` (Caso P1)

No desenvolvimento do **[playwright-reference-suite](https://github.com/maikonfcosta/playwright-reference-suite)**, identificamos uma clássica condição de corrida com asserções negativas:

```typescript
// PERIGOSO / FALSO POSITIVO:
// Se o elemento ainda não foi criado no DOM, toBeHidden() passa imediatamente!
await expect(page.locator('.loading-spinner')).toBeHidden();
```

**O que acontecia:**
O teste verificava se a mensagem de carregamento havia sumido. Mas se o teste rodava rápido demais, ele checava o DOM **antes** de a requisição começar — ou seja, o spinner ainda nem tinha sido renderizado. O teste passava dizendo que "o carregamento terminou", quando na verdade ele sequer havia começado.

### Como corrigir:
Garanta o estado anterior antes de verificar o desaparecimento:

```typescript
// CORRETO: espera a resposta da API explicitamente antes de aferir a tela
const responsePromise = page.waitForResponse('/api/articles');
await page.goto('/');
await responsePromise;

// Agora sim a asserção é confiável
await expect(page.locator('.loading-spinner')).toBeHidden();
```

---

## 2. As 3 Regras de Destino para Testes Flaky

Testes instáveis nunca devem ficar em "limbo" ou com `test.skip` infinito:

| Cenário de Flakiness | Ação Imediata Obrigatória |
|---|---|
| Causa raiz identificada no código ou teste | Corrigir no mesmo Pull Request. |
| Causa raiz não identificada imediatamente | Marcar com `test.fixme` + criar Tech Story com prazo máximo de 1 sprint. |
| Dependência de infraestrutura/sandbox de parceiro instável | Marcar com `test.fixme` + criar chamado no time responsável pelo ambiente. |

**Invariante:** Nunca deletar um teste instável sem documentar a causa. `test.skip` sem work item associado é débito técnico mascarado.

# 9. Métricas, KPIs de Efetividade & Matriz de Risco

> "O objetivo do QA não é encontrar o maior número possível de bugs: é reduzir o risco de negócio e garantir que a esteira de entrega continue rápida e previsível."

Métricas superficiais (ex: quantidade bruta de casos de teste escritos ou total de bugs abertos) geram incentivos perversos. Engenharia de qualidade séria mede **eficácia, escape e velocidade de feedback**.

---

## 1. KPIs Canônicos de Engenharia de Qualidade

Tabela de metas e fontes de verdade utilizadas no dia a dia:

| KPI | O que mede | Meta / Alvo | Fonte de Dados |
|---|---|---|---|
| **Escape Rate** | Percentual de bugs que escaparam para produção | Tendência de queda sprint a sprint | Tag `found-in:prod` no backlog |
| **Patch Coverage** | Cobertura de testes sobre linhas NOVAS do PR | ≥ 80% do diff novo | SonarCloud / Vitest / Coverlet |
| **Flaky Rate** | Frequência de testes que falham e passam no retry | ≤ 2% das execuções | Retries do Playwright / GitHub Actions |
| **Regressão Coberta** | Bugs Alta/Crítica com teste automatizado no PR | 100% dos cards fechados | Tag `regression-covered` |
| **Mutation Score** | Capacidade dos testes de detectar mutações no código | ≥ 60 em domínios críticos | Stryker / Mutmut (cron noturno) |
| **Feedback no PR** | Tempo do pipeline bloqueante de testes | < 3 minutos | GitHub Actions Workflow summary |

---

## 2. A Fórmula Real do Escape Rate

O Escape Rate avalia a barreira de homologação e automação:

- **Fórmula:** `Bugs com found-in:prod` ÷ `Total de Bugs (found-in:prod + found-in:homolog)` por sprint.

### Regras obrigatórias:
1. **Contar pela tag de origem, nunca pelo tipo do item:** Um `Bug` encontrado durante a homologação (ex: feature sem vínculo direto) recebe `found-in:homolog` e entra no denominador como bug pego antes de subir.
2. **Sem tag, não há métrica:** Todo defeito cadastrado exige obrigatoriamente `found-in:prod` ou `found-in:homolog`.

### Query de Auditoria (Azure DevOps WIQL / Jira JQL):
```sql
SELECT [System.Id], [System.Title], [System.Tags]
FROM WorkItems
WHERE [System.WorkItemType] IN ('Bug', 'Defect')
  AND [System.CreatedDate] >= @Today - 30
  AND [System.Tags] CONTAINS 'found-in:'
```

---

## 3. Matriz de Riscos por Rings de Execução

Nem todo teste deve rodar em todo commit. Distribuir os testes por **Rings de Risco** garante feedback quase instantâneo no Pull Request sem comprometer a segurança da entrega:

```
                            [ PULL REQUEST / COMMIT ]
                                        │
                                        ▼
                             Ring @critical (< 30s)
                       Caminhos vitais + Smoke Tests
                                        │
                         (Aprovado e feito Merge)
                                        │
                                        ▼
                            Ring @extended (< 3 min)
                     Validações de borda, regras de negócio
                                        │
                           (Pipeline Noturno / Cron)
                                        │
                                        ▼
                              Ring @full (< 15 min)
                Multi-browser, concorrência, migrações de dados
```

### Critérios de Enquadramento por Ring:

- **Ring `@critical` (Bloqueante no PR):**
  - Autenticação e sessão básica.
  - O fluxo transacional mais importante do sistema (ex: checkout, envio de ordem).
  - Execução paralela sem sleeps, mockando terceiros instáveis.
- **Ring `@extended` (Deploy em Homolog / Merge Develop):**
  - Validações de formulário completas.
  - Respostas HTTP 400, 401, 403, 422 e 500.
  - Testes de componentes isolados.
- **Ring `@full` (Regressão Noturna):**
  - Matriz completa de navegadores (Chromium, Firefox, WebKit e Mobile Viewports).
  - Testes com grandes massas de dados.
  - Testes de concorrência e idempotência.

---

## 4. Testes de Mutação (Mutation Testing)

Medir apenas a cobertura de linhas (Line Coverage) cria uma falsa sensação de segurança: um teste que executa 100 linhas mas não tem asserções relevantes atinge 100% de cobertura.

O teste de mutação introduz pequenas alterações deliberadas no código compilado (mutantes):
- Troca `>` por `>=`.
- Troca `+` por `-`.
- Altera retornos booleanos de `true` para `false`.

Se a suíte de testes continuar passando com o mutante ativo, o mutante **sobreviveu** — indicando um teste frágil. Se o teste quebrar, o mutante foi **morto**.

```bash
# Executando teste de mutação no pipeline noturno com Stryker
npx stryker run
```

Alvo: **Mutation Score ≥ 60%** nos domínios críticos do sistema.

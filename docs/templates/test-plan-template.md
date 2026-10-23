# Template: Test Plan de 1 Página

Este template é o modelo padrão para documentação viva de qualidade por funcionalidade ou iniciativa. Mantenha em no máximo uma página A4 (~40-60 linhas) versionado no repositório em `docs/test-plans/TP-[ID]-[nome].md`.

---

```markdown
# Test Plan — [ID] [Nome da Funcionalidade / Épico]

**Data:** DD/MMM/YYYY | **Versão:** 1.0  
**Autor:** [Nome / QA Lead] | **Tech Lead / Dev:** [Nome]  
**Work Item / Épico:** #[ID-ADO-ou-Jira]

---

### 1. Objetivo & Escopo
- **Por que estamos construindo:** [1-2 linhas sobre a dor do cliente ou objetivo de negócio resolvido].
- **O que está no escopo:**
  - Fluxo A: [Ex: Criação e validação do recurso via API e tela].
  - Fluxo B: [Ex: Tratamento de erro 422 para payload inválido].
- **O que NÃO está no escopo desta entrega (Out of Scope):**
  - [Ex: Suporte a moedas secundárias (previsto para onda 2)].
  - [Ex: Migração retroativa de dados legados].

---

### 2. Matriz de Riscos & Rings de Execução
Critério de corte para pipelines e esteiras de teste:

| Ring | Frequência | Tempo Alvo | Escopo / Cenários |
|---|---|---|---|
| **@critical** | Todo PR / Push | < 30s | Caminho feliz vital + autenticação básica (até 5 testes) |
| **@extended** | Merge na `develop` | < 3 min | Variações de formulário, validações de boundary, HTTP 4xx/5xx |
| **@full** | Noturno / Regressivo | < 15 min | Matriz de navegadores (Mobile + Desktop), concorrência e carga leve |

---

### 3. Estratégia por Camada (Test Trophy)

- **Unitário (Jest / Vitest / xUnit):**
  - Regras de cálculo puras, máscaras, validação de formato e parsing de DTO.
  - Cobertura alvo: ≥ 80% do diff no PR (`patch coverage`).
- **Integração / Contrato (Supertest / WireMock / Pact):**
  - Contratos de rotas REST, persistência em banco local (Testcontainers) e headers de autenticação.
- **E2E / UI (Playwright):**
  - Apenas as jornadas críticas do usuário do início ao fim (login -> ação principal -> confirmação).
  - Isolamento estrito de estado via `storageState` reutilizável.

---

### 4. Gestão de Massa de Teste
- **Estratégia:** Factories dinâmicas com identificador único (`test-${Date.now()}`).
- **Isolamento:** Nenhum teste depende de dados pré-existentes de outros testes.
- **Cleanup:** Exclusão de dados via chamada de API na fixture de teardown.

---

### 5. Critérios de Pronto (Definition of Done de Qualidade)
- [ ] 100% dos testes do ring `@critical` passando no pipeline do PR.
- [ ] Zero flaky tests (testes instáveis colocados em `test.fixme` com card associado).
- [ ] Relatório de execução e evidências anexadas ao work item.
- [ ] Regressivo automatizado commitado no mesmo PR para qualquer bug corrigido (`regression-covered`).
```

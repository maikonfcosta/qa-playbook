# Template: Architecture Decision Record (ADR) para QA

Use este template para registrar decisões técnicas arquiteturais de qualidade que afetam a esteira, ferramentas, frameworks de teste ou estratégias de mock. Salve em `docs/adr/ADR-[NUMERO]-[titulo-kebab-case].md`.

---

```markdown
# ADR [Número]: [Título Curto e Imperativo]

- **Status:** [Proposto | Aceito | Rejeitado | Obsoleto | Substituído por ADR-XXX]
- **Data:** DD/MMM/YYYY
- **Decisores:** [QA Lead, Tech Lead, Arquiteto]
- **Contexto Técnico:** [Link para issue, PR ou épico]

---

### 1. Contexto & Problema
[Descreva o problema de engenharia que motivou a decisão. Evite opiniões; foque em métricas, limitações de ferramentas atuais ou novas restrições de negócio/performance.]

*Exemplo: "Os testes E2E executados sequencialmente levam 28 minutos no pipeline de PR, estourando o SLA de feedback de 5 minutos da equipe."*

---

### 2. Opções Avaliadas

| Opção | Prós | Contras | Custo / Complexidade |
|---|---|---|---|
| **Opção A:** [Ex: Sharding nativo do Playwright no GitHub Actions em 4 runners] | Paralelismo real, tempo cai para ~7min, sem dependência externa | Consome 4x minutos de runner da organização | Baixo |
| **Opção B:** [Ex: Migrar 70% dos testes E2E para testes de integração com Testcontainers] | Feedback em < 2min, sem dependência de navegador | Exige refatorar a suíte existente ao longo de 2 sprints | Médio |
| **Opção C:** [Ex: Manter como está e rodar apenas na master] | Sem esforço inicial | Deixa passar bugs graves para a branch principal | Alto (risco) |

---

### 3. Decisão
[Declaração clara e direta da alternativa escolhida e o porquê.]

*Exemplo: "Decidimos adotar a **Opção A** imediatamente para destravar a esteira atual, associada a uma meta de longo prazo de aplicar a Opção B para novas features."*

---

### 4. Consequências

#### Positivas (Ganhos esperados)
- Redução do tempo de execução no PR de 28min para ~7.5min.
- Isolamento de falhas por shard no Job Summary do CI.

#### Negativas / Trade-offs aceitos
- Aumento no consumo de minutos do GitHub Actions.
- Necessidade de artefato unificado de relatório (merge-reports do Playwright).

#### Riscos Mitigados
- Elimina timeouts de 30 minutos em runners compartilhados.
```

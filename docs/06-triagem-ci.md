# 6. Triagem Determinística no CI: Pipeline Vermelho Nem Sempre é Bug

> "Quando um pipeline falha, 80% do tempo gasto pela equipe não é corrigindo o código: é investigando se a falha é do ambiente, do teste ou do produto."

Bloquear o merge de uma funcionalidade urgente porque o gateway de sandbox de terceiros caiu gera atrito e desconfiança na esteira de CI/CD.

---

## 1. O Problema da Classificação Manual

Sem um classificador, todo build vermelho exige que um engenheiro abra os logs do runner, role 2.000 linhas de stack trace e deduza o que aconteceu:
- *"O banco de homologação reiniciou?"*
- *"O seletor mudou porque o designer trocou a classe?"*
- *"Ou realmente quebrou uma regra de negócio?"*

---

## 2. A Abordagem Determinística (Caso P2: `failure-classifier`)

No projeto **[failure-classifier](https://github.com/maikonfcosta/failure-classifier)**, desenvolvemos uma GitHub Action composta em Python que classifica automaticamente a causa da falha sem depender de modelos de IA caros ou estocásticos.

A classificação baseia-se em padrões determinísticos de saída:

```
                            Falha detectada no Playwright
                                         │
                 ┌───────────────────────┴───────────────────────┐
                 ▼                                               ▼
         Erro de Rede / Timeout                          Seletor ausente
      (ECONNREFUSED, 502, 504, etc.)                             │
                 │                               ┌───────────────┴───────────────┐
                 ▼                               ▼                               ▼
       FALHA DE AMBIENTE                 App respondendo 200            App fora do ar
    (infraestrutura instável)                    │                               │
                                                 ▼                               ▼
                                          DRIFT DE TESTE                 FALHA DE AMBIENTE
                                       (teste desatualizado)           (queda de serviço)
```

### Resultados Medidos no Repositório de Referência:
- Avaliação com **22 falhas reais e provocadas** do P1.
- **100% de acerto** nas classificações de alta confiança.
- Saída formatada direto no **Job Summary do GitHub Actions** com tabela resumida e códigos de saída configuráveis para o gate.

👉 **[Ver Workflow YAML e Padrões Regex do Classificador](./templates/ci-workflows-snippets.md#1-pipeline-com-triagem-determinística-p2-failure-classifier)**.


# 4. Defeito vs. Dívida Técnica: O Filtro da Triagem

> "Classificar dívida técnica como bug corrompe métricas vitais como o Escape Rate. Chamar bug de melhoria esconde falhas de engenharia."

Abrir tudo como "Bug" no board de desenvolvimento é um erro comum que infla artificialmente o número de defeitos, estressa o time e distorce os indicadores reais de eficácia do QA.

---

## 1. As 3 Perguntas do Filtro de Triagem

Antes de cadastrar qualquer card no Azure DevOps ou Jira, faça as seguintes perguntas nesta ordem:

```
1. Existe comportamento observável errado para o usuário?
   ├── NÃO ────────► Tech Story (Dívida Técnica / Débito)
   └── SIM ────────► Pergunta 2

2. Esse comportamento viola algo formalmente declarado?
   (Critério de Aceite, Contrato de API, Regra de Negócio, Padrão de Segurança)
   ├── NÃO ────────► Tech Story ou US de Melhoria de Produto
   └── SIM ────────► É DEFEITO! Ir para Pergunta 3

3. Tem ligação com a US/Bug em teste agora?
   ├── SIM (em homolog) ──► Defect (filho da US/Bug testada)
   └── NÃO (ou em prod) ──► Bug (top-level, para a próxima sprint)
```

---

## 2. Matriz de Classificação Rápida

| Achado no Sistema | Classificação Correta | Por que não é o outro |
|---|---|---|
| Cálculo de juros divergindo da regra de negócio | **Bug / Defect** | Viola requisito e causa impacto financeiro direto. |
| Falha de autorização (usuário A acessa recurso de B) | **Bug / Defect** | Violação grave de segurança (OWASP / RF-03). Dispensa critério formal prévio. |
| Teste automatizado quebrou por mudança de classe CSS, mas o produto funciona | **Tech Story** | O produto está correto; o defeito é da automação de teste. |
| Falta de cobertura de testes em endpoint legado | **Tech Story** | Débito técnico interno, sem falha observável no momento. |
| Interface lenta, mas sem SLO ou tempo de resposta definido na especificação | **Tech Story** | Melhoria técnica/performance. Só vira bug se violar um SLO contratado. |
| Teste intermitente (flaky) | **Política de Flaky** | **Nunca** abrir Bug de flaky. Aplica-se `test.fixme` e task técnica com prazo. |

---

## 3. O Impacto no Escape Rate

O **Escape Rate** mede a eficácia real do QA:

$$\text{Escape Rate} = \frac{\text{Bugs pegos em Produção}}{\text{Total de Bugs (Homologação + Produção)}} \times 100$$

Se o time classifica alterações visuais não especificadas ou seletores de teste desatualizados como "Bug", o denominador da métrica é poluído, impossibilitando uma leitura honesta da qualidade que chega ao cliente final.

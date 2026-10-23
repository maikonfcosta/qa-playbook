# 1. Estratégia por Camada: Pirâmide vs. Troféu na Prática

> "Subir de camada exige justificativa. O teste padrão é unitário."

Muitas equipes caem na armadilha de automatizar quase tudo na camada de interface gráfica (E2E). O resultado quase sempre é o mesmo: suítes lentas, pipelines de 40 minutos e uma taxa de falhas intermitentes (flakiness) que mina a confiança do time.

---

## 1. O Critério de Escolha da Camada

A escolha da camada de teste parte do que o critério de aceite (Acceptance Criteria) declara:

| O que o requisito define | Camada obrigatória | Por que nesta camada |
|---|---|---|
| Cálculo, regra de negócio pura, validação de campo, máquina de estado | **Unitário** | Execução em milissegundos, isolamento completo de I/O e dependências externas. |
| Contrato HTTP, permissões (RF-03), integração com banco/outbox, mensageria | **Integração / API** | Valida a integração entre módulos sem carregar a latência e a fragilidade do navegador. |
| Jornada crítica de usuário, checkout, autenticação multi-etapa | **E2E (Interface)** | Valida que as peças funcionam juntas pelo ponto de vista de quem usa a aplicação. |

---

## 2. A Estratégia de Rings por Risco

Em vez de rodar 100% dos testes E2E em todo pull request, a suíte é dividida em anéis de execução (**rings**) baseados em risco:

```
┌──────────────────────────────────────────────┐
│  @critical ring                              │
│  • 17 testes de fumaça e fluxos vitais       │
│  • Execução em ~10 segundos                  │
│  • Roda em TODO push e Pull Request          │
└──────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────┐
│  @full ring (Regressivo Completo)            │
│  • 59 testes completos                       │
│  • 3 navegadores (Chromium, Firefox, WebKit) │
│  • Sharding em 3 máquinas (agendado/noturno) │
└──────────────────────────────────────────────┘
```

### Evidência no Repositório de Referência:
Na suíte do **[playwright-reference-suite](https://github.com/maikonfcosta/playwright-reference-suite)**:
- O ring `@critical` valida login via API, criação de artigos e contratos vitais em **apenas 10 segundos**.
- Se um PR quebra o fluxo básico, o feedback chega para o desenvolvedor em menos de 1 minuto no GitHub Actions.

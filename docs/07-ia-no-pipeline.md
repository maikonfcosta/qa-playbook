# 7. IA no Pipeline: Onde Ela Ajuda e Onde Não Pode Decidir

> "Duas regras invioláveis da esteira moderna: gate bloqueante nunca depende de LLM · LLM nunca decide merge."

O uso de modelos de linguagem (LLM) no ciclo de desenvolvimento traz ganhos expressivos de produtividade na análise de erros, mas seu papel deve ser estritamente **consultivo**, nunca decisor de portas de qualidade (gates).

---

## 1. O Papel Consultivo (Caso P3: `ai-ci-triage`)

No projeto **[ai-ci-triage](https://github.com/maikonfcosta/ai-ci-triage)**, construímos uma GitHub Action em TypeScript que roda quando testes do Playwright falham.

### O que a IA faz:
1. Recebe o relatório estruturado de falhas (JSON), o diff do Pull Request e o trecho de código onde a asserção quebrou.
2. Faz o saneamento prévio de credenciais e segredos (redaction) para nunca vazar tokens no prompt.
3. Consulta o modelo (Groq / Llama / GPT) e publica **um comentário consultivo** no PR apontando:
   - Causa provável.
   - Arquivo e linha suspeitos.
   - Nível de confiança da análise.

### O que a IA NUNCA faz:
- Não decide se o PR pode ser mergeado.
- Não fecha nem reabre PRs.
- Não substitui os gates determinísticos de testes ou linters.

---

## 2. A Realidade das Métricas: Por que Publicar a Verdade

Muitas ferramentas de mercado prometem "100% de precisão mágica com IA". No P3 medimos os resultados honestamente sobre 10 casos reais:

- **5/10:** acerto exato de arquivo na avaliação original cega.
- **6/10:** acerto após normalização de títulos truncados.
- **10/10:** acerto considerando que o arquivo de origem estava contido no patch.

Além disso, documentamos os casos em que o modelo alucinou — como culpar seletores de tela quando a falha real era uma expiração de sessão. Expor as limitações reais é o que separa engenharia de qualidade séria de marketing vazio de IA.

👉 **[Ver Workflow YAML da Action e Função TypeScript de Higienização de Segredos](./templates/ci-workflows-snippets.md#2-pipeline-com-ia-consultiva-de-triagem-p3-ai-ci-triage)**.


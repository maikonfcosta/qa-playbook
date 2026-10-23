# 2. Testes Determinísticos: O Teste que Passa no Dia 1 e Quebra no Dia 30

> "Se o seu teste depende do que já estava no banco antes de ele rodar, ele não é um teste: é uma aposta."

Um dos motivos mais comuns para testes quebrarem sem que haja nenhum bug no código da aplicação é a **dependência de estado pré-existente**. O teste roda isolado na máquina de quem desenvolve e passa. Roda na esteira após dezenas de outros testes e quebra.

---

## 1. O Sintoma Real (Caso P1 Conduit)

No projeto **[playwright-reference-suite](https://github.com/maikonfcosta/playwright-reference-suite)**, encontramos um exemplo perfeito ao validar a listagem de tags do Conduit:

### Antes (Frágil / Não-determinístico):
O teste criava um artigo com uma tag nova e fazia um `GET /api/tags` esperando que a tag criada estivesse na lista:

```typescript
// FRÁGIL: assume que a tag recém-criada estará na lista global
const tags = await (await api.request.get('/api/tags')).json();
expect(tags.tags).toContain(uniqueTag);
```

**Por que quebrava:**
O endpoint `/api/tags` do backend só retorna as **10 tags mais populares** do sistema. No banco zerado (dia 1), havia poucas tags e a asserção passava. Depois de dezenas de execuções com tags novas (dia 30), a tag do teste não entrava no top 10 e a asserção falhava com falso positivo.

---

## 2. A Solução Determinística

O teste deve olhar **estritamente para o que ele mesmo criou**, usando endpoints que filtram a massa pelo identificador exclusivo do teste:

```typescript
// DETERMINÍSTICO: consulta artigos filtrando pela tag gerada no teste
// Not /api/tags: returns only top 10 most used tags, so new tags won't appear.
const byTag = await (await api.request.get('/api/articles', {
  params: { tag: uniqueTag }
})).json();

expect(byTag.articles.map((a) => a.slug)).toEqual([article.slug]);
```

---

## 3. Regras para Testes 100% Determinísticos

1. **Fábricas com identificadores únicos:** todo e-mail, título de artigo ou usuário usa timestamps e sufixos aleatórios (`user_${Date.now()}_${randomId}`).
2. **Setup via API:** criar a massa necessária via chamadas HTTP diretas antes de abrir o navegador. Nunca gaste tempo preenchendo 10 telas de cadastro manualmente se uma chamada de API monta o estado em 50ms.
3. **Sem dependência de ordem:** nenhum teste deve assumir que outro rodou antes dele para deixar dados prontos no banco.

# 3. Bug Report de Duas Camadas: O Chamado que o Dev Corrige de Primeira

> "Quem só lê a camada técnica não entende a prioridade. Quem só lê a camada de negócio não sabe onde corrigir."

Relatar um bug não é apenas copiar um dump de erro e colar no board. Um bom relatório elimina reuniões de alinhamento, adivinhação de payload e cards devolvidos com a mensagem *"não reproduz aqui"*.

---

## 1. O Conceito das Duas Camadas

Todo chamado de qualidade deve responder simultaneamente a dois públicos distintos:

| Camada | Pergunta central | Público | O que deve conter |
|---|---|---|---|
| **Negócio** | Quem é afetado, em que momento da jornada e qual o impacto real? | PM, Tech Lead, Gerência | Perfil do usuário (trader, cliente final, backoffice), jornada exata, impacto financeiro ou de prazo. |
| **Técnica** | Onde exatamente quebrou no código e sob que condição? | Desenvolvedor que vai corrigir | Endpoint, status HTTP, trecho de log (3–5 linhas úteis) e dados de entrada exatos. |

---

## 2. Estrutura Padrão de um Card

```markdown
### [Componente] Comportamento incorreto — resumo em uma linha

**Ambiente:** Homologação (Commit `a1b2c3d` / Build #1024)

#### 1. Camada de Negócio
- **Quem sente:** Usuário autenticado navegando na página principal.
- **Jornada:** Abertura do feed global de artigos.
- **Impacto:** O usuário fica bloqueado aguardando o carregamento eterno da página, sem feedback de indisponibilidade.

#### 2. Camada Técnica
- **Serviço / Rota:** Frontend Web chamando `GET /api/articles`.
- **Condição:** API de artigos retorna HTTP 500 (falha de banco ou gateway).
- **Falha no código:** O componente frontend não possui tratamento de `catch` para remover a flag `isLoading`.

#### 3. Passos para Reproduzir
1. Acessar a aplicação com usuário válido logado.
2. Interceptar a requisição para `/api/articles` e retornar `status: 500`.
3. Navegar para a rota `/` (Global Feed).

#### 4. Esperado vs. Observado
- **Esperado:** Exibir banner ou alerta amigável de erro informando a indisponibilidade momentânea do feed.
- **Observado:** Feed congela exibindo o texto "Loading articles..." indefinidamente.

#### 5. Evidência Viva
- Teste de reprodução automatizado no Playwright: `tests/e2e/resilience.spec.ts:18` (marcado com `test.fail()`).
- [Link do Run no CI](#)
```

---

## 3. O que NUNCA fazer em um Bug Report

1. **Stack trace cru sem contexto:** colar 100 linhas de stack trace sem explicar os passos que dispararam a chamada.
2. **Título genérico:** *"Tela quebrou"*, *"Erro no salvar"*, *"Botão não funciona"*.
3. **Falta de dados de entrada:** dizer *"tentei logar e deu erro"* sem especificar o tipo de usuário, os dados digitados ou a permissão da conta.

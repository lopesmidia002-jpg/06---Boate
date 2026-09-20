---
description: Regras para atualização obrigatória de documentação, controle de passos e mensagens de commit
trigger: always_on
---

# Workflow e Regras de Entrega

1. **Atualização Contínua de Documentação e Contexto:**
   - Ao término de cada feature, correção de bug ou melhoria, atualizar obrigatoriamente:
     - `DOCUMENTACAO.md`
     - `PASSOS.md`
     - `CONTEXTO.md`

2. **Fluxo Estrito de Passos (`PASSOS.md`):**
   - Marcar com `[x]` as etapas concluídas.
   - Aguardar autorização do usuário antes de iniciar a etapa subsequente.

3. **Mensagem de Commit Padronizada:**
   - Ao concluir qualquer alteração de código, gerar sempre um modelo de commit no padrão Conventional Commits ao final da resposta.

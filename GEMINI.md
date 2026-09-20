# Regras do Projeto e Fluxo de Desenvolvimento

## 1. Atualização Obrigatória de Arquivos de Controle
Ao final de cada funcionalidade (`feat`), correção de bug (`fix`), refatoração (`refactor`) ou alteração estrutural, os seguintes arquivos **DEVEM** ser atualizados obrigatoriamente:
- `DOCUMENTACAO.md`
- `PASSOS.md`
- `CONTEXTO.md`

## 2. Controle de Passos e Prioridades (`PASSOS.md`)
- Dividir o projeto em passos claros e ordenados por prioridade.
- Utilizar caixas de seleção (`[ ]` para pendente e `[x]` para concluído).
- Marcar automaticamente como `[x]` as tarefas finalizadas.
- **REGRA OBRIGATÓRIA:** NUNCA avançar para o próximo passo sem a solicitação/aprovação expressa do usuário ("só inicie o próximo passo quando eu pedir").

## 3. Sugestão de Mensagem para Commit
Sempre ao final de cada implementação, correção ou entrega de etapa, gerar e exibir ao final da resposta um bloco com a sugestão de commit no padrão *Conventional Commits* (ex: `feat: ...`, `fix: ...`, `docs: ...`, `style: ...`).

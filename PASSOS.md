# Roteiro de Desenvolvimento (Passos por Ordem de Prioridade)

> [!IMPORTANT]
> **Regra de Execução:** Cada passo abaixo será executado de forma sequencial e controlada. Um novo passo só será iniciado mediante a solicitação explícita do usuário. Ao final de cada passo concluído, este arquivo, bem como `DOCUMENTACAO.md` e `CONTEXTO.md`, serão atualizados e um modelo de commit será fornecido.

---

## Tabela de Progresso

- [x] **Passo 1 (Prioridade Crítica - Concluído):** Configuração inicial do ambiente, definição das diretrizes de workflow e criação dos documentos estruturais do projeto:
  - [x] Criação do [PROMPT.md](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/PROMPT.md) com base no kit de templates da Boate/Nightclub.
  - [x] Criação do [CONTEXTO.md](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/CONTEXTO.md) com visão geral, arquitetura e stack.
  - [x] Criação do [DOCUMENTACAO.md](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/DOCUMENTACAO.md) com especificações técnicas e guia do sistema de design.
  - [x] Criação do [PASSOS.md](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/PASSOS.md) com a fila de prioridades e controle de execução.
  - [x] Salvamento das diretrizes nas regras do projeto ([GEMINI.md](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/GEMINI.md), [AGENTS.md](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/AGENTS.md) e [.agents/rules/workflow.md](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/.agents/rules/workflow.md)).

- [x] **Passo 2 (Prioridade Alta - Concluído):** Estruturação dos arquivos base e Design System Neon:
  - [x] Criação da estrutura de pastas `css/` e `js/`.
  - [x] Implementação de [css/style.css](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/css/style.css) (Tokens Neon ciano `#00deff` e magenta `#f92056`, Glassmorphism, Google Fonts, animações e responsividade).
  - [x] Criação da estrutura base do [index.html](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/index.html) com tags SEO, Open Graph e semântica acessível.
  - [x] Criação do script [js/main.js](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/js/main.js) com timer em tempo real, header scroll e player mini.

- [x] **Passo 3 (Prioridade Alta - Concluído):** Header, Barra de Navegação e Mini Player de Áudio:
  - [x] Menu mobile off-canvas completo com animação suave, backdrop escurecido e botão de fechamento.
  - [x] Criação de [js/audio-player.js](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/js/audio-player.js) com motor de áudio sintético Web Audio API (batidas eletrônicas, sintetizadores, navegação de faixas e equalizador dinâmico).
  - [x] Efeito de pulsação e realce neon nos links e controles da barra superior.

- [x] **Passo 4 (Prioridade Alta - Concluído):** Hero Section Avançada & Efeitos Visuais Dinâmicos:
  - [x] Efeito de partículas de luz neon animadas e varredura de lasers no fundo via Canvas HTML5.
  - [x] Implementação dos 3 cards de destaque rápido do template oficial ("Top DJ", "Never Close" e "Trending Drink") com gradientes e transições neon.
  - [x] Card de contagem regressiva refinado e botões de ação triplos integrados.

- [x] **Passo 5 (Prioridade Média-Alta - Concluído):** Seção "Quem Somos / Experiência Noturna" e Contadores Estatísticos:
  - [x] Apresentação da estrutura da boate ("Let's Chill Together" / "Who We Are").
  - [x] Card split "Chill Sets & Top Trend Music" com seletor de faixas integrado ao motor de áudio e botão pulsante "Ouvir Live Set".
  - [x] Contadores numéricos animados com `IntersectionObserver` (+500 Eventos, +120 DJs Internacionais, +50k Público Fiel, +15 Anos de Liderança).

- [x] **Passo 6 (Prioridade Média-Alta - Concluído):** Módulo de Programação & Eventos (Club Events):
  - [x] Grade de festas e eventos com cards visuais de alta qualidade (flyers, data, horário, lineup e status de ingressos).
  - [x] Sistema de filtros dinâmicos por gênero musical via [js/events.js](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/js/events.js) (Todos, EDM & Festival, Deep House & Tech, Hip-Hop & Trap, Sunset & VIP).
  - [x] Modal interativo de compra de ingressos com seletor de setor (Pista, Área VIP, Camarote), contador de quantidade, cálculo de total em tempo real e formulário de checkout com feedback de confirmação.

- [x] **Passo 7 (Prioridade Média - Concluído):** Módulo de DJs Residentes e Convidados (DJ Team):
  - [x] Apresentação do time de DJs (*DJ Alexia Frost*, *Marcus Vortex*, *DJ Kendrick Blaze*, *Luna Ray*).
  - [x] Cards com efeito de iluminação neon, molduras dinâmicas, badges de estilo musical e mini biografias.
  - [x] Botões de play rápido para ouvir prévia do set do DJ no player e links para redes sociais.

- [x] **Passo 8 (Prioridade Média - Concluído):** Cardápio Interativo de Bebidas e Gastronomia (Drinks & Menu):
  - [x] Abas de navegação em 4 categorias: Coquetéis Autorais, Garrafas & Champagnes Premium, Shots & Combos e Gastronomia Noturna.
  - [x] Cards com fotos de alta qualidade, lista de ingredientes, volumes, preços em destaque e badges de exclusividade.
  - [x] Alternância dinâmica de abas via script no [js/main.js](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/js/main.js).

- [x] **Passo 9 (Prioridade Média - Concluído):** Seção de Serviços e Camarotes Exclusivos:
  - [x] Apresentação dos 4 serviços VIP (Camarotes & Lounges Privativos, Comemoração de Aniversário, Eventos Corporativos e Valet Parking).
  - [x] Tabela comparativa de setores (*Pista Premium*, *Mezanino VIP* e *Camarote Black & Gold*) com benefícios e valores.

- [x] **Passo 10 (Prioridade Média-Alta - Concluído):** Sistema Interativo de Reserva de Mesas e Camarotes (Reservation):
  - [x] Formulário inteligente com seletor de setor em tempo real via [js/reservation.js](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/js/reservation.js) (*Mesa Bistrô*, *Lounge Mezanino*, *Camarote Black & Gold*).
  - [x] Seletor de data, horário de chegada, número de convidados e combo de boas-vindas.
  - [x] Cálculo dinâmico do valor estimado e emissão de voucher VIP numerado com suporte para impressão.

---

- [x] **Passo 11 (Prioridade Baixa-Média - Concluído):** Galeria da Noite (Club Gallery) e Depoimentos:
  - [x] Feed de fotos da balada com lightbox em tela cheia via modal de imagem (`js/gallery.js`).
  - [x] Filtros por estilo musical e áreas da casa (*Main Stage*, *VIP Lounge*, *DJs*, *Drinks*).
  - [x] Grid de depoimentos e avaliações de frequentadores e artistas convidados.

- [x] **Passo 12 (Prioridade Média - Concluído):** Rodapé, FAQ Sanfonado, Dress Code e Popup VIP:
  - [x] FAQ com acordeão retrátil (Dress code, documentos obrigatórios, formas de pagamento, valet, aniversários).
  - [x] Informações de localização, horário de funcionamento e formulário de contato com feedback.
  - [x] Modal popup para cadastro em Lista VIP com desconto na entrada e botão flutuante.
  - [x] Rodapé completo de 4 colunas com newsletter, horários detalhados e links institucionais.

- [x] **Passo 13 (Prioridade Final - Concluído):** Testes de Responsividade, Otimização e Validação Completa:
  - [x] Teste em resoluções Mobile, Tablet e Desktop.
  - [x] Validação de acessibilidade, performance e refinamento das animações neon.
  - [x] Verificação e correção de integridade de URLs de imagens CDN (resolução do erro 404 na foto de DJ Alexia Frost em index.html, gallery.js e style.css).
  - [x] Entrega final do website completo com todos os módulos integrados e funcionais.

- [x] **Passo 14 (Prioridade Crítica - Concluído):** Painel Administrativo CMS Fullstack & Containerização Docker:
  - [x] Criação do backend Node.js/Express (`server.js`) com autenticação JWT e criptografia bcrypt (`admin` / `admin123`).
  - [x] Endpoints REST para gerenciamento dinâmico de textos, fotos, cores da paleta neon, logotipo, festas/eventos, DJs, cardápio, galeria e contatos.
  - [x] Sistema de upload multipart (`/api/upload`) via Multer para imagens e logos com preview instantâneo.
  - [x] Interface do Painel Administrativo (`/admin`) com visual Glassmorphism Neon Dark, abas SPA, tabelas interativas de reservas/lista VIP e exportação CSV.
  - [x] Sincronização dinâmica no frontend (`js/content-loader.js` e integração no `js/reservation.js`).
  - [x] Containerização completa com `Dockerfile`, `docker-compose.yml`, `.dockerignore` e volumes persistentes (`./data` e `./uploads`).

- [x] **Passo 15 (Prioridade Final - Concluído):** Documentação de Entrega, Scripts 1-Clique e Manual do Administrador:
  - [x] Criação do [README.md](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/README.md) completo com guia de execução Docker, credenciais, visão geral das 12 abas do CMS e documentação da REST API.
  - [x] Criação de scripts batch de inicialização rápida com 1 clique para Windows (`iniciar-docker.bat` e `iniciar-local.bat`).
  - [x] Inclusão dos botões de ação **`ADMIN`** (outline ciano neon) e **`RESERVAR VIP`** (filled rosa neon) dispostos lado a lado com mesmo alinhamento, altura (42px) e proporções no cabeçalho.
  - [x] Sincronização 100% dinâmica em tempo real no [js/content-loader.js](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/js/content-loader.js) para todos os textos, fotos, cores da paleta neon, logotipo, eventos, DJs, cardápio, contatos e WhatsApp.
  - [x] Validação e encerramento de todas as etapas com 100% de sucesso.






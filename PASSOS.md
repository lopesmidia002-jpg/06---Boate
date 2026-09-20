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
  - [x] Remoção do botão de Admin do cabeçalho público para manter o design focado no visitante, preservando acesso ao painel via `/admin` e no rodapé.
  - [x] Implementação de backdrop com efeito de desfoque/embaçamento (`backdrop-filter: blur(14px)`) no fundo do painel administrativo ao abrir o menu lateral no modo mobile.
  - [x] Otimização visual e responsiva completa do botão flutuante **Lista VIP 20% OFF** no modo mobile (`.floating-vip-btn`) posicionado estrategicamente no **lado direito inferior** (`right: 14px / 12px / 8px`), com gradiente de alto contraste, coroa dourada brilhante, animação pulsante suave `@keyframes vipFloatPulse`, enquadramento `max-width: calc(100vw - 24px)` e margens seguras anti-corte em todas as telas (de 320px a 640px+).
  - [x] Otimização visual e responsiva completa dos **Banners de Apresentação / Destaque** (`.hero-features-bar` / `.features-grid` / `.feature-card`): transição inteligente de 3 colunas para coluna única empilhada e compacta em tablets e celulares, alturas proporcionais (`110px / 98px`), tipografia escalonada e enquadramento 100% visível sem cortes laterais.
  - [x] Sincronização 100% dinâmica em tempo real no [js/content-loader.js](file:///c:/Users/Nilto/OneDrive/Documentos/Projeto%20imobiliario/06%20-%20Boate/js/content-loader.js) para todos os textos, fotos, cores da paleta neon, logotipo, eventos, DJs, cardápio, contatos e WhatsApp.

- [x] **Passo 16 (Prioridade Crítica - Concluído):** Correção Completa do Enquadramento e Viewport de Todas as Páginas no Modo Mobile:
  - [x] Eliminação de vazamento horizontal (`overflow-x: hidden`) em `html`, `body`, `#main-content`, `section`, containers e modais.
  - [x] Correção do card de contagem regressiva da Hero (`.hero-countdown` / `.countdown-grid` / `.countdown-item`), eliminando a largura mínima estática que forçava o zoom out e o espaço vazio preto lateral no mobile.
  - [x] Adequação do cabeçalho (`.site-header`), logotipo e botão VIP (`.header-actions .btn`) para distribuição harmônica sem empurrar a viewport em telas de 320px a 768px.
  - [x] Redimensionamento e contenção dinâmica do Canvas de partículas (`hero-particles-canvas`) limitado estritamente à largura do cliente (`document.documentElement.clientWidth`).
  - [x] Ajuste de todas as seções (Hero, Sobre, Eventos, DJs, Cardápio, Serviços, Reservas, Galeria, Depoimentos, Contato/FAQ e Rodapé) com largura estrita de 100%, preenchimentos proporcionais de 16px/12px e empilhamento limpo de grids.
  - [x] Otimização e enquadramento total do Painel Administrativo CMS (`admin/admin.css`) para dispositivos móveis com proteção de viewport.

- [x] **Passo 17 (Prioridade Final - Concluído):** Remoção do Botão/Link "Painel Admin CMS" do Menu Mobile Off-Canvas:
  - [x] Remoção do item de link `<li><a href="/admin" ...>Painel Admin CMS</a></li>` da gaveta de navegação mobile (`#mobile-menu-drawer`), mantendo a navegação móvel 100% voltada à experiência do visitante e cliente da boate.

- [x] **Passo 18 (Prioridade Crítica - Concluído):** Correção do Enquadramento dos Popups e Organização dos Cards/Valores de Preço no Mobile:
  - [x] Correção do badge flutuante "Mais Escolhido" (`.popular-ribbon`) no card Mezanino VIP (`.tier-box.popular`), eliminando a sobreposição com o texto de categoria (`.tier-tag` "Experiência VIP") com padding e margens superiores adequadas.
  - [x] Otimização e alinhamento tipográfico de todos os valores de preço (`.tier-val`, `.tier-pricing`, `.total-amount`, `.price-value`), garantindo legibilidade e proporção em celulares (`1.35rem / 1.25rem / 1.15rem`).
  - [x] Ajuste e enquadramento ergonômico dos modais popup (Lista VIP e Ingressos) com centralização automática, bordas arredondadas e tamanhos proporcionais.






# Contexto do Projeto: Website Boate / Nightclub & Lounge

## 1. Origem e Visão do Projeto
Este projeto tem como base o conjunto de 20 templates e módulos JSON extraídos de projetos de casas noturnas e lounges de alta performance (*Los Angeles Club / Light Your Night*), localizados na pasta `06 - Boate`.

O objetivo é transformar essa estrutura de design em uma aplicação web moderna, rica, responsiva e independente, com foco em:
- Experiência visual noturna de alto impacto (Dark Mode + Efeitos Neon Glow Ciano `#00deff` e Rosa Magenta `#f92056`).
- Engajamento do público com agenda de eventos, lista de DJs, cardápio de drinks e reserva VIP.
- Facilidade de navegação e compatibilidade total com dispositivos móveis e desktops.

---

## 2. Dados e Módulos Base dos Templates JSON
Os templates originais contemplam os seguintes componentes chave:
1. **Home Nightclub (1 a 8):** Variações de Hero, seções de destaque "Who we are", "Top trend music" (com integração de áudio), "DJ Team", "Trending Drinks" e contadores estatísticos.
2. **Eventos (Club Event 1 e 2):** Divulgação de festas, datas, horários, atrações e compra de ingressos.
3. **DJs (DJ Listing 1 e 2):** Perfil dos DJs residentes e atrações convidadas com links de mídia.
4. **Sobre (About 1 e 2):** Estrutura da casa, tecnologia de som/luz e história.
5. **Serviços (Services 1 e 2):** Camarotes corporativos, aniversários, garçom VIP, valet e reservas exclusivas.
6. **Cardápio (Menu 1 e 2):** Lista de coquetéis, destilados, combos e aperitivos.
7. **Reservas (Reservation):** Sistema de solicitação e agendamento de mesas e camarotes.
8. **Contato (Contact Us):** Informações de acesso, mapas, FAQ e formulário de contato.
9. **Popup VIP (Popup):** Modal de cadastro em lista VIP e newsletters promocionais.

---

## 3. Stack Tecnológica e Arquitetura Implementada
- **Frontend Core:** HTML5 Semântico (`index.html`) com otimização SEO e Open Graph.
- **Estilização:** CSS3 Vanilla (`css/style.css`) estruturado em Tokens Customizados, Paleta Neon Glow, Glassmorphism, Feature Cards, Seção About, Grid de Estatísticas, Módulo de Eventos, DJ Team, Cardápio com Abas, Serviços VIP e Sistema de Reservas com Voucher.
- **Backend & CMS Fullstack:** Node.js, Express, JWT, bcryptjs, Multer para uploads de arquivos, banco de dados JSON atômico persistente (`data/content.json`, `data/reservations.json`, `data/guestlist.json`, `data/contacts.json`, `data/users.json`).
- **Containerização & Deploy:** Docker (`Dockerfile` multi-layer leve `node:18-alpine`), `docker-compose.yml` com volumes persistentes para dados e mídia, healthcheck e zero dependências externas.
- **Interatividade, Áudio e Gráficos:**
  - `admin/admin.js` & `admin/admin.css`: Painel Administrativo CMS SPA com Glassmorphism Neon Dark, seletores dinâmicos de cores, upload drag & drop, tabelas interativas e gestão completa de conteúdo.
  - `js/content-loader.js`: Hidratação dinâmica em tempo real do frontend com dados do CMS.
  - `js/reservation.js`: Sistema de cálculo em tempo real de reservas VIP, combos e emissão de voucher numerado integrado com o backend.
  - `js/main.js`: Canvas de partículas de laser neon, contadores com `IntersectionObserver`, abas do cardápio, ações de DJs, drawer mobile e timer.
  - `js/events.js`: Filtros dinâmicos por estilo musical e modal interativo de checkout/venda de ingressos.
  - `js/audio-player.js`: Sintetizador rítmico nativo Web Audio API, playlist e equalizador em tempo real.
- **Ícones e Tipografia:** Google Fonts (`Poppins`, `Montserrat`, `Yellowtail`) e FontAwesome 6.5.1.

---

## 4. Estado Atual do Desenvolvimento
- **Todos os Passos (1 a 15) Concluídos com Sucesso:**
  - `Passos 1 a 3`: Configuração, Design System Neon (#00deff e #f92056), Menu mobile off-canvas e Motor Web Audio API nativo.
  - `Passos 4 a 6`: Hero com canvas de partículas e lasers, Seção About & Contadores animados, Grade de Eventos com modal de checkout de ingressos.
  - `Passos 7 a 9`: Apresentação dos DJs Residentes, Cardápio em 4 abas e Serviços VIP / Tabela comparativa de setores.
  - `Passos 10 a 12`: Sistema interativo de reserva com emissão de voucher, Galeria de fotos com lightbox em tela cheia, Depoimentos, FAQ Sanfonado, Contato, Popup VIP 20% OFF e Rodapé rico de 4 colunas.
  - `Passo 13`: Validação completa de responsividade (Mobile/Tablet/Desktop), acessibilidade, integridade de todas as URLs de imagens CDN e otimização de performance.
  - `Passo 14`: Painel Administrativo CMS Completo (`/admin`), Autenticação JWT (`admin`/`admin123`), Uploads de fotos/logos, Customização dinâmica em tempo real de textos, fotos, cores e dados, e Containerização 100% pronta em Docker & Docker Compose.
  - `Passo 15`: Documentação de Entrega, Manual do Administrador (`README.md`), scripts de inicialização com 1 clique (`iniciar-docker.bat`, `iniciar-local.bat`), cabeçalho público limpo com foco no visitante, botão flutuante **Lista VIP 20% OFF** posicionado no lado direito inferior com proteção anti-corte, modal popup da Lista VIP 100% responsivo e centralizado no mobile com efeito de fundo totalmente embaçado/desfocado (`backdrop-filter: blur(16px)` / `filter: blur(14px)`) até o fechamento do modal, backdrop com efeito de blur no menu mobile do admin e sincronização 100% dinâmica em tempo real no site público para todas as alterações de textos, fotos, cores, logotipo e contatos.

---

## 5. Regras de Negócio e Diretrizes de Desenvolvimento
- **Atualização Contínua:** Ao final de cada funcionalidade ou correção, atualizar obrigatoriamente `DOCUMENTACAO.md`, `PASSOS.md` e `CONTEXTO.md`.
- **Controle de Etapas:** As etapas estão definidas no `PASSOS.md`. Um novo passo só deve ser iniciado após a solicitação expressa do usuário.
- **Mensagem de Commit:** Ao finalizar qualquer etapa ou ajuste, deve ser fornecido o texto do commit no padrão *Conventional Commits*.

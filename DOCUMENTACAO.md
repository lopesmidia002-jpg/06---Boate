# Documentação Técnica: Website Boate / Nightclub & Lounge Premium

## 1. Visão Geral da Arquitetura
A aplicação é construída com tecnologias web nativas e modernas (HTML5 semântico, CSS3 com variáveis customizadas e sistema de design Neon Dark, e JavaScript Vanilla estruturado), priorizando performance ultra-rápida, estética visual noturna com iluminação neon e compatibilidade total entre navegadores e dispositivos móveis.

---

## 2. Estrutura de Diretórios e Arquivos Implementados
```
06 - Boate/
├── .agents/
│   └── rules/
│       └── workflow.md            # Regras automatizadas de workflow para o agente
├── 06 - Boate/                    # Templates originais em formato JSON (Elementor)
│   ├── Boate (1).json a (20).json
├── css/
│   └── style.css                  # Design System neon, drawer, hero, about, eventos, djs, menu, serviços, reservas, galeria & depoimentos
├── js/
│   ├── audio-player.js            # Motor de áudio Web Audio API sintetizado e controle de playlist
│   ├── events.js                  # Lógica de filtros por estilo musical e modal de checkout de ingressos
│   ├── reservation.js             # Lógica de reserva inteligente de mesas/camarotes e emissão de voucher VIP
│   ├── gallery.js                 # Filtros por categoria da galeria e lightbox em tela cheia com navegação
│   └── main.js                    # Partículas neon, contadores, dj preview, abas do cardápio, drawer, timer
├── index.html                     # Estrutura principal da aplicação web (HTML5 semântico e SEO)
├── PROMPT.md                      # Especificação completa dos requisitos
├── CONTEXTO.md                    # Histórico, stack e diretrizes de negócio
├── PASSOS.md                      # Roadmap e controle de execução por prioridades
├── DOCUMENTACAO.md                # Documentação técnica e arquitetural
├── GEMINI.md                      # Regras do workspace para o assistente
└── AGENTS.md                      # Diretrizes e restrições de operação
```

---

## 3. Sistema de Design (CSS Tokens)
### 3.1. Variáveis Principais (`:root` em `css/style.css`)
```css
:root {
  --bg-primary: #07080c;
  --bg-secondary: #0d0f17;
  --bg-tertiary: #131722;
  --bg-card: rgba(18, 22, 35, 0.72);
  --bg-card-hover: rgba(28, 34, 52, 0.85);
  --bg-glass: rgba(255, 255, 255, 0.04);
  --bg-glass-strong: rgba(255, 255, 255, 0.08);

  --neon-cyan: #00deff;
  --neon-cyan-hover: #40e8ff;
  --neon-cyan-glow: 0 0 15px rgba(0, 222, 255, 0.6), 0 0 35px rgba(0, 222, 255, 0.3);

  --neon-pink: #f92056;
  --neon-pink-hover: #ff4575;
  --neon-pink-glow: 0 0 15px rgba(249, 32, 86, 0.6), 0 0 35px rgba(249, 32, 86, 0.3);

  --text-main: #ffffff;
  --text-body: #e2e8f0;
  --text-muted: #94a3b8;
  --text-dim: #64748b;

  --border-glass: rgba(255, 255, 255, 0.08);
  --border-cyan: rgba(0, 222, 255, 0.35);
  --border-pink: rgba(249, 32, 86, 0.35);

  --gradient-neon: linear-gradient(135deg, #f92056 0%, #00deff 100%);
  --gradient-card: linear-gradient(145deg, rgba(22, 27, 44, 0.7) 0%, rgba(10, 13, 20, 0.9) 100%);

  --font-heading: 'Poppins', 'Montserrat', sans-serif;
  --font-body: 'Poppins', sans-serif;
  --font-accent: 'Yellowtail', cursive;
}
```

---

## 4. Componentes e Funcionalidades Implementados
1. **Seção de Contato, Informações & FAQ Sanfonado (Accordion):**
   - 6 perguntas frequentes com expansão/recolhimento suave (*Dress Code*, *Documentos Obrigatórios*, *Lista VIP*, *Formas de Pagamento*, *Valet Parking*, *Aniversários*).
   - 4 cards de acesso rápido (*Endereço*, *Horários*, *Concierge VIP WhatsApp*, *E-mail Oficial*).
   - Formulário de envio de mensagem com validação e feedback dinâmico.
2. **Botão Flutuante & Modal Popup Lista VIP (`#vip-popup-modal`):**
   - Botão flutuante animado no canto inferior direito ("Lista VIP 20% OFF") e disparo automático com timer de navegação.
   - Geração de código promocional instantâneo (*ex: `VIP-LAC-7821`*) e feedback de validação.
3. **Rodapé Completo de Alta Performance (Rich Footer):**
   - Grade em 4 colunas (*Marca & Social Pills*, *Explorar/Navegação Rápida*, *Horários de Funcionamento por dia*, *Newsletter VIP com feedback*).
   - Barra inferior com selo etário 18+, copyright e links regulamentares.
4. **Galeria da Noite (Club Gallery) & Lightbox Interativo (`js/gallery.js`):**
   - Grade com 8 fotos em alta definição dos principais momentos da casa (palco, lasers, camarotes, DJs e drinks).
   - Filtros por categoria com animações fluidas (*Todas as Fotos*, *Main Stage & Lasers*, *VIP Lounge*, *DJs & Shows*, *Drinks & Vibe*).
   - Modal Lightbox em tela cheia com navegação por botões (anterior/próximo/fechar), suporte a teclado (Esc, setas) e contador dinâmico de fotos.
5. **Seção de Depoimentos & Avaliações VIP (Testimonials):**
   - 3 depoimentos autênticos de membros VIP, DJs convidados e criadores de conteúdo.
   - Avaliações em 5 estrelas neon, selo de verificação ciano, fotos de perfil e citações destacadas.
6. **Sistema Interativo de Reserva VIP & Emissão de Voucher (`js/reservation.js`):**
   - Seleção de setor em tempo real (*Mesa Bistrô*, *Lounge Mezanino*, *Camarote Black & Gold*).
   - Data com valor padrão para a próxima noite de abertura e seleção de horário de chegada.
   - Seleção opcional de combos de boas-vindas com somatório e atualização instantânea do resumo financeiro.
   - Geração de código de voucher prioritário (*ex: `LAC-8942-VIP`*) e tela de confirmação com suporte a impressão.
7. **Seção de Serviços VIP & Tabela de Setores:**
   - 4 serviços VIP com checklists (*Camarotes*, *Aniversários*, *Corporativo*, *Valet*).
   - Tabela comparativa com benefícios de cada setor.
8. **Cardápio Interativo de Bebidas & Gastronomia (Drinks & Menu):**
   - 4 categorias em abas com transição suave (*Coquetéis Autorais*, *Garrafas & Champagnes*, *Shots & Combos*, *Gastronomia Noturna*).
9. **Módulo de DJs Residentes & Convidados (DJ Team / Vibe Makers):**
   - 4 perfis em destaque com molduras dinâmicas, links sociais e prévia de áudio conectada ao Web Audio Player.
10. **Módulo de Programação & Eventos (`js/events.js`):**
    - Grade com 6 festas e filtros dinâmicos por gênero musical com modal de compra de ingressos.
11. **Seção Quem Somos & Chill Sets com Contadores:**
    - Apresentação da casa com card split de áudio e contadores animados (`+500 Eventos`, `+120 DJs`, `+50k Público`, `+15 Anos`).
12. **Hero Section Avançada & Canvas de Partículas:**
    - Feixes de laser dinâmicos e partículas neon varrendo o fundo com contagem regressiva em tempo real.
13. **Top Bar & Mini Player Web Audio API (`js/audio-player.js`):**
    - Sintetizador rítmico nativo Web Audio API com playlist e equalizador.
15. **Painel Administrativo CMS Fullstack (`/admin`):**
    - Painel SPA com autenticação JWT e segurança bcryptjs (`admin` / `admin123`).
    - Personalização em tempo real de textos, fotos, cores da paleta neon (`#00deff` / `#f92056`), logotipos, eventos, lineup de DJs, cardápio de drinks, galeria de fotos, serviços VIP e contatos.
    - Sistema de upload de imagens multipart (`/api/upload`) via Multer.
    - Gerenciador de reservas de mesas e camarotes com alteração de status (`Pendente`, `Confirmado`, `Cancelado`) e exportação CSV.
    - Gerenciador de cadastros da Lista VIP e visualizador de mensagens do concierge.
    - **Menu Mobile com Backdrop Blur:** Ao abrir o menu lateral no painel administrativo em smartphones ou tablets, uma camada de fundo (`.sidebar-backdrop`) com efeito de desfoque/embaçamento (`backdrop-filter: blur(14px)`) escurece e embaça todo o conteúdo de trás, fechando o menu automaticamente ao tocar fora.
    - **Pontos de Acesso Integrados na UI:** Acesso reservado através da rota `/admin` e link no rodapé da página (`index.html`), mantendo o cabeçalho público focado e limpo para os clientes com o botão "Reservar VIP".
16. **Hidratador Dinâmico de Conteúdo (`js/content-loader.js`):**
    - Carregamento assíncrono de `/api/content` e injeção dinâmica de CSS variables no `:root`, títulos, logotipo/foto, contadores, cards rápidos, grade de eventos, DJs, cardápio de bebidas, valores de setores VIP, telefones, WhatsApp com link direto `wa.me`, e-mail e horários.
    - Envio em tempo real de solicitações de reserva e inscrições na lista VIP para a API REST.

---

## 5. Validação de Responsividade, Acessibilidade & Performance (Passos 13 e 14)
- **Breakpoints Responsivos Validados:**
  - `Desktop Grande (>= 1280px)`: Layout completo em 3/4 colunas com efeitos visuais e canvas imersivo.
  - `Desktop / Laptop (992px a 1279px)`: Adaptação de grids de 4 para 2 colunas com navegação compacta.
  - `Tablet (768px a 991px)`: Ativação do Menu Mobile Off-Canvas, recolhimento da barra de informações superior e refatoração de grids de eventos e galeria.
  - `Mobile / Smartphones (<= 640px e <= 480px)`: Ajuste automático de fontes com `clamp()`, layout em coluna única, alinhamento justificado à esquerda para botões de filtros e abas (`.gallery-filters`, `.events-filter-container`, `.menu-tabs-container`), banners de apresentação/destaque (`.hero-features-bar` / `.features-grid` / `.feature-card`) compactos e redimensionados para coluna única com alturas e títulos perfeitamente enquadrados sem aperto lateral, redimensionamento proporcional e compacto do botão "Reservar VIP" no header (`.header-actions .btn`) para harmonia estética com o logotipo e botão de menu hamburguer, botão flutuante **Lista VIP 20% OFF** (`.floating-vip-btn`) posicionado no canto inferior direito (`right: 14px / 12px / 8px`), com alto contraste, coroa dourada brilhante, animação pulsante suave `@keyframes vipFloatPulse`, limites de largura seguros `max-width: calc(100vw - 24px)` sem sobrepor o conteúdo ou ser cortado na borda da tela, modal de Lista VIP (`#vip-popup-modal` / `.vip-popup-card`) 100% responsivo e centralizado com paddings otimizados, formulários e botão de ação perfeitamente enquadrados, rolagem vertical suave sem cortes horizontais e camada de fundo com efeito de desfoque/embaçamento total (`backdrop-filter: blur(16px)` / `filter: blur(14px)`) que oculta e embaça todo o site até o fechamento do popup.
- **Otimização de Performance e Integridade de Mídia:**
  - Zero dependências de bibliotecas pesadas de terceiros no frontend (construção 100% Vanilla JS e CSS3 puro).
  - Canvas com renderização eficiente via `requestAnimationFrame` e suspensão de cálculos desnecessários fora de foco.
  - Web Audio API sintetizado sob demanda sem tráfego de arquivos MP3 pesados pela rede.
  - Imagens servidas via CDN com compressão adaptativa e carregamento fluido, validadas 100% sem links quebrados (404) em todos os componentes (DJs, Galeria e Backgrounds).
- **Acessibilidade e SEO:**
  - Semântica HTML5 estrita (`header`, `main`, `section`, `article`, `aside`, `footer`, `nav`).
  - Tags Open Graph, Twitter Cards e Meta Description completas.
  - Atributos `aria-label`, `aria-expanded`, `aria-hidden` em todos os modais, acordeões, botões e controladores de mídia.

---

## 6. Como Executar o Projeto

### Opção 1: Execução com Docker & Docker Compose (Recomendado)
Execute no terminal na raiz do projeto:
```bash
docker compose up -d --build
```
Ou no Windows, dê um duplo-clique no script:
- `iniciar-docker.bat`

Acesse no seu navegador:
- 🌐 **Site Público:** `http://localhost:3000`
- 🎛️ **Painel Administrativo CMS:** `http://localhost:3000/admin`
- 🔑 **Credenciais Padrão:** Usuário: `admin` | Senha: `admin123`

Para parar os containers:
```bash
docker compose down
```

### Opção 2: Execução Local com Node.js
```bash
npm install
npm start
```
Ou no Windows, dê um duplo-clique no script:
- `iniciar-local.bat`

Acesse `http://localhost:3000` e `http://localhost:3000/admin`.

---

## 7. Procedimento de Manutenção e Atualização
- Qualquer nova funcionalidade (`feat`) ou correção (`fix`) deve atualizar obrigatoriamente os 3 arquivos de documentação (`DOCUMENTACAO.md`, `CONTEXTO.md`, `PASSOS.md`).
- A cada conclusão de passo, o checklist em `PASSOS.md` deve ser marcado e aguardar aprovação do usuário para a próxima etapa.
- Toda resposta de conclusão deve conter o formato de commit padronizado.

---

## 8. Arquitetura de Enquadramento Mobile (Passo 16)
- **Contenção Estrita de Viewport:** `html` e `body` possuem `width: 100% !important`, `max-width: 100% !important` e `overflow-x: hidden !important`, com `box-sizing: border-box` global e `-webkit-text-size-adjust: 100%`.
- **Preenchimento Lateral Uniforme:** Classes `.container` e `.container-fluid` utilizam padding lateral proporcional (`16px` em tablets e celulares, `12px` em telas até 480px e `10px` em telas até 360px), eliminando completamente margens negativas e colunas pretas laterais vazias.
- **Hero & Contagem Regressiva:** O card `.hero-countdown` passa a utilizar `max-width: 100%` com `flex: 1 1 0` em cada `.countdown-item`, sem `min-width` rígido que antes forçava o zoom out horizontal do navegador mobile.
- **Canvas Contido:** O redimensionamento do canvas `#hero-particles-canvas` limita a largura máxima a `Math.min(parentWidth, document.documentElement.clientWidth || window.innerWidth)`.
- **Grids e Modais:** Todos os grids (`.features-grid`, `.showcase-grid`, `.stats-grid`, `.events-grid`, `.djs-grid`, `.menu-items-grid`, `.services-grid`, `.tiers-grid`, `.reservation-grid`, `.gallery-grid`, `.testimonials-grid`, `.contact-layout-grid`, `.footer-grid`) adaptam-se para 1 coluna com quebra de linha fluida em telas `<= 768px`.



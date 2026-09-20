# Especificação do Projeto: Website Nightclub & Lounge Premium (Boate)

## 1. Visão Geral
Desenvolver um website moderno, dinâmico e de altíssimo impacto visual para uma **Boate / Casa Noturna e Lounge VIP** (inspirado nos templates *Los Angeles Club / Light Your Night*). A aplicação deve transmitir energia, sofisticação e estilo através de estética dark mode com efeitos neon (ciano elétrico `#00deff` e magenta/rosa neon `#f92056`), tipografia marcante, micro-interações, efeitos sonoros/players de música e experiência imersiva de reservas.

---

## 2. Identidade Visual e Design System
- **Paleta de Cores:**
  - `Background Primário`: `#090a0f` (Dark profundo)
  - `Background Secundário / Cards`: `rgba(20, 22, 34, 0.75)` (Glassmorphism com blur)
  - `Acento Neon 1 (Ciano)`: `#00deff` (Glow: `0 0 15px rgba(0, 222, 255, 0.6)`)
  - `Acento Neon 2 (Rosa/Magenta)`: `#f92056` (Glow: `0 0 15px rgba(249, 32, 86, 0.6)`)
  - `Texto Principal`: `#ffffff` e `#f3f4f6`
  - `Texto Secundário`: `#9ca3af` e `#cbd5e1`
- **Tipografia:**
  - Títulos e Headers: `Poppins`, `Montserrat`, `Yellowtail` (para assinaturas e destaques cursivos)
  - Corpo: `Poppins`, `Inter`, sans-serif
- **Efeitos e UI:**
  - Glassmorphism com `backdrop-filter: blur(16px)`
  - Bordas com gradientes neon e sombras coloridas
  - Animações fluidas de hover, contadores numéricos animados e transições suaves

---

## 3. Funcionalidades e Páginas/Módulos Principais
1. **Header & Navegação:**
   - Logotipo neon animado
   - Menu responsivo com links rápidos (Home, Sobre, Eventos, DJs, Cardápio, Serviços, Reservas, Contato)
   - Botão de ação rápida "Reservar Mesa / VIP"
   - Mini player de áudio integrado com controle Play/Pause/Mute

2. **Hero Section (Home):**
   - Título de impacto: *"LIGHT YOUR NIGHT - LOS ANGELES CLUB"*
   - Efeito visual de luzes/partículas de balada
   - CTAs: "Comprar Ingressos", "Reservar Camarote", "Explorar Programação"
   - Contagem regressiva para a próxima grande festa

3. **Seção Quem Somos / A Experiência (About):**
   - Apresentação da casa noturna, sistemas de som de alta definição e iluminação a laser
   - Métricas de destaque (ex: 15+ Anos, 500+ Festas, 50k+ Clientes, 100+ DJs Internacionais)

4. **Lineup & Eventos (Club Events):**
   - Grade de eventos com datas, gêneros musicais (EDM, Deep House, Hip-Hop, Funk VIP)
   - Filtros por categoria/estilo musical
   - Modal de detalhes do evento e link direto para compra/reserva

5. **DJs Residentes & Convidados (DJ Listing):**
   - Cards dos DJs com fotos, gêneros, redes sociais e botão para ouvir preview do set

6. **Cardápio Interativo (Drinks & Gastronomia):**
   - Coquetéis autorais, Garrafas Premium, Champagnes, Porções Gourmet e Narguilé/Lounge
   - Filtros por categoria e detalhes de ingredientes

7. **Sistema de Reserva de Mesas e Camarotes VIP (Reservation):**
   - Formulário interativo com seleção de setor (Pista, Lounge, Mesa Bistrô, Camarote VIP Premium)
   - Seletor de data, horário e quantidade de convidados
   - Pacotes de garrafas/consumação
   - Feedback visual instantâneo e confirmação com modal

8. **Galeria da Noite (Club Gallery):**
   - Feed de fotos das últimas noites com lightbox interativo

9. **Depoimentos e Avaliações (Testimonials):**
   - Avaliações de frequentadores, artistas e celebridades com carrossel dinâmico

10. **Rodapé & Contato / Informações Úteis:**
    - Localização, Horário de Funcionamento, Dress Code, FAQ sanfonado (accordion), Newsletter e Redes Sociais

---

## 4. Requisitos Técnicos
- HTML5 semântico com tags SEO otimizadas
- CSS3 moderno e modular (Vanilla CSS, custom properties/tokens, animações CSS3, Flexbox/Grid)
- JavaScript Vanilla modular, leve, responsivo e sem dependências pesadas
- Totalmente responsivo (Desktop, Tablet, Mobile)
- Performance de carregamento rápida com otimização de renderização

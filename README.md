# 🍸 Los Angeles Club & VIP Lounge | Fullstack Web App & CMS

[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Express](https://img.shields.io/badge/Express-4.x-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![Web Audio API](https://img.shields.io/badge/Web_Audio-Synthesizer-00deff?style=for-the-badge)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Design System](https://img.shields.io/badge/Design_System-Neon_Glassmorphism-f92056?style=for-the-badge)](https://github.com/lopesmidia002-jpg/06---Boate)

> **Website Oficial e Painel Administrativo CMS da Casa Noturna e Lounge VIP mais exclusivo da noite.**

---

## 🌟 Visão Geral do Projeto

O **Los Angeles Club** é uma plataforma web fullstack completa, imersiva e de alta performance desenvolvida para casas noturnas, lounges e clubes de eventos. O projeto combina uma experiência pública visualmente impactante no estilo **Neon Dark Glassmorphism** (iluminação ciano `#00deff` e rosa magenta `#f92056`) com um **Painel Administrativo CMS** completo para gerenciamento de reservas, lista VIP, eventos, cardápio, fotos e identidade visual em tempo real.

---

## ✨ Principais Funcionalidades

### 🌐 Frontend Público
- 🎧 **Motor de Áudio Sintético Integrado:** Player de áudio com sintetizador de batidas eletrônicas via Web Audio API e equalizador dinâmico animado.
- ⚡ **Canvas de Partículas & Efeitos Laser:** Fundo animado interativo simulando canhões de luz laser e poeira estroboscópica.
- 🎟️ **Módulo de Eventos & Checkout de Ingressos:** Grade de festas com filtros por estilo musical, seleção de setores e cálculo em tempo real.
- 👑 **Sistema de Reserva de Camarotes & Mesas:** Formulário dinâmico com cálculo de consumação e emissão de Voucher VIP com QR code e impressão.
- 🍹 **Cardápio Interativo & Gastronomia:** Navegação por categorias (Coquetéis, Garrafas, Shots, Gastronomia Noturna) com fotos em alta definição.
- 👥 **Popup Lista VIP Flutuante:** Modal de captação de leads com cupom de 20% OFF e botão de acesso rápido responsivo.
- 📱 **Design 100% Responsivo:** Otimizado com perfeição para Mobile (320px a 640px), Tablets e Monitores Ultrawide sem cortes ou vazamentos horizontais.

### 🎛️ Painel Administrativo CMS (`/admin`)
- 📊 **Dashboard com Métricas em Tempo Real:** Total de reservas, cadastros na Lista VIP, festas ativas e mensagens.
- 🎨 **Personalização Visual Instantânea:** Seletores de cores neon (primária e secundária), upload de logotipo e slogan.
- 📅 **Gerenciamento de Eventos e DJs:** Cadastro, edição e remoção de festas com upload multipart de imagens.
- 🍸 **Controle do Cardápio & Bebidas:** Edição de itens, preços, descrições e fotos de produtos.
- 📋 **Gestão de Reservas e Exportação CSV:** Aprovação/cancelamento de reservas com download de planilhas.
- 🔐 **Autenticação Segura JWT:** Senhas criptografadas com `bcrypt` e proteção de rotas REST.

---

## 🚀 Como Executar o Projeto

### 🐳 1. Execução via Docker & Docker Compose (Recomendado)

Com o [Docker](https://www.docker.com/) instalado, execute na raiz do projeto:

```bash
docker compose up -d --build
```

- 🌐 **Site Público:** [http://localhost:3000](http://localhost:3000)
- 🎛️ **Painel Administrativo CMS:** [http://localhost:3000/admin](http://localhost:3000/admin)
- 🔑 **Usuário Administrador Padrão:** `admin`
- 🔒 **Senha Inicial:** `admin123`

Para parar os containers:
```bash
docker compose down
```

---

### 💻 2. Execução Local via Node.js

```bash
# 1. Instalar as dependências
npm install

# 2. Iniciar o servidor Express
npm start
```

---

### ⚡ 3. Inicialização Rápida no Windows (1-Clique)

O projeto conta com scripts executáveis de inicialização rápida na pasta raiz:
- `iniciar-docker.bat`: Constrói a imagem e sobe os containers Docker automaticamente.
- `iniciar-local.bat`: Instala dependências e inicia o servidor Node.js local.

---

## 🎛️ Módulos do Painel Administrativo CMS

| Módulo | Descrição das Funcionalidades |
| :--- | :--- |
| 📊 **Dashboard** | Métricas em tempo real de reservas, lista VIP, festas cadastradas e atalhos rápidos. |
| 🎨 **Identidade & Cores** | Seletores interativos de cores Neon (Ciano, Rosa), upload de logotipo, slogan e nome da casa. |
| 🏠 **Hero & Quem Somos** | Títulos de impacto com iluminação, contagem regressiva da próxima noite e contadores animados. |
| 📅 **Eventos & Festas** | Cadastro, edição e exclusão de festas com upload de flyer, gêneros musicais e lotes de ingressos. |
| 🎧 **Time de DJs** | Gerenciamento dos DJs residentes com upload de fotos, estilo musical e biografias. |
| 🍸 **Cardápio & Drinks** | Coquetéis autorais, garrafas, champagnes e combos com fotos, preços e volumes. |
| 👑 **Serviços VIP** | Tabela de setores, benefícios e valores para Mesas Bistrô, Mezanino e Camarotes. |
| 🖼️ **Galeria de Fotos** | Upload de fotos em alta resolução da pista e camarotes com exclusão rápida. |
| 📋 **Reservas VIP** | Visualização de solicitações recebidas em tempo real, alteração de status e exportação CSV. |
| 👥 **Lista VIP** | Gestão de cadastros de clientes com desconto promocional e exportação CSV. |
| 📞 **Contatos & Mensagens** | Endereço, telefones, WhatsApp Concierge, horários semanais e mensagens recebidas. |
| 🔐 **Segurança** | Alteração de usuário, nome de exibição e senha do administrador com criptografia bcrypt. |

---

## 📡 Endpoints da REST API

| Método | Endpoint | Protegido | Descrição |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/login` | Não | Autenticação do administrador e emissão de token JWT |
| `GET` | `/api/auth/me` | Sim | Validação da sessão ativa do administrador |
| `PUT` | `/api/auth/change-password` | Sim | Alteração de credenciais de acesso |
| `GET` | `/api/content` | Não | Recupera configurações e dados do site público |
| `PUT` | `/api/content` | Sim | Atualiza textos, cores, fotos e configurações |
| `POST` | `/api/upload` | Sim | Upload multipart de fotos e logotipos (Multer) |
| `GET` | `/api/reservations` | Sim | Lista todas as reservas recebidas |
| `POST` | `/api/reservations` | Não | Envio de solicitação de reserva pelo site |
| `PUT` | `/api/reservations/:id` | Sim | Atualiza o status de uma reserva |
| `GET` | `/api/guestlist` | Sim | Lista cadastros na Lista VIP |
| `POST` | `/api/guestlist` | Não | Inscrição na Lista VIP pelo popup |
| `GET` | `/api/contacts` | Sim | Lista mensagens de contato recebidas |
| `POST` | `/api/contacts` | Não | Envio de mensagem pelo formulário de contato |
| `GET` | `/api/stats` | Sim | Métricas em tempo real para o dashboard |

---

## 📂 Estrutura do Repositório

```
06 - Boate/
├── admin/                         # Painel Administrativo CMS (SPA)
│   ├── index.html                 # Interface e abas do CMS
│   ├── admin.css                  # Estilização Glassmorphism Dark Neon
│   └── admin.js                   # Lógica assíncrona e consumo da REST API
├── css/
│   └── style.css                  # Design System Neon e regras responsivas
├── data/                          # Armazenamento JSON persistente
│   ├── content.json               # Configurações dinâmicas e conteúdos
│   ├── reservations.json          # Registro de reservas
│   ├── guestlist.json             # Leads da Lista VIP
│   ├── contacts.json              # Mensagens de contato
│   └── users.json                 # Credenciais administrativas
├── js/
│   ├── audio-player.js            # Sintetizador Web Audio API e mini player
│   ├── content-loader.js          # Hidratação dinâmica do frontend via API
│   ├── events.js                  # Filtros de festas e modal de checkout
│   ├── gallery.js                 # Galeria e lightbox interativo
│   ├── main.js                    # Animações, drawer mobile e partículas laser
│   └── reservation.js             # Formulário de reservas e voucher VIP
├── uploads/                       # Armazenamento de uploads de mídia
├── Dockerfile                     # Imagem Docker otimizada (Node 18 Alpine)
├── docker-compose.yml             # Orquestração com volumes persistentes
├── iniciar-docker.bat             # Inicializador 1-clique Docker (Windows)
├── iniciar-local.bat              # Inicializador 1-clique Local (Windows)
├── server.js                      # Servidor Express com REST API, JWT e Multer
├── package.json                   # Dependências do projeto
├── DOCUMENTACAO.md                # Documentação técnica e arquitetural completa
├── CONTEXTO.md                    # Histórico e contexto de desenvolvimento
├── PASSOS.md                      # Roadmap de etapas e controle de progresso
└── README.md                      # Guia do projeto
```

---

## 🛡️ Licença

Projeto desenvolvido para o **Los Angeles Club & VIP Lounge**. Todos os direitos reservados.

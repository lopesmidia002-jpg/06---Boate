# 🍸 Los Angeles Club & VIP Lounge | Fullstack Web App & CMS

> **Website Oficial & Painel Administrativo CMS da Casa Noturna e Lounge VIP mais exclusivo da noite.**

---

## 🌟 Visão Geral do Projeto

O **Los Angeles Club** é uma aplicação web completa, rica e moderna, desenvolvida para proporcionar uma experiência noturna imersiva através de um **Design System Neon Dark Glassmorphism** (iluminação ciano `#00deff` e rosa magenta `#f92056`), combinada a um **Painel Administrativo CMS** para gestão em tempo real de conteúdos, reservas e mídias, **100% pronto para execução em Docker**.

---

## 🚀 Como Executar o Projeto

### 🐳 1. Execução Rápida via Docker & Docker Compose (Recomendado)

Certifique-se de ter o [Docker](https://www.docker.com/) instalado em sua máquina e execute:

```bash
docker compose up -d --build
```

- 🌐 **Site Público:** [http://localhost:3000](http://localhost:3000)
- 🎛️ **Painel Administrativo CMS:** [http://localhost:3000/admin](http://localhost:3000/admin)
- 🔑 **Usuário Administrador:** `admin`
- 🔒 **Senha Inicial:** `admin123`

Para interromper os containers:
```bash
docker compose down
```

---

### 💻 2. Execução Local via Node.js

Caso prefira rodar diretamente sem Docker:

```bash
# 1. Instale as dependências
npm install

# 2. Inicie o servidor
npm start
```

---

## 🎛️ Painel Administrativo CMS (`/admin`)

O painel administrativo permite controlar todos os aspectos do site sem mexer no código-fonte:

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
| 🔐 **Segurança** | Alteração de usuário, nome de exibição e senha do administrador. |

---

## 📂 Estrutura de Arquivos

```
06 - Boate/
├── admin/                         # Interface do Painel Administrativo CMS
│   ├── index.html                 # Estrutura SPA do Dashboard
│   ├── admin.css                  # Estilos Neon Glassmorphism
│   └── admin.js                   # Lógica assíncrona e integração com REST API
├── data/                          # Banco de Dados JSON Persistente
│   ├── content.json               # Configurações dinâmicas do site
│   ├── reservations.json          # Solicitações de reservas de mesas e camarotes
│   ├── guestlist.json             # Membros cadastrados na Lista VIP
│   ├── contacts.json              # Mensagens enviadas pelo formulário
│   └── users.json                 # Credenciais de acesso administrativo (bcrypt)
├── uploads/                       # Armazenamento de imagens e logotipos enviados
├── js/
│   ├── audio-player.js            # Motor de áudio nativo Web Audio API com sintetizador
│   ├── events.js                  # Filtros de gênero e modal de checkout de ingressos
│   ├── reservation.js             # Formulário de reserva e gerador de voucher VIP
│   ├── gallery.js                 # Galeria de fotos e modal Lightbox em tela cheia
│   ├── content-loader.js          # Hidratação dinâmica em tempo real do CMS no frontend
│   └── main.js                    # Canvas de partículas laser, drawer mobile e animações
├── css/
│   └── style.css                  # Design System Neon Dark Glassmorphism do site público
├── index.html                     # Página principal do website
├── server.js                      # Backend Node.js / Express com REST API, JWT e Multer
├── Dockerfile                     # Imagem Docker otimizada baseada em node:18-alpine
├── docker-compose.yml             # Orquestração de containers com volumes persistentes
├── package.json                   # Dependências e scripts npm
├── DOCUMENTACAO.md                # Documentação técnica e arquitetural detalhada
├── CONTEXTO.md                    # Histórico e contexto do projeto
└── PASSOS.md                      # Roadmap e controle de execução
```

---

## 📡 Endpoints da REST API

| Método | Endpoint | Protegido | Descrição |
| :--- | :--- | :---: | :--- |
| `POST` | `/api/auth/login` | Não | Autenticação do administrador e emissão de JWT |
| `GET` | `/api/auth/me` | Sim | Validação da sessão ativa do administrador |
| `PUT` | `/api/auth/change-password` | Sim | Alteração de usuário e senha de acesso |
| `GET` | `/api/content` | Não | Recupera todas as configurações do site |
| `PUT` | `/api/content` | Sim | Atualiza textos, cores, fotos e configurações |
| `POST` | `/api/upload` | Sim | Upload multipart de fotos e logotipos |
| `GET` | `/api/reservations` | Sim | Lista todas as reservas recebidas |
| `POST` | `/api/reservations` | Não | Envio de solicitação de reserva pelo site |
| `PUT` | `/api/reservations/:id` | Sim | Atualiza o status de uma reserva |
| `GET` | `/api/guestlist` | Sim | Lista cadastros na Lista VIP |
| `POST` | `/api/guestlist` | Não | Inscrição na Lista VIP pelo popup |
| `GET` | `/api/contacts` | Sim | Lista mensagens de contato recebidas |
| `POST` | `/api/contacts` | Não | Envio de mensagem pelo formulário de contato |
| `GET` | `/api/stats` | Sim | Métricas em tempo real para o dashboard |

---

## 🛡️ Licença e Direitos

Projeto desenvolvido para o **Los Angeles Club & VIP Lounge**. Todos os direitos reservados.

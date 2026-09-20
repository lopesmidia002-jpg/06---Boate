/**
 * LOS ANGELES CLUB & VIP LOUNGE - ADMIN CMS ENGINE
 * Arquitetura SPA moderna com sincronização em tempo real via REST API
 */

const admin = {
  token: localStorage.getItem('lac_admin_token') || null,
  user: null,
  contentData: null,
  activeTab: 'tab-dashboard',
  modalCurrentType: null,
  modalCurrentIndex: null,

  // Inicialização
  async init() {
    this.bindEvents();
    if (this.token) {
      const valid = await this.verifySession();
      if (valid) {
        this.showAdminApp();
        return;
      }
    }
    this.showLoginScreen();
  },

  // Eventos de Interface
  bindEvents() {
    // Login form
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => this.handleLogin(e));
    }

    // Toggle senha no login
    const togglePwdBtn = document.getElementById('toggle-password-btn');
    if (togglePwdBtn) {
      togglePwdBtn.addEventListener('click', () => {
        const input = document.getElementById('login-password');
        const icon = togglePwdBtn.querySelector('i');
        if (input.type === 'password') {
          input.type = 'text';
          icon.className = 'fa-solid fa-eye-slash';
        } else {
          input.type = 'password';
          icon.className = 'fa-solid fa-eye';
        }
      });
    }

    // Logout
    const logoutBtn = document.getElementById('btn-logout');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => this.handleLogout());
    }

    // Navegação entre Abas
    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetTab = btn.getAttribute('data-tab');
        this.switchTab(targetTab);
        // Fecha sidebar em mobile
        document.getElementById('admin-sidebar')?.classList.remove('open');
      });
    });

    // Toggle Sidebar Mobile
    document.getElementById('toggle-sidebar-btn')?.addEventListener('click', () => {
      document.getElementById('admin-sidebar')?.classList.toggle('open');
    });
    document.getElementById('close-sidebar-btn')?.addEventListener('click', () => {
      document.getElementById('admin-sidebar')?.classList.remove('open');
    });

    // Salvar Tudo (Botão Topbar)
    document.getElementById('btn-save-all-top')?.addEventListener('click', () => {
      this.saveAllContent();
    });

    // Atualizar Métricas
    document.getElementById('btn-refresh-stats')?.addEventListener('click', () => {
      this.loadStats();
      this.showToast('Métricas atualizadas!');
    });

    // Sincronização de Cores
    this.bindColorPicker('color-neon-cyan', 'color-neon-cyan-hex');
    this.bindColorPicker('color-neon-pink', 'color-neon-pink-hex');
    this.bindColorPicker('color-bg-primary', 'color-bg-primary-hex');
    this.bindColorPicker('color-bg-card', 'color-bg-card-hex');

    // Logo Upload
    this.bindUpload('logo-file-input', 'logo-dropzone', (url) => {
      document.getElementById('input-logo-image-url').value = url;
      this.renderLogoPreview(url);
    });
    document.getElementById('btn-remove-logo')?.addEventListener('click', (e) => {
      e.stopPropagation();
      document.getElementById('input-logo-image-url').value = '';
      this.renderLogoPreview('');
    });
    document.getElementById('input-logo-image-url')?.addEventListener('input', (e) => {
      this.renderLogoPreview(e.target.value);
    });

    // Gallery Bulk Upload
    document.getElementById('gallery-bulk-upload')?.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const url = await this.uploadFile(file);
      if (url) {
        if (!this.contentData.gallery) this.contentData.gallery = [];
        this.contentData.gallery.push({
          id: Date.now(),
          title: 'Nova Foto da Noite',
          category: 'main-stage',
          categoryName: 'Main Stage',
          src: url,
          thumb: url,
          desc: 'Registro fotográfico da pista de dança.'
        });
        this.renderGalleryGrid();
        this.showToast('Foto adicionada à galeria!');
      }
    });

    // Adicionar Novos Itens (Modais)
    document.getElementById('btn-add-event')?.addEventListener('click', () => this.openItemModal('event'));
    document.getElementById('btn-add-dj')?.addEventListener('click', () => this.openItemModal('dj'));
    document.getElementById('btn-add-menu-item')?.addEventListener('click', () => this.openItemModal('menu'));

    // Fechar Modal
    document.getElementById('close-modal-btn')?.addEventListener('click', () => this.closeModal());
    document.getElementById('btn-modal-cancel')?.addEventListener('click', () => this.closeModal());
    document.getElementById('btn-modal-save')?.addEventListener('click', () => this.saveModalItem());

    // Exportações CSV
    document.getElementById('btn-export-reservations')?.addEventListener('click', () => this.exportReservationsCsv());
    document.getElementById('btn-export-guestlist')?.addEventListener('click', () => this.exportGuestlistCsv());

    // Formulário de Segurança
    document.getElementById('form-change-password')?.addEventListener('submit', (e) => this.handleChangePassword(e));
  },

  // Sincroniza seletor nativo e input hex
  bindColorPicker(pickerId, hexId) {
    const picker = document.getElementById(pickerId);
    const hex = document.getElementById(hexId);
    if (!picker || !hex) return;

    picker.addEventListener('input', () => {
      hex.value = picker.value;
      this.updateColorPreview();
    });
    hex.addEventListener('input', () => {
      if (/^#[0-9A-F]{6}$/i.test(hex.value)) {
        picker.value = hex.value;
        this.updateColorPreview();
      }
    });
  },

  updateColorPreview() {
    const cyan = document.getElementById('color-neon-cyan')?.value || '#00deff';
    const pink = document.getElementById('color-neon-pink')?.value || '#f92056';
    const preview = document.getElementById('color-preview-box');
    if (preview) {
      preview.style.background = `linear-gradient(135deg, ${pink} 0%, ${cyan} 100%)`;
      preview.style.boxShadow = `0 5px 25px ${cyan}66`;
    }
  },

  // ==========================================
  // AUTENTICAÇÃO
  // ==========================================
  async handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const alertBox = document.getElementById('login-alert');
    const submitBtn = document.getElementById('btn-submit-login');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Autenticando...';
    alertBox.className = 'alert-message hidden';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();

      if (data.success) {
        this.token = data.token;
        this.user = data.user;
        localStorage.setItem('lac_admin_token', this.token);
        this.showAdminApp();
        this.showToast('Bem-vindo ao Painel CMS!');
      } else {
        alertBox.className = 'alert-message alert-error';
        alertBox.textContent = data.message || 'Erro ao realizar login.';
      }
    } catch (err) {
      alertBox.className = 'alert-message alert-error';
      alertBox.textContent = 'Erro de conexão com o servidor.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>ENTRAR NO PAINEL</span> <i class="fa-solid fa-arrow-right-to-bracket"></i>';
    }
  },

  async verifySession() {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const data = await res.json();
      if (data.success) {
        this.user = data.user;
        return true;
      }
      return false;
    } catch (err) {
      return false;
    }
  },

  handleLogout() {
    this.token = null;
    this.user = null;
    localStorage.removeItem('lac_admin_token');
    this.showLoginScreen();
  },

  showLoginScreen() {
    document.getElementById('login-screen')?.classList.remove('hidden');
    document.getElementById('admin-app')?.classList.add('hidden');
  },

  showAdminApp() {
    document.getElementById('login-screen')?.classList.add('hidden');
    document.getElementById('admin-app')?.classList.remove('hidden');
    if (this.user) {
      document.getElementById('topbar-username').textContent = this.user.name || this.user.username;
    }
    this.loadAllData();
  },

  // ==========================================
  // CARREGAMENTO E SINCRONIZAÇÃO DE DADOS
  // ==========================================
  async loadAllData() {
    try {
      await Promise.all([
        this.loadContent(),
        this.loadStats(),
        this.loadReservations(),
        this.loadGuestlist(),
        this.loadContacts()
      ]);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    }
  },

  async loadContent() {
    try {
      const res = await fetch('/api/content');
      const data = await res.json();
      if (data.success) {
        this.contentData = data.data;
        this.populateForms();
      }
    } catch (err) {
      this.showToast('Erro ao carregar configurações do site.', true);
    }
  },

  populateForms() {
    const d = this.contentData;
    if (!d) return;

    // 1. Identidade & Cores
    if (d.colors) {
      this.setVal('color-neon-cyan', d.colors.neonCyan || '#00deff');
      this.setVal('color-neon-cyan-hex', d.colors.neonCyan || '#00deff');
      this.setVal('color-neon-pink', d.colors.neonPink || '#f92056');
      this.setVal('color-neon-pink-hex', d.colors.neonPink || '#f92056');
      this.setVal('color-bg-primary', d.colors.bgPrimary || '#07080c');
      this.setVal('color-bg-primary-hex', d.colors.bgPrimary || '#07080c');
      this.setVal('color-bg-card', d.colors.bgCard || '#121623');
      this.setVal('color-bg-card-hex', d.colors.bgCard || '#121623');
      this.updateColorPreview();
    }

    if (d.identity) {
      this.setVal('input-club-name', d.identity.clubName || '');
      this.setVal('input-club-slogan', d.identity.clubSlogan || '');
      this.setVal('input-logo-text-main', d.identity.logoTextMain || '');
      this.setVal('input-logo-text-sub', d.identity.logoTextSub || '');
      this.setVal('input-logo-image-url', d.identity.logoImageUrl || '');
      this.renderLogoPreview(d.identity.logoImageUrl || '');
    }

    // 2. Hero & Quem Somos
    if (d.hero) {
      this.setVal('hero-badge', d.hero.badge || '');
      this.setVal('hero-title-prefix', d.hero.titlePrefix || '');
      this.setVal('hero-title-highlight', d.hero.titleHighlight || '');
      this.setVal('hero-desc', d.hero.description || '');
      this.setVal('hero-countdown-target', d.hero.countdownTarget || '');
    }

    if (d.about) {
      this.setVal('about-title', d.about.title || '');
      this.setVal('about-lead', d.about.leadParagraph || '');
      if (d.about.stats && d.about.stats.length >= 4) {
        this.setVal('stat-events-num', d.about.stats[0].number || 500);
        this.setVal('stat-djs-num', d.about.stats[1].number || 120);
        this.setVal('stat-vip-num', d.about.stats[2].number || 50);
        this.setVal('stat-years-num', d.about.stats[3].number || 15);
      }
    }

    // 3. Contatos
    if (d.contacts) {
      this.setVal('contact-address', d.contacts.address || '');
      this.setVal('contact-phone', d.contacts.phone || '');
      this.setVal('contact-whatsapp', d.contacts.whatsapp || '');
      this.setVal('contact-email', d.contacts.email || '');
      this.setVal('hours-thurs', d.contacts.hoursThurs || '');
      this.setVal('hours-fri', d.contacts.hoursFri || '');
      this.setVal('hours-sat', d.contacts.hoursSat || '');
      this.setVal('hours-sun', d.contacts.hoursSun || '');
    }

    // 4. Serviços VIP
    if (d.vipServices) {
      if (d.vipServices.bistro) {
        this.setVal('vip-bistro-price', d.vipServices.bistro.price || 1200);
        this.setVal('vip-bistro-cap', d.vipServices.bistro.capacity || 'Até 4 pessoas');
      }
      if (d.vipServices.mezzanine) {
        this.setVal('vip-mezzanine-price', d.vipServices.mezzanine.price || 2800);
        this.setVal('vip-mezzanine-cap', d.vipServices.mezzanine.capacity || 'Até 8 pessoas');
      }
      if (d.vipServices.blackGold) {
        this.setVal('vip-blackgold-price', d.vipServices.blackGold.price || 5500);
        this.setVal('vip-blackgold-cap', d.vipServices.blackGold.capacity || 'Até 15 pessoas');
      }
    }

    // Renderizar Listas
    this.renderEventsList();
    this.renderDjsList();
    this.renderMenuList();
    this.renderGalleryGrid();
  },

  setVal(id, val) {
    const el = document.getElementById(id);
    if (el) el.value = val;
  },

  getVal(id) {
    const el = document.getElementById(id);
    return el ? el.value : '';
  },

  renderLogoPreview(url) {
    const wrapper = document.getElementById('logo-preview-wrapper');
    const img = document.getElementById('logo-preview-img');
    if (url && url.trim() !== '') {
      img.src = url;
      wrapper.classList.remove('hidden');
    } else {
      wrapper.classList.add('hidden');
    }
  },

  // ==========================================
  // SALVAR CONTEÚDO (PUT /api/content)
  // ==========================================
  async saveAllContent() {
    if (!this.contentData) this.contentData = {};

    // 1. Identidade & Cores
    this.contentData.colors = {
      ...this.contentData.colors,
      neonCyan: this.getVal('color-neon-cyan'),
      neonPink: this.getVal('color-neon-pink'),
      bgPrimary: this.getVal('color-bg-primary'),
      bgCard: this.getVal('color-bg-card')
    };

    this.contentData.identity = {
      ...this.contentData.identity,
      clubName: this.getVal('input-club-name'),
      clubSlogan: this.getVal('input-club-slogan'),
      logoTextMain: this.getVal('input-logo-text-main'),
      logoTextSub: this.getVal('input-logo-text-sub'),
      logoImageUrl: this.getVal('input-logo-image-url')
    };

    // 2. Hero & Sobre
    this.contentData.hero = {
      ...this.contentData.hero,
      badge: this.getVal('hero-badge'),
      titlePrefix: this.getVal('hero-title-prefix'),
      titleHighlight: this.getVal('hero-title-highlight'),
      description: this.getVal('hero-desc'),
      countdownTarget: this.getVal('hero-countdown-target')
    };

    this.contentData.about = {
      ...this.contentData.about,
      title: this.getVal('about-title'),
      leadParagraph: this.getVal('about-lead'),
      stats: [
        { number: parseInt(this.getVal('stat-events-num')) || 500, suffix: "+", label: "Noites Inesquecíveis Realizadas" },
        { number: parseInt(this.getVal('stat-djs-num')) || 120, suffix: "+", label: "DJs e Atrações Internacionais" },
        { number: parseInt(this.getVal('stat-vip-num')) || 50, suffix: "k+", label: "Membros e Frequentadores VIP" },
        { number: parseInt(this.getVal('stat-years-num')) || 15, suffix: " Anos", label: "Liderança na Noite e Entretenimento" }
      ]
    };

    // 3. Contatos
    this.contentData.contacts = {
      ...this.contentData.contacts,
      address: this.getVal('contact-address'),
      phone: this.getVal('contact-phone'),
      whatsapp: this.getVal('contact-whatsapp'),
      email: this.getVal('contact-email'),
      hoursThurs: this.getVal('hours-thurs'),
      hoursFri: this.getVal('hours-fri'),
      hoursSat: this.getVal('hours-sat'),
      hoursSun: this.getVal('hours-sun')
    };

    // 4. Serviços VIP
    this.contentData.vipServices = {
      bistro: {
        name: "Mesa Bistrô",
        capacity: this.getVal('vip-bistro-cap'),
        price: parseFloat(this.getVal('vip-bistro-price')) || 1200,
        benefits: ["Entrada VIP sem filas", "1 Garrafa de Destilado Premium", "Garçom Dedicado"]
      },
      mezzanine: {
        name: "Lounge Mezanino VIP",
        capacity: this.getVal('vip-mezzanine-cap'),
        price: parseFloat(this.getVal('vip-mezzanine-price')) || 2800,
        benefits: ["Visão panorâmica da pista", "2 Garrafas Premium + 10 Energéticos", "Sofá Privativo", "Atendimento Exclusivo"]
      },
      blackGold: {
        name: "Camarote Black & Gold Master",
        capacity: this.getVal('vip-blackgold-cap'),
        price: parseFloat(this.getVal('vip-blackgold-price')) || 5500,
        benefits: ["Localização nobre ao lado do DJ", "3 Garrafas Premium + 2 Champagnes", "Segurança privativo", "Estacionamento VIP"]
      }
    };

    try {
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify(this.contentData)
      });
      const data = await res.json();
      if (data.success) {
        this.showToast('Alterações salvas e publicadas com sucesso!');
      } else {
        this.showToast(data.message || 'Erro ao salvar.', true);
      }
    } catch (err) {
      this.showToast('Falha na comunicação com o servidor.', true);
    }
  },

  // ==========================================
  // RENDERIZAÇÃO DE LISTAS E CARDS
  // ==========================================
  renderEventsList() {
    const container = document.getElementById('events-list-container');
    if (!container) return;
    const events = this.contentData?.events || [];

    container.innerHTML = events.map((ev, index) => `
      <div class="item-manage-card glass-panel">
        <div class="item-thumb-wrap">
          <img src="${ev.image}" alt="${ev.title}">
          <span class="item-badge-pill">${ev.genreLabel || ev.genre}</span>
        </div>
        <div class="item-title">${ev.title}</div>
        <div class="item-subtitle">${ev.date} • ${ev.time || '22h'}</div>
        <div class="item-meta">
          <strong>Lineup:</strong> ${ev.lineup}<br>
          <strong>Ingresso:</strong> R$ ${ev.price || 80} (${ev.status || 'Disponível'})
        </div>
        <div class="item-card-actions">
          <button class="btn-edit-item" onclick="admin.editEvent(${index})"><i class="fa-solid fa-pen"></i> Editar</button>
          <button class="btn-delete-item" onclick="admin.deleteEvent(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `).join('');
  },

  renderDjsList() {
    const container = document.getElementById('djs-list-container');
    if (!container) return;
    const djs = this.contentData?.djs || [];

    container.innerHTML = djs.map((dj, index) => `
      <div class="item-manage-card glass-panel">
        <div class="item-thumb-wrap">
          <img src="${dj.image}" alt="${dj.name}">
          <span class="item-badge-pill">${dj.style}</span>
        </div>
        <div class="item-title">${dj.name}</div>
        <div class="item-subtitle">${dj.role || 'DJ Residente'}</div>
        <div class="item-meta">${dj.bio}</div>
        <div class="item-card-actions">
          <button class="btn-edit-item" onclick="admin.editDj(${index})"><i class="fa-solid fa-pen"></i> Editar</button>
          <button class="btn-delete-item" onclick="admin.deleteDj(${index})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `).join('');
  },

  renderMenuList() {
    const container = document.getElementById('menu-list-container');
    if (!container) return;
    const cocktails = this.contentData?.menu?.cocktails || [];
    const bottles = this.contentData?.menu?.bottles || [];
    const all = [
      ...cocktails.map((c, i) => ({ ...c, cat: 'cocktails', originalIndex: i })),
      ...bottles.map((b, i) => ({ ...b, cat: 'bottles', originalIndex: i }))
    ];

    container.innerHTML = all.map((item) => `
      <div class="item-manage-card glass-panel">
        <div class="item-thumb-wrap">
          <img src="${item.image}" alt="${item.name}">
          <span class="item-badge-pill">${item.badge || item.cat}</span>
        </div>
        <div class="item-title">${item.name}</div>
        <div class="item-subtitle">${item.price} • ${item.volume || ''}</div>
        <div class="item-meta">${item.desc}</div>
        <div class="item-card-actions">
          <button class="btn-edit-item" onclick="admin.editMenuItem('${item.cat}', ${item.originalIndex})"><i class="fa-solid fa-pen"></i> Editar</button>
          <button class="btn-delete-item" onclick="admin.deleteMenuItem('${item.cat}', ${item.originalIndex})"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `).join('');
  },

  renderGalleryGrid() {
    const container = document.getElementById('gallery-manage-grid');
    if (!container) return;
    const gallery = this.contentData?.gallery || [
      { id: 1, title: 'Main Stage & Lasers', src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80' },
      { id: 2, title: 'VIP Lounge Exclusive', src: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=600&q=80' },
      { id: 3, title: 'Neon Laser Show', src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80' },
      { id: 4, title: 'Mixology Cocktail Bar', src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80' },
      { id: 5, title: 'DJ Marcus Vortex Set', src: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=600&q=80' },
      { id: 6, title: 'DJ Alexia Frost', src: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=600&q=80' }
    ];

    container.innerHTML = gallery.map((item, index) => `
      <div class="gallery-admin-card">
        <img src="${item.src || item.thumb}" alt="${item.title}">
        <div class="gallery-actions">
          <button class="btn-delete-item" onclick="admin.deleteGalleryPhoto(${index})"><i class="fa-solid fa-trash"></i> Remover</button>
        </div>
      </div>
    `).join('');
  },

  deleteGalleryPhoto(index) {
    if (!confirm('Deseja realmente remover esta foto da galeria?')) return;
    if (!this.contentData.gallery) {
      this.contentData.gallery = [
        { id: 1, title: 'Main Stage', src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80' },
        { id: 2, title: 'VIP Lounge', src: 'https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?auto=format&fit=crop&w=600&q=80' }
      ];
    }
    this.contentData.gallery.splice(index, 1);
    this.renderGalleryGrid();
    this.showToast('Foto removida!');
  },

  // ==========================================
  // MODAL DINÂMICO PARA ADICIONAR / EDITAR ITENS
  // ==========================================
  openItemModal(type, index = null) {
    this.modalCurrentType = type;
    this.modalCurrentIndex = index;
    const modal = document.getElementById('admin-modal');
    const title = document.getElementById('admin-modal-title');
    const body = document.getElementById('admin-modal-body');

    if (type === 'event') {
      const isNew = index === null;
      const ev = !isNew ? this.contentData.events[index] : {
        title: '',
        genre: 'edm',
        genreLabel: 'EDM & Festival',
        date: '',
        time: '22:00 - 06:00',
        lineup: '',
        image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
        price: 90,
        status: 'Ingressos Disponíveis',
        description: ''
      };

      title.textContent = isNew ? 'Adicionar Nova Festa' : 'Editar Festa / Evento';
      body.innerHTML = `
        <div class="form-group">
          <label>Nome da Festa / Evento:</label>
          <input type="text" id="m-ev-title" class="admin-input" value="${ev.title}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Gênero Musical:</label>
            <select id="m-ev-genre" class="admin-input">
              <option value="edm" ${ev.genre === 'edm' ? 'selected' : ''}>EDM & Festival</option>
              <option value="deep-house" ${ev.genre === 'deep-house' ? 'selected' : ''}>Deep House & Tech</option>
              <option value="hip-hop" ${ev.genre === 'hip-hop' ? 'selected' : ''}>Hip-Hop & Trap</option>
              <option value="sunset-vip" ${ev.genre === 'sunset-vip' ? 'selected' : ''}>Sunset & VIP</option>
            </select>
          </div>
          <div class="form-group">
            <label>Valor do Ingresso (R$):</label>
            <input type="number" id="m-ev-price" class="admin-input" value="${ev.price || 90}">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Data:</label>
            <input type="text" id="m-ev-date" class="admin-input" value="${ev.date}" placeholder="Ex: Sexta-feira, 24 de Outubro">
          </div>
          <div class="form-group">
            <label>Horário:</label>
            <input type="text" id="m-ev-time" class="admin-input" value="${ev.time || '22:00 - 06:00'}">
          </div>
        </div>
        <div class="form-group">
          <label>Lineup de DJs:</label>
          <input type="text" id="m-ev-lineup" class="admin-input" value="${ev.lineup}" placeholder="Ex: DJ Marcus Vortex + Convidados">
        </div>
        <div class="form-group">
          <label>Foto do Flyer (Upload ou URL):</label>
          <div class="upload-drop-zone" id="m-ev-dropzone">
            <i class="fa-solid fa-cloud-arrow-up upload-icon"></i>
            <p>Arraste o flyer ou clique para upload</p>
            <input type="file" id="m-ev-file" class="hidden-file-input" accept="image/*">
          </div>
          <input type="text" id="m-ev-image" class="admin-input mt-2" value="${ev.image}" placeholder="https://...">
        </div>
        <div class="form-group">
          <label>Descrição do Evento:</label>
          <textarea id="m-ev-desc" class="admin-textarea" rows="3">${ev.description || ''}</textarea>
        </div>
      `;

      this.bindUpload('m-ev-file', 'm-ev-dropzone', (url) => {
        document.getElementById('m-ev-image').value = url;
      });
    } else if (type === 'dj') {
      const isNew = index === null;
      const dj = !isNew ? this.contentData.djs[index] : {
        name: '',
        style: 'Melodic House',
        role: 'DJ Residente',
        bio: '',
        image: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=700&q=80'
      };

      title.textContent = isNew ? 'Adicionar Novo DJ' : 'Editar Perfil do DJ';
      body.innerHTML = `
        <div class="form-group">
          <label>Nome do DJ / Artista:</label>
          <input type="text" id="m-dj-name" class="admin-input" value="${dj.name}" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Estilo Musical:</label>
            <input type="text" id="m-dj-style" class="admin-input" value="${dj.style}">
          </div>
          <div class="form-group">
            <label>Papel / Destaque:</label>
            <input type="text" id="m-dj-role" class="admin-input" value="${dj.role}">
          </div>
        </div>
        <div class="form-group">
          <label>Foto do DJ (Upload ou URL):</label>
          <div class="upload-drop-zone" id="m-dj-dropzone">
            <i class="fa-solid fa-cloud-arrow-up upload-icon"></i>
            <p>Arraste a foto ou clique para upload</p>
            <input type="file" id="m-dj-file" class="hidden-file-input" accept="image/*">
          </div>
          <input type="text" id="m-dj-image" class="admin-input mt-2" value="${dj.image}">
        </div>
        <div class="form-group">
          <label>Mini Biografia:</label>
          <textarea id="m-dj-bio" class="admin-textarea" rows="3">${dj.bio}</textarea>
        </div>
      `;

      this.bindUpload('m-dj-file', 'm-dj-dropzone', (url) => {
        document.getElementById('m-dj-image').value = url;
      });
    } else if (type === 'menu') {
      title.textContent = 'Adicionar Item ao Cardápio';
      body.innerHTML = `
        <div class="form-group">
          <label>Nome da Bebida / Prato:</label>
          <input type="text" id="m-menu-name" class="admin-input" required>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Categoria:</label>
            <select id="m-menu-cat" class="admin-input">
              <option value="cocktails">Coquetéis Autorais</option>
              <option value="bottles">Garrafas & Champagnes</option>
            </select>
          </div>
          <div class="form-group">
            <label>Preço:</label>
            <input type="text" id="m-menu-price" class="admin-input" placeholder="Ex: R$ 52">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label>Badge / Destaque:</label>
            <input type="text" id="m-menu-badge" class="admin-input" placeholder="Ex: Mais Pedido">
          </div>
          <div class="form-group">
            <label>Volume / Porção:</label>
            <input type="text" id="m-menu-volume" class="admin-input" placeholder="Ex: 350ml">
          </div>
        </div>
        <div class="form-group">
          <label>Foto (Upload ou URL):</label>
          <div class="upload-drop-zone" id="m-menu-dropzone">
            <i class="fa-solid fa-cloud-arrow-up upload-icon"></i>
            <p>Arraste a foto ou clique para upload</p>
            <input type="file" id="m-menu-file" class="hidden-file-input" accept="image/*">
          </div>
          <input type="text" id="m-menu-image" class="admin-input mt-2" value="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80">
        </div>
        <div class="form-group">
          <label>Descrição / Ingredientes:</label>
          <textarea id="m-menu-desc" class="admin-textarea" rows="2"></textarea>
        </div>
      `;

      this.bindUpload('m-menu-file', 'm-menu-dropzone', (url) => {
        document.getElementById('m-menu-image').value = url;
      });
    }

    modal.classList.remove('hidden');
  },

  closeModal() {
    document.getElementById('admin-modal')?.classList.add('hidden');
  },

  saveModalItem() {
    const type = this.modalCurrentType;
    const index = this.modalCurrentIndex;

    if (type === 'event') {
      const genreSelect = document.getElementById('m-ev-genre');
      const item = {
        id: index !== null ? this.contentData.events[index].id : Date.now(),
        title: this.getVal('m-ev-title'),
        genre: genreSelect.value,
        genreLabel: genreSelect.options[genreSelect.selectedIndex].text,
        price: parseFloat(this.getVal('m-ev-price')) || 90,
        date: this.getVal('m-ev-date'),
        time: this.getVal('m-ev-time'),
        lineup: this.getVal('m-ev-lineup'),
        image: this.getVal('m-ev-image'),
        description: this.getVal('m-ev-desc'),
        badge: 'Destaque',
        status: 'Ingressos Disponíveis'
      };

      if (!this.contentData.events) this.contentData.events = [];
      if (index === null) {
        this.contentData.events.push(item);
      } else {
        this.contentData.events[index] = item;
      }
      this.renderEventsList();
    } else if (type === 'dj') {
      const item = {
        id: index !== null ? this.contentData.djs[index].id : Date.now(),
        name: this.getVal('m-dj-name'),
        style: this.getVal('m-dj-style'),
        role: this.getVal('m-dj-role'),
        image: this.getVal('m-dj-image'),
        bio: this.getVal('m-dj-bio'),
        trackId: 1
      };

      if (!this.contentData.djs) this.contentData.djs = [];
      if (index === null) {
        this.contentData.djs.push(item);
      } else {
        this.contentData.djs[index] = item;
      }
      this.renderDjsList();
    } else if (type === 'menu') {
      const cat = this.getVal('m-menu-cat');
      const item = {
        id: `item_${Date.now()}`,
        name: this.getVal('m-menu-name'),
        price: this.getVal('m-menu-price') || 'R$ 50',
        badge: this.getVal('m-menu-badge') || 'Especial',
        volume: this.getVal('m-menu-volume') || '300ml',
        image: this.getVal('m-menu-image'),
        desc: this.getVal('m-menu-desc')
      };

      if (!this.contentData.menu) this.contentData.menu = { cocktails: [], bottles: [] };
      if (!this.contentData.menu[cat]) this.contentData.menu[cat] = [];
      this.contentData.menu[cat].push(item);
      this.renderMenuList();
    }

    this.closeModal();
    this.showToast('Item salvo! Lembre-se de clicar em "Salvar Alterações".');
  },

  editEvent(index) { this.openItemModal('event', index); },
  deleteEvent(index) {
    if (confirm('Deseja excluir este evento?')) {
      this.contentData.events.splice(index, 1);
      this.renderEventsList();
      this.showToast('Evento excluído!');
    }
  },

  editDj(index) { this.openItemModal('dj', index); },
  deleteDj(index) {
    if (confirm('Deseja excluir este DJ?')) {
      this.contentData.djs.splice(index, 1);
      this.renderDjsList();
      this.showToast('DJ excluído!');
    }
  },

  deleteMenuItem(cat, index) {
    if (confirm('Deseja excluir este item do cardápio?')) {
      this.contentData.menu[cat].splice(index, 1);
      this.renderMenuList();
      this.showToast('Item removido!');
    }
  },

  // ==========================================
  // GESTÃO DE RESERVAS VIP
  // ==========================================
  async loadReservations() {
    try {
      const res = await fetch('/api/reservations', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const data = await res.json();
      if (data.success) {
        this.renderReservationsTable(data.data);
      }
    } catch (err) {
      console.error('Erro ao carregar reservas:', err);
    }
  },

  renderReservationsTable(reservations) {
    const tbody = document.getElementById('reservations-table-body');
    const badge = document.getElementById('badge-pending-reservations');
    if (!tbody) return;

    const pending = reservations.filter(r => r.status === 'Pendente').length;
    if (badge) badge.textContent = pending;

    tbody.innerHTML = reservations.map(r => `
      <tr>
        <td><strong>${r.id}</strong></td>
        <td><strong>${r.name}</strong><br><small class="text-neon-pink">${r.email}</small></td>
        <td>${r.phone}</td>
        <td><span class="text-neon-cyan">${r.sectorName || r.sector}</span></td>
        <td>${r.date}<br><small>${r.time}</small></td>
        <td>${r.guests} pess.</td>
        <td><strong>${r.totalEstimate || 'A calcular'}</strong></td>
        <td>
          <span class="status-badge status-${(r.status || 'pendente').toLowerCase()}">${r.status || 'Pendente'}</span>
        </td>
        <td>
          <select class="admin-input" style="padding:4px 8px; font-size:0.75rem;" onchange="admin.updateReservationStatus('${r.id}', this.value)">
            <option value="Pendente" ${r.status === 'Pendente' ? 'selected' : ''}>Pendente</option>
            <option value="Confirmado" ${r.status === 'Confirmado' ? 'selected' : ''}>Confirmado</option>
            <option value="Cancelado" ${r.status === 'Cancelado' ? 'selected' : ''}>Cancelado</option>
          </select>
        </td>
      </tr>
    `).join('');
  },

  async updateReservationStatus(id, newStatus) {
    try {
      const res = await fetch(`/api/reservations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ status: newStatus })
      });
      const data = await res.json();
      if (data.success) {
        this.showToast(`Reserva ${id} atualizada para "${newStatus}"!`);
        this.loadReservations();
        this.loadStats();
      }
    } catch (err) {
      this.showToast('Erro ao atualizar reserva.', true);
    }
  },

  exportReservationsCsv() {
    window.open('/api/reservations', '_blank');
  },

  // ==========================================
  // LISTA VIP & MENSAGENS
  // ==========================================
  async loadGuestlist() {
    try {
      const res = await fetch('/api/guestlist', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const data = await res.json();
      if (data.success) {
        const tbody = document.getElementById('guestlist-table-body');
        if (!tbody) return;
        tbody.innerHTML = data.data.map(g => `
          <tr>
            <td><strong class="text-neon-cyan">${g.code || g.id}</strong></td>
            <td><strong>${g.name}</strong></td>
            <td>${g.email}</td>
            <td>${g.phone || '-'}</td>
            <td><span class="status-badge status-confirmado">${g.discount || '20% OFF'}</span></td>
            <td>${new Date(g.createdAt).toLocaleDateString('pt-BR')}</td>
          </tr>
        `).join('');
      }
    } catch (err) {
      console.error('Erro ao carregar lista VIP:', err);
    }
  },

  exportGuestlistCsv() {
    window.open('/api/guestlist', '_blank');
  },

  async loadContacts() {
    try {
      const res = await fetch('/api/contacts', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const data = await res.json();
      if (data.success) {
        const container = document.getElementById('messages-list-container');
        if (!container) return;
        container.innerHTML = data.data.map(m => `
          <div class="message-item">
            <div class="message-header">
              <span class="message-author">${m.name} (${m.email} - ${m.phone || ''})</span>
              <span class="message-time">${new Date(m.createdAt).toLocaleDateString('pt-BR')}</span>
            </div>
            <div class="message-subject"><i class="fa-solid fa-comment-dots"></i> ${m.subject || 'Mensagem Geral'}</div>
            <div class="message-body">${m.message}</div>
          </div>
        `).join('');
      }
    } catch (err) {
      console.error('Erro ao carregar mensagens:', err);
    }
  },

  async loadStats() {
    try {
      const res = await fetch('/api/stats', {
        headers: { 'Authorization': `Bearer ${this.token}` }
      });
      const data = await res.json();
      if (data.success) {
        const s = data.stats;
        document.getElementById('stat-total-reservations').textContent = s.totalReservations;
        document.getElementById('stat-pending-reservations').textContent = s.pendingReservations;
        document.getElementById('stat-total-guestlist').textContent = s.totalGuestlist;
        document.getElementById('stat-total-events').textContent = s.totalEvents;
      }
    } catch (err) {
      console.error('Erro ao carregar stats:', err);
    }
  },

  // ==========================================
  // SEGURANÇA: ALTERAÇÃO DE SENHA
  // ==========================================
  async handleChangePassword(e) {
    e.preventDefault();
    const currentPassword = document.getElementById('sec-current-password').value;
    const newUsername = document.getElementById('sec-new-username').value;
    const newName = document.getElementById('sec-new-name').value;
    const newPassword = document.getElementById('sec-new-password').value;
    const alertBox = document.getElementById('security-alert');

    alertBox.className = 'alert-message hidden';

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        },
        body: JSON.stringify({ currentPassword, newUsername, newName, newPassword })
      });
      const data = await res.json();

      if (data.success) {
        alertBox.className = 'alert-message alert-success';
        alertBox.textContent = 'Credenciais atualizadas com sucesso!';
        if (data.user) {
          this.user = data.user;
          document.getElementById('topbar-username').textContent = this.user.name || this.user.username;
        }
        document.getElementById('form-change-password').reset();
      } else {
        alertBox.className = 'alert-message alert-error';
        alertBox.textContent = data.message || 'Erro ao alterar credenciais.';
      }
    } catch (err) {
      alertBox.className = 'alert-message alert-error';
      alertBox.textContent = 'Erro de comunicação com o servidor.';
    }
  },

  // ==========================================
  // UPLOAD HELPER
  // ==========================================
  bindUpload(inputId, dropzoneId, callback) {
    const input = document.getElementById(inputId);
    const dropzone = document.getElementById(dropzoneId);
    if (!input || !dropzone) return;

    dropzone.addEventListener('click', () => input.click());

    dropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--neon-cyan)';
    });
    dropzone.addEventListener('dragleave', () => {
      dropzone.style.borderColor = 'var(--border-glass)';
    });
    dropzone.addEventListener('drop', async (e) => {
      e.preventDefault();
      dropzone.style.borderColor = 'var(--border-glass)';
      if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        const url = await this.uploadFile(file);
        if (url) callback(url);
      }
    });

    input.addEventListener('change', async (e) => {
      if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const url = await this.uploadFile(file);
        if (url) callback(url);
      }
    });
  },

  async uploadFile(file) {
    const formData = new FormData();
    formData.append('file', file);

    this.showToast('Fazendo upload da imagem...');

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${this.token}` },
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        this.showToast('Upload concluído!');
        return data.fileUrl;
      } else {
        this.showToast(data.message || 'Falha no upload.', true);
        return null;
      }
    } catch (err) {
      this.showToast('Erro de conexão durante o upload.', true);
      return null;
    }
  },

  // Troca de Aba
  switchTab(tabId) {
    this.activeTab = tabId;
    document.querySelectorAll('.admin-tab-pane').forEach(p => p.classList.remove('active'));
    document.getElementById(tabId)?.classList.add('active');

    document.querySelectorAll('.sidebar-nav .nav-item').forEach(btn => {
      if (btn.getAttribute('data-tab') === tabId) {
        btn.classList.add('active');
        const titleSpan = btn.querySelector('span');
        if (titleSpan) {
          document.getElementById('topbar-current-page').textContent = titleSpan.textContent;
        }
      } else {
        btn.classList.remove('active');
      }
    });
  },

  // Toast Notification
  showToast(message, isError = false) {
    const toast = document.getElementById('admin-toast');
    if (!toast) return;

    toast.className = `admin-toast ${isError ? 'error' : ''}`;
    toast.querySelector('.toast-text').textContent = message;
    toast.querySelector('.toast-icon').className = `toast-icon fa-solid ${isError ? 'fa-triangle-exclamation' : 'fa-circle-check'}`;

    toast.classList.remove('hidden');
    clearTimeout(this._toastTimeout);
    this._toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 4000);
  }
};

// Auto Inicializar
document.addEventListener('DOMContentLoaded', () => {
  admin.init();
});

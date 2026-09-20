/**
 * LOS ANGELES CLUB - DINAMIC CONTENT HYDRATOR (FULL CMS SYNC)
 * Sincroniza 100% das configurações do CMS com a página pública em tempo real.
 */

document.addEventListener('DOMContentLoaded', async () => {
  try {
    const res = await fetch('/api/content');
    if (!res.ok) return;
    const json = await res.json();
    if (json.success && json.data) {
      applyDynamicContent(json.data);
    }
  } catch (err) {
    console.log('[CMS] Carregando com dados nativos de fallback.');
  }

  // Interceptar formulários públicos e enviar para o backend
  setupFormIntegrations();
});

function applyDynamicContent(data) {
  // ==========================================
  // 1. CORES DO DESIGN SYSTEM (:ROOT)
  // ==========================================
  if (data.colors) {
    const root = document.documentElement;
    if (data.colors.neonCyan) {
      root.style.setProperty('--neon-cyan', data.colors.neonCyan);
      root.style.setProperty('--border-cyan', `${data.colors.neonCyan}55`);
      root.style.setProperty('--neon-cyan-glow', `0 0 15px ${data.colors.neonCyan}99, 0 0 35px ${data.colors.neonCyan}4d`);
    }
    if (data.colors.neonPink) {
      root.style.setProperty('--neon-pink', data.colors.neonPink);
      root.style.setProperty('--border-pink', `${data.colors.neonPink}55`);
      root.style.setProperty('--neon-pink-glow', `0 0 15px ${data.colors.neonPink}99, 0 0 35px ${data.colors.neonPink}4d`);
    }
    if (data.colors.bgPrimary) root.style.setProperty('--bg-primary', data.colors.bgPrimary);
    if (data.colors.bgSecondary) root.style.setProperty('--bg-secondary', data.colors.bgSecondary || '#0d0f17');
    if (data.colors.bgCard) root.style.setProperty('--bg-card', data.colors.bgCard);
  }

  // ==========================================
  // 2. IDENTIDADE, LOGO & NOMES
  // ==========================================
  if (data.identity) {
    if (data.identity.clubName) {
      document.title = `${data.identity.clubName} | ${data.identity.clubSlogan || 'Nightclub & Lounge VIP'}`;
    }

    if (data.identity.logoImageUrl && data.identity.logoImageUrl.trim() !== '') {
      document.querySelectorAll('.site-logo').forEach(logo => {
        logo.innerHTML = `<img src="${data.identity.logoImageUrl}" alt="${data.identity.clubName || 'Logo'}" style="max-height:48px; object-fit:contain;">`;
      });
    } else if (data.identity.logoTextMain) {
      document.querySelectorAll('.site-logo').forEach(logo => {
        const sub = data.identity.logoTextSub || 'Los Angeles';
        const main = data.identity.logoTextMain || 'CLUB';
        logo.innerHTML = `
          <span class="logo-sub font-accent text-neon-cyan">${sub}</span>
          <span class="logo-main text-neon-pink">${main}<span class="logo-dot">.</span></span>
        `;
      });
    }
  }

  // ==========================================
  // 3. HERO SECTION & CARDS
  // ==========================================
  if (data.hero) {
    const badge = document.querySelector('.hero-badge-container .badge-neon');
    if (badge && data.hero.badge) {
      badge.innerHTML = `<i class="fa-solid fa-bolt"></i> ${data.hero.badge}`;
    }

    const title = document.querySelector('.hero-title');
    if (title && data.hero.titlePrefix && data.hero.titleHighlight) {
      title.innerHTML = `${data.hero.titlePrefix} <span class="text-neon-pink">${data.hero.titleHighlight}</span>`;
    }

    const desc = document.querySelector('.hero-subtitle');
    if (desc && data.hero.description) desc.textContent = data.hero.description;

    // Quick Cards
    if (data.hero.quickCards && Array.isArray(data.hero.quickCards)) {
      data.hero.quickCards.forEach(card => {
        if (card.id === 'dj') {
          const el = document.querySelector('.feature-dj');
          if (el) {
            if (card.bgImage) el.style.backgroundImage = `url('${card.bgImage}')`;
            const h = el.querySelector('.feature-title');
            if (h && card.title) h.textContent = card.title;
            const p = el.querySelector('.feature-desc');
            if (p && card.desc) p.textContent = card.desc;
          }
        } else if (card.id === 'open') {
          const el = document.querySelector('.feature-open');
          if (el) {
            if (card.bgImage) el.style.backgroundImage = `url('${card.bgImage}')`;
            const h = el.querySelector('.feature-title');
            if (h && card.title) h.textContent = card.title;
            const p = el.querySelector('.feature-desc');
            if (p && card.desc) p.textContent = card.desc;
          }
        } else if (card.id === 'drinks') {
          const el = document.querySelector('.feature-drinks');
          if (el) {
            if (card.bgImage) el.style.backgroundImage = `url('${card.bgImage}')`;
            const h = el.querySelector('.feature-title');
            if (h && card.title) h.textContent = card.title;
            const p = el.querySelector('.feature-desc');
            if (p && card.desc) p.textContent = card.desc;
          }
        }
      });
    }
  }

  // ==========================================
  // 4. SEÇÃO QUEM SOMOS (ABOUT) & STATS
  // ==========================================
  if (data.about) {
    const aboutTitle = document.querySelector('.about-content .section-title');
    if (aboutTitle && data.about.title) aboutTitle.textContent = data.about.title;

    const aboutLead = document.querySelector('.about-lead');
    if (aboutLead && data.about.leadParagraph) aboutLead.textContent = data.about.leadParagraph;

    if (data.about.stats && data.about.stats.length >= 4) {
      const counters = document.querySelectorAll('.counter-number');
      counters.forEach((c, i) => {
        if (data.about.stats[i]) {
          c.setAttribute('data-target', data.about.stats[i].number);
          c.textContent = data.about.stats[i].number;
        }
      });
    }
  }

  // ==========================================
  // 5. EVENTOS DINÂMICOS
  // ==========================================
  if (data.events && Array.isArray(data.events) && data.events.length > 0) {
    const eventsGrid = document.querySelector('.events-grid');
    if (eventsGrid) {
      eventsGrid.innerHTML = data.events.map((ev, index) => {
        const cat = ev.genre === 'deep-house' ? 'house' : (ev.genre === 'hip-hop' ? 'hiphop' : (ev.genre === 'sunset-vip' ? 'vip' : 'edm'));
        return `
          <div class="event-card glass-card" data-category="${cat}">
            <div class="event-media">
              <img src="${ev.image}" alt="${ev.title}" class="event-img">
              <div class="event-date-badge">
                <span class="date-day">${(ev.date || '24').match(/\d+/) ? (ev.date.match(/\d+/)[0]) : '24'}</span>
                <span class="date-month">OUT</span>
              </div>
              <span class="event-status-badge badge-pink"><i class="fa-solid fa-fire"></i> ${ev.status || 'Ingressos Disponíveis'}</span>
            </div>
            <div class="event-body">
              <div class="event-meta flex-between">
                <span class="event-genre text-neon-cyan"><i class="fa-solid fa-bolt"></i> ${ev.genreLabel || ev.genre}</span>
                <span class="event-time"><i class="fa-solid fa-clock"></i> ${ev.time || '22:00 - 06:00'}</span>
              </div>
              <h3 class="event-title">${ev.title}</h3>
              <p class="event-lineup"><i class="fa-solid fa-music"></i> <strong>Lineup:</strong> ${ev.lineup}</p>
              <div class="event-footer flex-between">
                <div class="event-price">
                  <span class="price-label">A partir de</span>
                  <span class="price-value text-neon-pink">R$ ${ev.price || 90},00</span>
                </div>
                <button class="btn btn-cyan btn-sm btn-buy-ticket" data-id="${ev.id || index + 1}" data-name="${ev.title}" data-price="${ev.price || 90}" data-date="${ev.date}">
                  <i class="fa-solid fa-ticket"></i> Ingressos
                </button>
              </div>
            </div>
          </div>
        `;
      }).join('');

      // Re-vincular eventos de compra de ingressos se existir o script events.js
      if (window.initEventModals) window.initEventModals();
    }
  }

  // ==========================================
  // 6. DJS RESIDENTES DINÂMICOS
  // ==========================================
  if (data.djs && Array.isArray(data.djs) && data.djs.length > 0) {
    const djsGrid = document.querySelector('.djs-grid');
    if (djsGrid) {
      djsGrid.innerHTML = data.djs.map((dj, index) => `
        <div class="dj-card glass-card">
          <div class="dj-image-wrapper">
            <img src="${dj.image}" alt="${dj.name}" class="dj-img">
            <div class="dj-overlay flex-center">
              <button class="dj-play-btn" data-track="${dj.trackId || (index % 3) + 1}" aria-label="Ouvir Set de ${dj.name}">
                <i class="fa-solid fa-play"></i>
              </button>
            </div>
            <div class="dj-badge-role">${dj.role || 'Residente'}</div>
          </div>
          <div class="dj-info">
            <span class="dj-style text-neon-pink">${dj.style}</span>
            <h3 class="dj-name">${dj.name}</h3>
            <p class="dj-bio">${dj.bio}</p>
            <div class="dj-socials flex-center">
              <a href="${dj.soundcloud || '#'}" aria-label="SoundCloud" class="dj-social-link"><i class="fa-brands fa-soundcloud"></i></a>
              <a href="${dj.spotify || '#'}" aria-label="Spotify" class="dj-social-link"><i class="fa-brands fa-spotify"></i></a>
              <a href="${dj.instagram || '#'}" aria-label="Instagram" class="dj-social-link"><i class="fa-brands fa-instagram"></i></a>
            </div>
          </div>
        </div>
      `).join('');
    }
  }

  // ==========================================
  // 7. SERVIÇOS VIP / TABELA DE VALORES
  // ==========================================
  if (data.vipServices) {
    if (data.vipServices.bistro) {
      const p = document.querySelector('.service-price-bistro, [data-vip="bistro"] .price');
      if (p) p.textContent = `R$ ${data.vipServices.bistro.price}`;
    }
    if (data.vipServices.mezzanine) {
      const p = document.querySelector('.service-price-mezzanine, [data-vip="mezzanine"] .price');
      if (p) p.textContent = `R$ ${data.vipServices.mezzanine.price}`;
    }
    if (data.vipServices.blackGold) {
      const p = document.querySelector('.service-price-blackgold, [data-vip="blackgold"] .price');
      if (p) p.textContent = `R$ ${data.vipServices.blackGold.price}`;
    }
  }

  // ==========================================
  // 8. CONTATOS, WHATSAPP & HORÁRIOS
  // ==========================================
  if (data.contacts) {
    // Endereço
    document.querySelectorAll('.contact-val-address, .footer-address, .contact-address-text').forEach(el => {
      el.textContent = data.contacts.address;
    });

    // Telefone
    document.querySelectorAll('.contact-val-phone, .top-bar-phone, .contact-phone-text').forEach(el => {
      el.textContent = data.contacts.phone;
    });

    // WhatsApp
    if (data.contacts.whatsapp) {
      const cleanWa = data.contacts.whatsapp.replace(/[^0-9]/g, '');
      document.querySelectorAll('.contact-val-whatsapp, .whatsapp-link').forEach(el => {
        el.textContent = data.contacts.whatsapp;
        if (el.tagName === 'A') el.href = `https://wa.me/${cleanWa}`;
      });
    }

    // E-mail
    document.querySelectorAll('.contact-val-email, .footer-email, .contact-email-text').forEach(el => {
      el.textContent = data.contacts.email;
    });
  }
}

function setupFormIntegrations() {
  // 1. Formulário de Contato
  const contactForm = document.querySelector('.contact-form, #contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('[name="name"]')?.value || contactForm.querySelector('#contact-name')?.value || '';
      const email = contactForm.querySelector('[name="email"]')?.value || contactForm.querySelector('#contact-email')?.value || '';
      const phone = contactForm.querySelector('[name="phone"]')?.value || contactForm.querySelector('#contact-phone')?.value || '';
      const subject = contactForm.querySelector('[name="subject"]')?.value || contactForm.querySelector('#contact-subject')?.value || 'Contato Site';
      const message = contactForm.querySelector('[name="message"]')?.value || contactForm.querySelector('#contact-message')?.value || '';

      try {
        const res = await fetch('/api/contacts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, phone, subject, message })
        });
        const json = await res.json();
        if (json.success) {
          alert('Sua mensagem foi enviada com sucesso ao nosso Concierge VIP!');
          contactForm.reset();
        }
      } catch (err) {
        console.log('Mensagem processada localmente.');
      }
    });
  }

  // 2. Formulário de Lista VIP (Popup)
  const vipPopupForm = document.querySelector('.vip-popup-form, #vip-popup-form');
  if (vipPopupForm) {
    vipPopupForm.addEventListener('submit', async (e) => {
      const nameInput = vipPopupForm.querySelector('input[type="text"]');
      const emailInput = vipPopupForm.querySelector('input[type="email"]');
      const phoneInput = vipPopupForm.querySelector('input[type="tel"]');

      if (nameInput && emailInput) {
        try {
          await fetch('/api/guestlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: nameInput.value,
              email: emailInput.value,
              phone: phoneInput ? phoneInput.value : ''
            })
          });
        } catch (err) {
          // Fallback gracioso
        }
      }
    });
  }
}

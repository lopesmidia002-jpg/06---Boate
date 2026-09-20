/**
 * LOS ANGELES CLUB - MAIN APPLICATION SCRIPT
 * Version: 1.0.0
 */

document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initCountdownTimer();
  initSmoothScroll();
  initMobileDrawer();
  initHeroParticles();
  initStatsCounters();
  initAboutShowcase();
  initDjCardActions();
  initMenuTabs();
  initFaqAccordion();
  initContactForm();
  initVipPopup();
  initNewsletterForm();
});

/**
 * Menu Category Tabs Switching
 */
function initMenuTabs() {
  const tabBtns = document.querySelectorAll('.menu-tab-btn');
  const tabPanes = document.querySelectorAll('.menu-tab-pane');

  if (!tabBtns.length || !tabPanes.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));

      btn.classList.add('active');
      const targetTab = btn.getAttribute('data-tab');
      const targetPane = document.getElementById(`tab-${targetTab}`);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });
}

/**
 * DJ Cards Set Preview Integration
 */
function initDjCardActions() {
  const djPlayBtns = document.querySelectorAll('.dj-play-btn');
  if (!djPlayBtns.length) return;

  djPlayBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const trackIndex = (parseInt(btn.getAttribute('data-track'), 10) - 1) || 0;

      if (window.clubAudio) {
        window.clubAudio.currentTrackIndex = trackIndex;
        window.clubAudio.updateTrackDisplay();
        if (!window.clubAudio.isPlaying) {
          window.clubAudio.togglePlay();
        }

        // Toggle icon feedback
        const icon = btn.querySelector('i');
        if (window.clubAudio.isPlaying) {
          djPlayBtns.forEach(b => b.querySelector('i').className = 'fa-solid fa-play');
          icon.className = 'fa-solid fa-pause';
        } else {
          icon.className = 'fa-solid fa-play';
        }
      }
    });
  });
}

/**
 * Animated Number Counters with IntersectionObserver
 */
function initStatsCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        statNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 2000;
          const start = 0;
          const startTime = performance.now();

          function updateNumber(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeOutProgress * (target - start) + start);

            counter.textContent = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateNumber);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsGrid = document.querySelector('.stats-grid');
  if (statsGrid) observer.observe(statsGrid);
}

/**
 * About Section Playlist & Live Set Interaction
 */
function initAboutShowcase() {
  const playlistItems = document.querySelectorAll('.playlist-item');
  const playPulseBtn = document.getElementById('about-play-set-btn');

  if (playlistItems.length) {
    playlistItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        playlistItems.forEach(i => i.classList.remove('active'));
        item.classList.add('active');

        if (window.clubAudio) {
          window.clubAudio.currentTrackIndex = index;
          window.clubAudio.updateTrackDisplay();
          if (!window.clubAudio.isPlaying) {
            window.clubAudio.togglePlay();
          }
        }
      });
    });
  }

  if (playPulseBtn) {
    playPulseBtn.addEventListener('click', () => {
      if (window.clubAudio) {
        window.clubAudio.togglePlay();
        const icon = playPulseBtn.querySelector('i');
        if (window.clubAudio.isPlaying) {
          icon.classList.remove('fa-play');
          icon.classList.add('fa-pause');
        } else {
          icon.classList.remove('fa-pause');
          icon.classList.add('fa-play');
        }
      }
    });
  }
}

/**
 * Interactive Neon Club Particles & Laser Background Canvas
 */
function initHeroParticles() {
  const canvas = document.getElementById('hero-particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const particleCount = 45;
  const colors = ['#00deff', '#f92056', '#a855f7', '#ffffff'];

  function resize() {
    const parentWidth = canvas.parentElement ? canvas.parentElement.offsetWidth : window.innerWidth;
    const maxClientWidth = document.documentElement.clientWidth || window.innerWidth;
    width = canvas.width = Math.min(parentWidth, maxClientWidth);
    height = canvas.height = canvas.parentElement ? canvas.parentElement.offsetHeight : window.innerHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.radius = Math.random() * 2.5 + 1;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.fadeSpeed = Math.random() * 0.01 + 0.005;
      this.growing = Math.random() > 0.5;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.growing) {
        this.alpha += this.fadeSpeed;
        if (this.alpha >= 0.8) this.growing = false;
      } else {
        this.alpha -= this.fadeSpeed;
        if (this.alpha <= 0.1) this.growing = true;
      }

      if (this.x < 0 || this.x > width || this.y < 0 || this.y > height) {
        this.reset();
      }
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 12;
      ctx.shadowColor = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  let laserAngle = 0;

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Dynamic sweeping laser beam effect
    laserAngle += 0.01;
    const laserX = width * 0.5 + Math.cos(laserAngle) * (width * 0.4);
    
    const grad = ctx.createRadialGradient(laserX, height * 0.2, 10, laserX, height * 0.2, width * 0.5);
    grad.addColorStop(0, 'rgba(0, 222, 255, 0.08)');
    grad.addColorStop(0.5, 'rgba(249, 32, 86, 0.04)');
    grad.addColorStop(1, 'transparent');
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Render particles
    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/**
 * Mobile Off-Canvas Drawer Management
 */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-menu-drawer');
  const backdrop = document.getElementById('mobile-menu-backdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

  if (!toggleBtn || !drawer || !backdrop) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    drawer.setAttribute('aria-hidden', 'false');
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    drawer.setAttribute('aria-hidden', 'true');
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  backdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) {
      closeDrawer();
    }
  });
}

/**
 * Sticky Header with Dynamic Glassmorphism on Scroll
 */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/**
 * Dynamic Countdown Timer for Upcoming Club Event
 */
function initCountdownTimer() {
  const daysEl = document.getElementById('timer-days');
  const hoursEl = document.getElementById('timer-hours');
  const minutesEl = document.getElementById('timer-minutes');
  const secondsEl = document.getElementById('timer-seconds');

  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Set target event date: Next Friday/Saturday at 23:00
  const now = new Date();
  const eventDate = new Date();
  eventDate.setDate(now.getDate() + ((5 + 7 - now.getDay()) % 7 || 7));
  eventDate.setHours(23, 0, 0, 0);

  function updateTimer() {
    const currentTime = new Date().getTime();
    const distance = eventDate.getTime() - currentTime;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

/**
 * Smooth Scroll with Active Link Highlighting
 */
function initSmoothScroll() {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/**
 * Audio Visualizer & Preview Player Logic
 */
function initAudioMiniPlayer() {
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const icon = document.getElementById('audio-icon');
  const visualizer = document.getElementById('audio-visualizer');

  if (!toggleBtn || !icon || !visualizer) return;

  let isPlaying = false;

  toggleBtn.addEventListener('click', () => {
    isPlaying = !isPlaying;
    if (isPlaying) {
      icon.classList.remove('fa-play');
      icon.classList.add('fa-pause');
      visualizer.classList.add('playing');
    } else {
      icon.classList.remove('fa-pause');
      icon.classList.add('fa-play');
      visualizer.classList.remove('playing');
    }
  });
}

/**
 * FAQ Accordion Expand/Collapse
 */
function initFaqAccordion() {
  const faqCards = document.querySelectorAll('.faq-card');
  if (!faqCards.length) return;

  faqCards.forEach(card => {
    const btn = card.querySelector('.faq-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      const isActive = card.classList.contains('active');
      
      // Fecha outros itens para comportamento acordeão único
      faqCards.forEach(c => c.classList.remove('active'));

      if (!isActive) {
        card.classList.add('active');
      }
    });
  });
}

/**
 * Contact Message Form Submission & Feedback
 */
function initContactForm() {
  const contactForm = document.getElementById('contact-msg-form');
  const successBox = document.getElementById('contact-form-success');

  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando Mensagem...';

    setTimeout(() => {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;

      if (successBox) {
        successBox.style.display = 'block';
        setTimeout(() => {
          successBox.style.display = 'none';
        }, 6000);
      }
    }, 1000);
  });
}

/**
 * VIP Guestlist & Discount Popup Modal
 */
function initVipPopup() {
  const vipModal = document.getElementById('vip-popup-modal');
  const openBtn = document.getElementById('open-vip-popup-btn');
  const closeBtn = document.getElementById('vip-popup-close-btn');
  const vipForm = document.getElementById('vip-guestlist-form');
  const vipResultBox = document.getElementById('vip-result-box');
  const vipCodeText = document.getElementById('vip-pass-code-text');

  if (!vipModal) return;

  const openPopup = () => {
    vipModal.classList.add('active');
    vipModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('vip-popup-open');
    document.body.style.overflow = 'hidden';
  };

  const closePopup = () => {
    vipModal.classList.remove('active');
    vipModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('vip-popup-open');
    document.body.style.overflow = '';
  };

  if (openBtn) openBtn.addEventListener('click', openPopup);
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  vipModal.addEventListener('click', (e) => {
    if (e.target === vipModal) closePopup();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && vipModal.classList.contains('active')) {
      closePopup();
    }
  });

  // Auto show after 12 seconds if not closed yet
  setTimeout(() => {
    const hasSeenPopup = sessionStorage.getItem('lac_vip_popup_seen');
    if (!hasSeenPopup && !vipModal.classList.contains('active')) {
      openPopup();
      sessionStorage.setItem('lac_vip_popup_seen', 'true');
    }
  }, 12000);

  if (vipForm) {
    vipForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedCode = `VIP-LAC-${randomNum}`;

      if (vipCodeText) vipCodeText.textContent = generatedCode;
      if (vipResultBox) vipResultBox.style.display = 'block';
      vipForm.style.display = 'none';
    });
  }
}

/**
 * Newsletter Form Subscription
 */
function initNewsletterForm() {
  const form = document.getElementById('footer-newsletter-form');
  const successMsg = document.getElementById('newsletter-success-msg');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const originalHtml = btn.innerHTML;

    btn.disabled = true;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Cadastrando...';

    setTimeout(() => {
      form.reset();
      btn.disabled = false;
      btn.innerHTML = originalHtml;
      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    }, 900);
  });
}

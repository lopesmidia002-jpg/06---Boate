/**
 * Los Angeles Club - Nightclub & Lounge
 * js/gallery.js - Módulo de Galeria da Noite (Club Gallery) & Lightbox Interativo
 */

document.addEventListener('DOMContentLoaded', () => {
  initGalleryFilter();
  initLightbox();
});

// Dados da Galeria
const galleryData = [
  {
    id: 1,
    title: 'Main Stage Laser Show • Martin Garrix Live',
    category: 'stage',
    categoryName: 'Main Stage & Lasers',
    src: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    desc: 'Mais de 100 feixes de laser 3D e efeitos pirotécnicos iluminando a pista principal com mais de 2.000 pessoas.'
  },
  {
    id: 2,
    title: 'Camarote Black & Gold Experience',
    category: 'vip',
    categoryName: 'VIP Lounge',
    src: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=600&q=80',
    desc: 'Atendimento exclusivo com garrafas Dom Pérignon Luminous e vista panorâmica para o palco principal.'
  },
  {
    id: 3,
    title: 'DJ Marcus Vortex na Cabine Principal',
    category: 'djs',
    categoryName: 'DJs & Shows',
    src: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=600&q=80',
    desc: 'Madrugada histórica com set exclusivo de Peak Time Big Room e synth arpeggios imersivos.'
  },
  {
    id: 4,
    title: 'Mixologia Autoral no Neon Bar',
    category: 'drinks',
    categoryName: 'Drinks & Vibe',
    src: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&q=80',
    desc: 'Coquetéis artesanais com infusões botânicas e apresentação iluminada por LEDs e fumaça aromática.'
  },
  {
    id: 5,
    title: 'Sunset to Sunrise • Terraço Panorâmico',
    category: 'vip',
    categoryName: 'VIP Lounge',
    src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=600&q=80',
    desc: 'Lounge ao ar livre com sofás capitonê, música ambiente Melodic House e coquetéis refinados.'
  },
  {
    id: 6,
    title: 'DJ Alexia Frost comandando a Pista',
    category: 'djs',
    categoryName: 'DJs & Shows',
    src: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?auto=format&fit=crop&w=600&q=80',
    desc: 'A residente dos sets mais aclamados trazendo a energia contagiante dos verões de Ibiza.'
  },
  {
    id: 7,
    title: 'Explosão de Confetes & CO2 Cannons',
    category: 'stage',
    categoryName: 'Main Stage & Lasers',
    src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?auto=format&fit=crop&w=600&q=80',
    desc: 'Momento de ápice no drop com canhões de nitrogênio criogênico e chuva de serpentinas metálicas.'
  },
  {
    id: 8,
    title: 'Champagne Shower & Pirotecnia VIP',
    category: 'drinks',
    categoryName: 'Drinks & Vibe',
    src: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=1200&q=85',
    thumb: 'https://images.unsplash.com/photo-1569919659476-f0852f6834b7?auto=format&fit=crop&w=600&q=80',
    desc: 'Celebração com bengalas de fogo e champagnes franceses servidos nos camarotes exclusivos.'
  }
];

let currentImageIndex = 0;
let visibleGalleryItems = [...galleryData];

/**
 * Filtro de Categorias da Galeria
 */
function initGalleryFilter() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-grid-item');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          item.style.display = 'none';
        }
      });

      // Atualiza lista visível para navegação do lightbox
      if (filterValue === 'all') {
        visibleGalleryItems = [...galleryData];
      } else {
        visibleGalleryItems = galleryData.filter(item => item.category === filterValue);
      }
    });
  });
}

/**
 * Lightbox em Tela Cheia
 */
function initLightbox() {
  const lightboxModal = document.getElementById('lightbox-modal');
  if (!lightboxModal) return;

  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const lightboxDesc = document.getElementById('lightbox-desc');
  const lightboxCategory = document.getElementById('lightbox-category');
  const lightboxCounter = document.getElementById('lightbox-counter');
  const closeBtn = document.getElementById('lightbox-close-btn');
  const prevBtn = document.getElementById('lightbox-prev-btn');
  const nextBtn = document.getElementById('lightbox-next-btn');

  const openLightbox = (index) => {
    currentImageIndex = index;
    const item = visibleGalleryItems[currentImageIndex];
    if (!item) return;

    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxDesc.textContent = item.desc;
    lightboxCategory.textContent = item.categoryName;
    lightboxCounter.textContent = `${currentImageIndex + 1} / ${visibleGalleryItems.length}`;

    lightboxModal.classList.add('active');
    lightboxModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    lightboxModal.classList.remove('active');
    lightboxModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  const showNext = () => {
    currentImageIndex = (currentImageIndex + 1) % visibleGalleryItems.length;
    openLightbox(currentImageIndex);
  };

  const showPrev = () => {
    currentImageIndex = (currentImageIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;
    openLightbox(currentImageIndex);
  };

  // Click nos cards da galeria
  document.querySelectorAll('.gallery-card-trigger').forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      const itemId = parseInt(card.getAttribute('data-id'), 10);
      const index = visibleGalleryItems.findIndex(item => item.id === itemId);
      if (index !== -1) {
        openLightbox(index);
      }
    });
  });

  // Botões de controle
  if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
  if (nextBtn) nextBtn.addEventListener('click', showNext);
  if (prevBtn) prevBtn.addEventListener('click', showPrev);

  // Fechar ao clicar no backdrop escuro
  lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal || e.target.classList.contains('lightbox-backdrop-target')) {
      closeLightbox();
    }
  });

  // Teclado (Esc, Setas)
  document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  });
}

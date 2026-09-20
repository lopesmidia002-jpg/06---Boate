/**
 * LOS ANGELES CLUB - EVENTS & TICKET CHECKOUT ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initEventFilters();
  initTicketModal();
});

/**
 * Filter Events by Musical Genre
 */
function initEventFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const eventCards = document.querySelectorAll('.event-card');

  if (!filterBtns.length || !eventCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      eventCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/**
 * Dynamic Ticket Modal & Checkout Calculator
 */
function initTicketModal() {
  const modal = document.getElementById('ticket-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const buyBtns = document.querySelectorAll('.btn-buy-ticket');
  const form = document.getElementById('ticket-form');
  const successBox = document.getElementById('ticket-success-message');
  const successClose = document.getElementById('modal-success-close');

  const modalEventName = document.getElementById('modal-event-name');
  const modalEventDate = document.getElementById('modal-event-date');
  const qtyInput = document.getElementById('ticket-quantity');
  const qtyMinus = document.getElementById('qty-minus');
  const qtyPlus = document.getElementById('qty-plus');
  const totalAmountEl = document.getElementById('ticket-total-amount');

  const tierPistaPrice = document.getElementById('tier-price-pista');
  const tierVipPrice = document.getElementById('tier-price-vip');
  const tierCamarotePrice = document.getElementById('tier-price-camarote');

  if (!modal) return;

  let currentBasePrice = 90;
  let currentTierMultiplier = 1;

  const openModal = (btn) => {
    const eventName = btn.getAttribute('data-name');
    const eventDate = btn.getAttribute('data-date');
    const basePrice = parseFloat(btn.getAttribute('data-price')) || 90;

    currentBasePrice = basePrice;
    if (modalEventName) modalEventName.textContent = eventName;
    if (modalEventDate) modalEventDate.textContent = eventDate;

    // Set prices for tiers
    if (tierPistaPrice) tierPistaPrice.textContent = `R$ ${currentBasePrice.toFixed(2).replace('.', ',')}`;
    if (tierVipPrice) tierVipPrice.textContent = `R$ ${(currentBasePrice * 2).toFixed(2).replace('.', ',')}`;
    if (tierCamarotePrice) tierCamarotePrice.textContent = `R$ ${(currentBasePrice * 20).toFixed(2).replace('.', ',')}`;

    // Reset Form
    if (form) {
      form.reset();
      form.style.display = 'block';
    }
    if (successBox) successBox.style.display = 'none';
    if (qtyInput) qtyInput.value = 1;

    currentTierMultiplier = 1;
    updateTotal();

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  buyBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(btn);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (successClose) successClose.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // Tier Radio Change
  const tierRadios = document.querySelectorAll('input[name="ticket_tier"]');
  tierRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      if (radio.value === 'pista') currentTierMultiplier = 1;
      else if (radio.value === 'vip') currentTierMultiplier = 2;
      else if (radio.value === 'camarote') currentTierMultiplier = 20;
      updateTotal();
    });
  });

  // Quantity Controls
  if (qtyMinus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val > 1) {
        qtyInput.value = val - 1;
        updateTotal();
      }
    });
  }

  if (qtyPlus && qtyInput) {
    qtyPlus.addEventListener('click', () => {
      let val = parseInt(qtyInput.value, 10) || 1;
      if (val < 10) {
        qtyInput.value = val + 1;
        updateTotal();
      }
    });
  }

  function updateTotal() {
    const qty = parseInt(qtyInput.value, 10) || 1;
    const total = currentBasePrice * currentTierMultiplier * qty;
    if (totalAmountEl) {
      totalAmountEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
  }

  // Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.style.display = 'none';
      if (successBox) {
        successBox.style.display = 'block';
      }
    });
  }
}

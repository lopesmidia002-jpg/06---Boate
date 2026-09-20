/**
 * LOS ANGELES CLUB - RESERVATION & VIP VOUCHER ENGINE
 */

document.addEventListener('DOMContentLoaded', () => {
  initReservationSystem();
});

function initReservationSystem() {
  const form = document.getElementById('reservation-form');
  const successCard = document.getElementById('reservation-success-card');
  const dateInput = document.getElementById('res-date');
  const comboSelect = document.getElementById('res-combo');
  const sectorRadios = document.querySelectorAll('input[name="res_sector"]');

  const summarySector = document.getElementById('res-summary-sector');
  const summaryPrice = document.getElementById('res-summary-price');
  const summaryCombo = document.getElementById('res-summary-combo');
  const summaryTotal = document.getElementById('res-summary-total');

  const voucherCodeDisplay = document.getElementById('voucher-code-display');
  const voucherHolderName = document.getElementById('voucher-holder-name');
  const voucherSectorName = document.getElementById('voucher-sector-name');
  const voucherDateTime = document.getElementById('voucher-datetime');
  const voucherGuests = document.getElementById('voucher-guests');

  const printBtn = document.getElementById('btn-print-voucher');
  const newResBtn = document.getElementById('btn-new-reservation');

  if (!form) return;

  // Set default minimum date to today and default value to upcoming Friday
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  if (dateInput) {
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    
    const nextFri = new Date();
    nextFri.setDate(today.getDate() + ((5 + 7 - today.getDay()) % 7 || 7));
    const friYyyy = nextFri.getFullYear();
    const friMm = String(nextFri.getMonth() + 1).padStart(2, '0');
    const friDd = String(nextFri.getDate()).padStart(2, '0');
    dateInput.value = `${friYyyy}-${friMm}-${friDd}`;
  }

  let sectorPrice = 400;
  let sectorName = 'Mesa Bistrô VIP';
  let comboPrice = 0;
  let comboName = 'Nenhum combo prévio';

  // Handle Sector Change
  sectorRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      sectorPrice = parseFloat(radio.getAttribute('data-price')) || 400;
      sectorName = radio.getAttribute('data-name') || 'Mesa Bistrô VIP';
      updateSummary();
    });
  });

  // Handle Combo Change
  if (comboSelect) {
    comboSelect.addEventListener('change', () => {
      const selectedOption = comboSelect.options[comboSelect.selectedIndex];
      comboPrice = parseFloat(comboSelect.value) || 0;
      comboName = selectedOption.getAttribute('data-name') || 'Nenhum combo prévio';
      updateSummary();
    });
  }

  function updateSummary() {
    const total = sectorPrice + comboPrice;
    if (summarySector) summarySector.textContent = sectorName;
    if (summaryPrice) summaryPrice.textContent = `R$ ${sectorPrice.toFixed(2).replace('.', ',')}`;
    if (summaryCombo) summaryCombo.textContent = comboName;
    if (summaryTotal) summaryTotal.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
  }

  updateSummary();

  // Handle Form Submission & Voucher Generation
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('res-name').value;
    const dateVal = dateInput.value;
    const timeVal = document.getElementById('res-time').value;
    const guests = document.getElementById('res-guests').value;

    // Generate Voucher Code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const voucherCode = `LAC-${randomNum}-VIP`;

    // Populate Voucher
    if (voucherCodeDisplay) voucherCodeDisplay.textContent = voucherCode;
    if (voucherHolderName) voucherHolderName.textContent = name;
    if (voucherSectorName) voucherSectorName.textContent = sectorName;
    
    // Format Date for voucher
    const dateParts = dateVal.split('-');
    const formattedDate = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
    if (voucherDateTime) voucherDateTime.textContent = `${formattedDate} às ${timeVal}h`;
    if (voucherGuests) voucherGuests.textContent = `${guests} Pessoas`;

    // Send to Backend API
    const email = document.getElementById('res-email')?.value || '';
    const phone = document.getElementById('res-phone')?.value || '';
    const totalEstimate = document.getElementById('summary-total')?.textContent || '';

    fetch('/api/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        phone,
        sector: sectorName,
        sectorName,
        date: dateVal,
        time: timeVal,
        guests,
        combo: comboName,
        comboName,
        totalEstimate
      })
    }).catch(() => {
      // Fallback gracioso
    });

    // Switch View
    form.style.display = 'none';
    if (successCard) {
      successCard.style.display = 'block';
      successCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });

  // Print Voucher
  if (printBtn) {
    printBtn.addEventListener('click', () => {
      window.print();
    });
  }

  // New Reservation Reset
  if (newResBtn) {
    newResBtn.addEventListener('click', () => {
      form.reset();
      form.style.display = 'block';
      if (successCard) successCard.style.display = 'none';
      sectorPrice = 400;
      sectorName = 'Mesa Bistrô VIP';
      comboPrice = 0;
      comboName = 'Nenhum combo prévio';
      updateSummary();
    });
  }
}

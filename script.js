const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => nav.classList.toggle('open'));
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });
}

const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const modal = document.getElementById('work-modal');
const openButtons = document.querySelectorAll('.open-modal');
const modalCloseButton = document.querySelector('.modal-close');
const modalBackdrop = document.querySelector('.modal-backdrop');
const modalContactLinks = document.querySelectorAll('.modal-contact');

const closeModal = () => {
  if (!modal) return;
  modal.classList.remove('active');
  modal.setAttribute('aria-hidden', 'true');
};

if (modal && openButtons.length) {
  openButtons.forEach((button) => {
    button.addEventListener('click', () => {
      document.getElementById('modal-title').textContent = button.dataset.title;
      document.getElementById('modal-type').textContent = button.dataset.type;
      document.getElementById('modal-description').textContent = button.dataset.description;
      document.getElementById('modal-extra').textContent = button.dataset.extra || '';
      modal.classList.add('active');
      modal.setAttribute('aria-hidden', 'false');
    });
  });

  modalCloseButton?.addEventListener('click', closeModal);
  modalBackdrop?.addEventListener('click', closeModal);
  modalContactLinks.forEach((link) => link.addEventListener('click', closeModal));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeModal();
  });
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitButton = contactForm?.querySelector('button[type="submit"]');

if (contactForm && formStatus && submitButton) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    formStatus.textContent = '';
    formStatus.className = 'form-status';
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    try {
      const response = await fetch(contactForm.action, {
        method: contactForm.method,
        body: new FormData(contactForm),
        headers: {
          Accept: 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el formulario');
      }

      contactForm.reset();
      formStatus.textContent = '¡Gracias! Tu mensaje fue enviado correctamente.';
      formStatus.classList.add('success');
    } catch (error) {
      formStatus.textContent = 'No pudimos enviar tu mensaje. Por favor, intentá nuevamente.';
      formStatus.classList.add('error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Enviar mensaje';
    }
  });
}

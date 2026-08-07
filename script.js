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
const modalReadLink = document.getElementById('modal-read-link');

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

      const readUrl = button.dataset.readUrl;
      const readLabel = button.dataset.readLabel || 'Leer el relato';
      if (modalReadLink) {
        if (readUrl) {
          modalReadLink.href = readUrl;
          modalReadLink.textContent = readLabel;
          modalReadLink.hidden = false;
        } else {
          modalReadLink.removeAttribute('href');
          modalReadLink.hidden = true;
        }
      }

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


const relatosToggle = document.getElementById('toggle-relatos');
const extraRelatos = Array.from(document.querySelectorAll('#relatos-grid .relato-extra'));

if (relatosToggle && extraRelatos.length) {
  relatosToggle.addEventListener('click', () => {
    const willExpand = relatosToggle.getAttribute('aria-expanded') !== 'true';

    extraRelatos.forEach((card) => {
      card.hidden = !willExpand;
    });

    relatosToggle.setAttribute('aria-expanded', String(willExpand));
    relatosToggle.textContent = willExpand ? 'Mostrar menos' : 'Ver los 24 relatos';

    if (!willExpand) {
      document.getElementById('relatos')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}



const teatroBreveToggle = document.getElementById('toggle-teatro-breve');
const extraTeatroBreve = Array.from(
  document.querySelectorAll('#teatro-breve-grid .teatro-breve-extra')
);

if (teatroBreveToggle && extraTeatroBreve.length) {
  teatroBreveToggle.addEventListener('click', () => {
    const willExpand = teatroBreveToggle.getAttribute('aria-expanded') !== 'true';

    extraTeatroBreve.forEach((card) => {
      card.hidden = !willExpand;
    });

    teatroBreveToggle.setAttribute('aria-expanded', String(willExpand));
    teatroBreveToggle.textContent = willExpand
      ? 'Mostrar menos'
      : 'Ver las 31 obras breves';

    if (!willExpand) {
      document.getElementById('teatro-breve')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitButton = contactForm?.querySelector('button[type="submit"]');
const workContactLinks = document.querySelectorAll('[data-contact-work]');
const contactMotive = contactForm?.querySelector('select[name="motivo"]');
const contactWork = contactForm?.querySelector('input[name="obra"]');
const contactMessage = contactForm?.querySelector('textarea[name="mensaje"]');

workContactLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const workTitle = link.dataset.contactWork;

    if (contactMotive) {
      contactMotive.value = 'Derechos de representación';
    }

    if (contactWork && workTitle) {
      contactWork.value = workTitle;
    }

    if (contactMessage && workTitle) {
      contactMessage.value = `Me interesa consultar la disponibilidad y los derechos de representación de ${workTitle}.`;
    }
  });
});

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

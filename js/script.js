/* Kota Town Part 3 JavaScript enhancements */
'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // Mark the current navigation page for accessibility.
  const currentFile = (location.pathname.split('/').pop() || 'Index.html').toLowerCase();
  document.querySelectorAll('.site-nav a').forEach(link => {
    if (link.getAttribute('href').toLowerCase() === currentFile) link.setAttribute('aria-current', 'page');
  });

  // Live search/filter for services and menu cards.
  document.querySelectorAll('[data-filter-input]').forEach(input => {
    const target = document.getElementById(input.dataset.filterInput);
    if (!target) return;
    const empty = document.getElementById(target.id === 'services-list' ? 'services-empty' : 'menu-empty');
    input.addEventListener('input', () => {
      const term = input.value.trim().toLocaleLowerCase();
      let visible = 0;
      target.querySelectorAll('[data-search-item]').forEach(item => {
        const match = item.textContent.toLocaleLowerCase().includes(term);
        item.classList.toggle('hidden-by-search', !match);
        if (match) visible++;
      });
      if (empty) empty.hidden = visible !== 0;
    });
  });

  // Accessible gallery lightbox using the native dialog element.
  const dialog = document.getElementById('image-lightbox');
  if (dialog) {
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('.lightbox-caption');
    document.querySelectorAll('[data-lightbox]').forEach(button => button.addEventListener('click', () => {
      image.src = button.dataset.lightbox;
      image.alt = button.dataset.caption || 'Enlarged Kota Town menu image';
      caption.textContent = button.dataset.caption || '';
      if (typeof dialog.showModal === 'function') dialog.showModal();
    }));
    dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
    dialog.addEventListener('close', () => { image.src = ''; });
  }

  // Date fields cannot select a date in the past.
  const dateField = document.getElementById('enq-date');
  if (dateField) dateField.min = new Date().toISOString().slice(0, 10);

  // Client-side validation and mailto hand-off. A static site has no server endpoint,
  // so the form deliberately prepares an email rather than pretending to submit it.
  document.querySelectorAll('[data-mail-form]').forEach(form => {
    const status = form.querySelector('[data-form-status]');
    form.querySelectorAll('input,select,textarea').forEach(field => {
      field.addEventListener('input', () => {
        if (field.checkValidity()) field.removeAttribute('aria-invalid');
      });
      field.addEventListener('change', () => {
        if (field.checkValidity()) field.removeAttribute('aria-invalid');
      });
    });
    form.addEventListener('submit', event => {
      event.preventDefault();
      let firstInvalid = null;
      form.querySelectorAll('input,select,textarea').forEach(field => {
        if (!field.checkValidity()) {
          field.setAttribute('aria-invalid', 'true');
          if (!firstInvalid) firstInvalid = field;
        } else field.removeAttribute('aria-invalid');
      });
      if (firstInvalid) {
        status.textContent = firstInvalid.validationMessage || 'Please complete the required fields correctly.';
        status.className = 'form-status error';
        firstInvalid.focus();
        return;
      }
      const data = new FormData(form);
      const type = form.dataset.formType;
      const subject = type === 'enquiry' ? 'Kota Town order enquiry' : 'Kota Town general message';
      const lines = type === 'enquiry'
        ? [`Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Phone: ${data.get('phone')}`, `Service: ${data.get('service')}`, `Preferred date: ${data.get('date')}`, `Quantity: ${data.get('quantity') || 'Not specified'}`, '', `Details: ${data.get('details')}`]
        : [`Name: ${data.get('name')}`, `Email: ${data.get('email')}`, `Topic: ${data.get('topic')}`, '', `Message: ${data.get('message')}`];
      const mailto = `mailto:kotatown@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`;
      const payload = Object.fromEntries(data.entries());
      payload._subject = subject;
      payload._captcha = 'true';
      payload._template = 'table';
      status.textContent = 'Your details are valid. Sending your enquiry…';
      status.className = 'form-status';
      // AJAX endpoint: FormSubmit sends the submitted form to the business email.
      // The recipient must activate the service from its first confirmation email.
      fetch('https://formsubmit.co/ajax/kotatown@gmail.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      }).then(response => {
        if (!response.ok) throw new Error('The online form service is not available.');
        return response.json();
      }).then(result => {
        if (result.success !== 'true' && result.success !== true) throw new Error('The form service did not confirm receipt.');
        status.textContent = 'Thank you. Your message has been submitted successfully.';
        status.className = 'form-status success';
        form.reset();
      }).catch(() => {
        status.textContent = 'Online submission is not available yet. Your email application will open with the message prepared; please review and send it there.';
        status.className = 'form-status error';
        window.location.href = mailto;
      });
    });
  });
});

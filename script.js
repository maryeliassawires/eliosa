/**
 * Eliosa Studio — Interactive Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navigation on Scroll
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 2. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isExpanded = navMenu.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking any nav link
    navMenu.querySelectorAll('.nav-link, .nav-cta').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Gallery Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const artworkCards = document.querySelectorAll('.artwork-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      artworkCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category.includes(filter)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // 4. Artwork Lightbox Modal
  const modal = document.getElementById('artworkModal');
  const modalImg = document.getElementById('modalImg');
  const modalTitle = document.getElementById('modalTitle');
  const modalMeta = document.getElementById('modalMeta');
  const modalClose = document.getElementById('modalClose');
  const modalInquireBtn = document.getElementById('modalInquireBtn');

  let currentArtworkName = '';

  document.querySelectorAll('.view-artwork-trigger').forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const card = trigger.closest('.artwork-card');
      const title = card.querySelector('.artwork-title').innerText;
      const technique = card.querySelector('.artwork-technique').innerText;
      const metaTag = card.querySelector('.artwork-meta-tag').innerText;
      const imgSrc = card.querySelector('.artwork-img').getAttribute('src');

      currentArtworkName = title;
      modalImg.src = imgSrc;
      modalImg.alt = title;
      modalTitle.innerText = title;
      modalMeta.innerHTML = `<strong>Medium & Details:</strong><br>${technique.replace(/\n/g, '<br>')}<br><br><span class="section-badge">${metaTag}</span>`;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });

  // 5. Inquire Direct Button
  document.querySelectorAll('.btn-inquire').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const artworkTitle = btn.getAttribute('data-artwork') || 'Sacred Icon';
      openContactWithArtwork(artworkTitle);
    });
  });

  if (modalInquireBtn) {
    modalInquireBtn.addEventListener('click', () => {
      closeModal();
      openContactWithArtwork(currentArtworkName);
    });
  }

  function openContactWithArtwork(artworkName) {
    const contactSection = document.getElementById('contact');
    const interestSelect = document.getElementById('inquiryInterest');
    const messageField = document.getElementById('inquiryMessage');
    const contactForm = document.getElementById('contactForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    if (formSuccessMessage) formSuccessMessage.style.display = 'none';
    if (contactForm) contactForm.style.display = 'block';

    if (interestSelect) {
      interestSelect.value = 'Sacred Icons or Prints';
    }
    if (messageField) {
      messageField.value = `Hello Eliosa Studio,\n\nI am interested in acquiring or learning more about: "${artworkName}". Please let me know availability and pricing options.`;
    }

    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }

  // 6. Contact Form Submission (Google Forms Reliable Integration)
  const contactForm = document.getElementById('contactForm');
  const formSuccessMessage = document.getElementById('formSuccessMessage');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');
  const submitInquiryBtn = document.getElementById('submitInquiryBtn');
  const formEmailAddress = document.getElementById('formEmailAddress');
  const toast = document.getElementById('toastMsg');

  // Direct Google Form Action Endpoint
  const GOOGLE_FORM_ACTION_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdUX349ubMWNo6F0NVU2tW2vcQOQlz0YnG0lbxLeItynXwVJg/formResponse';

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      const name = document.getElementById('inquiryName').value.trim();
      const email = document.getElementById('inquiryEmail').value.trim();
      const interest = document.getElementById('inquiryInterest').value;
      const message = document.getElementById('inquiryMessage').value.trim();

      if (!name || !email || !message) {
        return; // HTML5 native validation handles required fields
      }

      // CRITICAL: Google Form requires 'emailAddress' field when "Collect emails" is enabled
      if (formEmailAddress) {
        formEmailAddress.value = email;
      }

      const originalBtnText = submitInquiryBtn ? submitInquiryBtn.innerText : 'Send Inquiry';
      if (submitInquiryBtn) {
        submitInquiryBtn.disabled = true;
        submitInquiryBtn.innerText = 'Sending Inquiry...';
      }

      // Dual-channel guarantee: also fire background fetch with required emailAddress
      try {
        const formData = new FormData();
        formData.append('emailAddress', email);
        formData.append('entry.1545196568', name);
        formData.append('entry.1322933981', email);
        formData.append('entry.1661348622', interest);
        formData.append('entry.1783411280', message);
        formData.append('fvv', '1');
        formData.append('pageHistory', '0');

        fetch(GOOGLE_FORM_ACTION_URL, {
          method: 'POST',
          mode: 'no-cors',
          body: formData
        }).catch((err) => {
          console.warn('Background fetch notification:', err);
        });
      } catch (err) {
        console.warn('Fetch fallback caught:', err);
      }

      // Native form targets google_form_target_iframe simultaneously
      setTimeout(() => {
        contactForm.style.display = 'none';
        if (formSuccessMessage) {
          formSuccessMessage.style.display = 'block';
        }
        showToast('Your inquiry has been submitted directly to Google Forms!');
        if (submitInquiryBtn) {
          submitInquiryBtn.disabled = false;
          submitInquiryBtn.innerText = originalBtnText;
        }
        contactForm.reset();
      }, 500);
    });
  }

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', () => {
      if (formSuccessMessage) formSuccessMessage.style.display = 'none';
      if (contactForm) contactForm.style.display = 'block';
    });
  }

  function showToast(text) {
    if (!toast) return;
    toast.innerText = text;
    toast.style.display = 'block';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 4500);
  }
});

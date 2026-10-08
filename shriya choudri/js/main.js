/**
 * SHRIYA CHOUDRI — PORTFOLIO JAVASCRIPT
 * Interactions, Smooth Navigation, Project Modal, Theme Switcher & Form Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initCustomCursor();
  initThemeToggle();
  initMobileMenu();
  initScrollSpy();
  initScrollAnimations();
  initProjectModals();
  initContactForm();
  initEmailClipboard();
  initBackToTop();
});

/* ==========================================================================
   1. CUSTOM CURSOR
   ========================================================================== */
function initCustomCursor() {
  const cursor = document.querySelector('.custom-cursor');
  const follower = document.querySelector('.custom-cursor-follower');
  
  if (!cursor || !follower) return;

  // Check if pointer is touch/coarse
  if (window.matchMedia('(pointer: coarse)').matches) {
    cursor.style.display = 'none';
    follower.style.display = 'none';
    return;
  }

  let posX = 0, posY = 0;
  let mouseX = 0, mouseY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    cursor.style.left = `${mouseX}px`;
    cursor.style.top = `${mouseY}px`;
  });

  // Smooth lerp follower
  function renderFollower() {
    posX += (mouseX - posX) * 0.15;
    posY += (mouseY - posY) * 0.15;

    follower.style.left = `${posX}px`;
    follower.style.top = `${posY}px`;

    requestAnimationFrame(renderFollower);
  }
  renderFollower();

  // Interactive hover states
  const interactives = document.querySelectorAll('a, button, input, textarea, .project-visual-wrapper, .skill-editorial-card, .pillar-card');
  interactives.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      cursor.classList.add('active');
      follower.classList.add('active');
    });
    el.addEventListener('mouseleave', () => {
      cursor.classList.remove('active');
      follower.classList.remove('active');
    });
  });
}

/* ==========================================================================
   2. THEME TOGGLE (Warm Off-White / Editorial Dark)
   ========================================================================== */
function initThemeToggle() {
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  if (!themeToggleBtn) return;

  const currentTheme = localStorage.getItem('shriya_theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);

  themeToggleBtn.addEventListener('click', () => {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const nextTheme = isDark ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('shriya_theme', nextTheme);
    updateThemeIcon(nextTheme);
  });

  function updateThemeIcon(theme) {
    themeToggleBtn.innerHTML = theme === 'dark' 
      ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
      : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
    themeToggleBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`);
  }
}

/* ==========================================================================
   3. MOBILE NAVIGATION MENU
   ========================================================================== */
function initMobileMenu() {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!hamburgerBtn || !mobileMenu) return;

  function toggleMenu() {
    const isOpen = hamburgerBtn.classList.toggle('is-active');
    mobileMenu.classList.toggle('is-open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
    hamburgerBtn.setAttribute('aria-expanded', isOpen);
  }

  hamburgerBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (hamburgerBtn.classList.contains('is-active')) {
        toggleMenu();
      }
    });
  });
}

/* ==========================================================================
   4. SCROLL SPY & ACTIVE NAV LINK
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollY = window.scrollY + 140;

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
}

/* ==========================================================================
   5. SCROLL ENTRANCE ANIMATIONS (IntersectionObserver)
   ========================================================================== */
function initScrollAnimations() {
  const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -50px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToReveal.forEach((el) => observer.observe(el));
}

/* ==========================================================================
   6. PROJECT MODAL DETAILS
   ========================================================================== */
const projectData = {
  'attendance': {
    title: 'Smart Attendance Management System',
    tagline: 'Automated biometric & facial recognition pipeline with real-time academic record synchronization.',
    image: 'assets/attendance_project.jpg',
    duration: 'Academic Term Project',
    role: 'Lead Developer & System Architect',
    technologies: 'Python, OpenCV, MediaPipe, SQLite, NumPy, Tkinter/Web UI',
    overview: 'The Smart Attendance Management System was developed to eliminate manual roll-call inefficiencies in academic institutions. By integrating real-time facial recognition algorithms, the system automatically detects, matches, and logs student attendance in milliseconds, exporting verifiable reports for faculty review.',
    features: [
      'Real-time multi-face detection and landmark tracking using optimized computer vision pipelines.',
      'Anti-spoofing and confidence threshold verification to prevent fraudulent proxy attendance.',
      'Automated synchronization with student relational database, supporting section and subject-wise filtering.',
      'Comprehensive reporting engine generating exportable CSV/Excel analytics and attendance shortfall alerts.',
      'Lightweight local architecture engineered to operate efficiently even on standard institution hardware.'
    ],
    github: 'https://github.com/shriyachoudri-jpg',
    demo: '#'
  },
  'dsa-engine': {
    title: 'Algorithm & Data Structure Suite',
    tagline: 'High-performance implementations and visual representations of core data structures and graph algorithms in C & Java.',
    image: 'assets/attendance_project.jpg',
    duration: 'Ongoing Exploration',
    role: 'Developer',
    technologies: 'C, Java, OOPS, DSA, File I/O',
    overview: 'A deep-dive technical repository exploring algorithm efficiency, time-space complexity optimization, memory allocation patterns, and custom implementations of non-linear data structures including AVL trees, graph traversal algorithms, and hash map collision resolvers.',
    features: [
      'Custom implementation of Balanced Binary Search Trees (AVL & Red-Black concepts).',
      'Graph pathfinding and minimum spanning tree algorithms (Dijkstra, Prim, Kruskal).',
      'Dynamic memory management tracking and leak prevention modules in C.',
      'Comprehensive test suites measuring benchmark execution times across various input sizes.'
    ],
    github: 'https://github.com/shriyachoudri-jpg',
    demo: '#'
  }
};

function initProjectModals() {
  const modalOverlay = document.getElementById('project-modal');
  const closeBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body-container');
  const triggerButtons = document.querySelectorAll('[data-project-trigger]');

  if (!modalOverlay || !closeBtn || !modalBody) return;

  function openModal(projectId) {
    const data = projectData[projectId];
    if (!data) return;

    modalBody.innerHTML = `
      <img src="${data.image}" alt="${data.title}" class="modal-project-img" />
      <span class="project-index-num">PROJECT SPECS & ARCHITECTURE</span>
      <h2 class="modal-project-title">${data.title}</h2>
      <p class="modal-project-tagline">${data.tagline}</p>

      <div class="modal-specs-grid">
        <div>
          <span class="modal-spec-label">Timeline</span>
          <p class="modal-spec-value">${data.duration}</p>
        </div>
        <div>
          <span class="modal-spec-label">Role</span>
          <p class="modal-spec-value">${data.role}</p>
        </div>
        <div>
          <span class="modal-spec-label">Core Stack</span>
          <p class="modal-spec-value">${data.technologies}</p>
        </div>
      </div>

      <h3 class="modal-section-title">Overview</h3>
      <p style="color: var(--text-secondary); line-height: 1.7; margin-bottom: 1.5rem;">${data.overview}</p>

      <h3 class="modal-section-title">Key Engineering Highlights</h3>
      <ul class="modal-features-list">
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>

      <div class="modal-actions">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn-primary-editorial">
          View on GitHub ↗
        </a>
        <button class="btn-secondary-editorial" onclick="document.getElementById('project-modal').classList.remove('is-active'); document.body.style.overflow = '';">
          Close Spec
        </button>
      </div>
    `;

    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  }

  triggerButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const projectId = btn.getAttribute('data-project-trigger');
      openModal(projectId);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. CONTACT FORM VALIDATION & HANDLING
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const alertBox = document.getElementById('form-status-alert');

  if (!form || !alertBox) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.elements['name'].value.trim();
    const email = form.elements['email'].value.trim();
    const message = form.elements['message'].value.trim();

    if (!name || !email || !message) {
      showAlert('Please complete all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate clean editorial dispatch
    const submitBtn = form.querySelector('.form-submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending Message...';
    submitBtn.disabled = true;

    setTimeout(() => {
      showAlert('Thank you! Your message has been prepared. Shriya will be in touch shortly.', 'success');
      form.reset();
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }, 900);
  });

  function showAlert(msg, type) {
    alertBox.textContent = msg;
    alertBox.className = `form-status-alert ${type}`;
    alertBox.style.display = 'block';

    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 6000);
  }
}

/* ==========================================================================
   8. EMAIL CLIPBOARD UTILITY
   ========================================================================== */
function initEmailClipboard() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const emailText = copyBtn.getAttribute('data-email') || 'shriyachoudri@aitckm.edu.in';
    navigator.clipboard.writeText(emailText).then(() => {
      const original = copyBtn.innerHTML;
      copyBtn.innerHTML = '<span>✓ Copied to Clipboard</span>';
      setTimeout(() => {
        copyBtn.innerHTML = original;
      }, 2500);
    }).catch(() => {
      console.warn('Clipboard write prevented');
    });
  });
}

/* ==========================================================================
   9. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top');
  if (!backToTopBtn) return;

  backToTopBtn.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

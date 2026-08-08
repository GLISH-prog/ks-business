/* ============================================================
   KS BUSINESS — SCRIPT PRINCIPAL (Vanilla JS, sans dépendance)
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. NAVIGATION : fond au scroll ---------- */
  const nav = document.querySelector('.nav');
  const onScrollNav = () => {
    if (!nav) return;
    if (window.scrollY > 40) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  };
  onScrollNav();
  window.addEventListener('scroll', onScrollNav, { passive: true });

  /* ---------- 2. MENU MOBILE (burger) ---------- */
  const burger = document.querySelector('.nav__burger');
  const mobileMenu = document.querySelector('.nav__mobile');
  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      burger.classList.toggle('is-open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // Ferme le menu mobile au clic sur un lien
    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        burger.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ---------- 3. LIEN DE NAVIGATION ACTIF ---------- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('is-active');
    }
  });

  /* ---------- 4. REVELATION AU SCROLL (IntersectionObserver) ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Repli si IntersectionObserver indisponible
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ---------- 5. EFFET PARALLAX LEGER SUR LE HERO ---------- */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const offset = window.scrollY;
      if (offset < window.innerHeight) {
        heroBg.style.transform = `translateY(${offset * 0.18}px)`;
      }
    }, { passive: true });
  }

  /* ---------- 6. FORMULAIRES : soumission simulee ---------- */
  document.querySelectorAll('.form-lux').forEach((form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('button[type="submit"]');
      const successBox = form.parentElement.querySelector('.form-success');

      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours…';
        submitBtn.disabled = true;

        // Simulation d'un envoi (a remplacer par un appel API reel)
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          form.reset();
          if (successBox) {
            successBox.classList.add('is-visible');
            successBox.setAttribute('tabindex', '-1');
            successBox.focus();
          }
        }, 900);
      }
    });
  });

  /* ---------- 7. NEWSLETTER FOOTER ---------- */
  document.querySelectorAll('.footer__newsletter').forEach((nl) => {
    nl.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nl.querySelector('input');
      const btn = nl.querySelector('button');
      if (input && input.value.trim()) {
        btn.textContent = 'Merci !';
        input.value = '';
        setTimeout(() => { btn.textContent = 'S\'abonner'; }, 2500);
      }
    });
  });

  /* ---------- 8. SELECTEUR DE LANGUE (FR / EN — visuel) ---------- */
  document.querySelectorAll('.lang-switch').forEach((switcher) => {
    switcher.querySelectorAll('button').forEach((btn) => {
      btn.addEventListener('click', () => {
        switcher.querySelectorAll('button').forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        // Emplacement prevu pour une future logique i18n
      });
    });
  });

  /* ---------- 9. ANNEE COURANTE DANS LE FOOTER ---------- */
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = new Date().getFullYear();
  });

});

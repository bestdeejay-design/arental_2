(function () {
  'use strict';

  /* Prevent the browser's native hash autoscroll on load so our
     programmatic scroll (which accounts for the fixed navbar + section
     gap) is the single source of truth. Without this, a URL like
     index.html#services gets a native jump that fights Lenis. */
  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  /* ── Lenis smooth scroll (graceful fallback if CDN fails) ── */
  var lenis = null;
  if (typeof Lenis !== 'undefined') {
    lenis = new Lenis({
      duration: 1.2,
      easing: function (t) { return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      orientation: 'vertical',
      smoothWheel: true,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }

  // Null-safe scroll helpers: work with or without Lenis
  function scrollTo(target, opts) {
    opts = opts || {};
    var offset = opts.offset || 0;
    var top;
    if (typeof target === 'number') {
      top = target;
    } else if (target && target.getBoundingClientRect) {
      top = target.getBoundingClientRect().top + (window.scrollY || window.pageYOffset || 0);
    } else {
      return;
    }
    top += offset;
    if (lenis) {
      lenis.scrollTo(top, { duration: opts.duration || 1.2, easing: opts.easing });
    } else {
      window.scrollTo({ top: top, behavior: 'smooth' });
    }
  }

  function onScroll(cb) {
    if (lenis) {
      lenis.on('scroll', cb);
    } else {
      window.addEventListener('scroll', function () {
        cb({ animatedScroll: window.scrollY });
      }, { passive: true });
    }
  }

  /* ── Theme switcher ── */
  function setTheme(theme) {
    document.body.className = theme;
    try { localStorage.setItem('arental_theme', theme); } catch (e) {}
    document.querySelectorAll('.theme-btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme') === theme);
    });
  }

  document.querySelectorAll('.theme-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setTheme(btn.getAttribute('data-theme'));
    });
  });

  var savedTheme;
  try { savedTheme = localStorage.getItem('arental_theme'); } catch (e) {}
  setTheme(savedTheme || 'dark');

  /* ── Navbar hide/show on scroll ── */
  var navbar = document.getElementById('navbar');
  var lastScroll = 0;
  var anchoring = false;

  if (navbar) {
    onScroll(function (e) {
      if (anchoring) {
        navbar.classList.remove('hidden');
        return;
      }
      var currentScroll = e.animatedScroll;
      if (currentScroll > 80 && currentScroll > lastScroll) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
      lastScroll = currentScroll;
    });
  }

  /* ── Mobile menu ── */
  var burger = document.getElementById('navBurger');
  var overlay = document.getElementById('menuOverlay');

  if (burger && overlay) {
    function closeMenu() {
      overlay.classList.remove('open');
      burger.classList.remove('active');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      burger.focus();
    }

    function openMenu() {
      overlay.classList.add('open');
      burger.classList.add('active');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      var firstLink = overlay.querySelector('a');
      if (firstLink) firstLink.focus();
    }

    function toggleMenu() {
      if (overlay.classList.contains('open')) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-controls', 'menuOverlay');

    burger.addEventListener('click', toggleMenu);

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeMenu();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('open')) {
        closeMenu();
      }
    });
  }

  /* ── Review slider ── */
  var reviewIdx = 0;
  var track = document.getElementById('reviewsTrack');
  var dots = document.getElementById('reviewsDots');
  var prevBtn = document.getElementById('prevReview');
  var nextBtn = document.getElementById('nextReview');

  function updateReviews() {
    if (!track || !track.children.length) return;
    track.style.transform = 'translateX(' + (-reviewIdx * 100) + '%)';
    if (dots) {
      var dotEls = dots.querySelectorAll('.dot');
      dotEls.forEach(function (d, i) {
        d.classList.toggle('active', i === reviewIdx);
      });
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      reviewIdx = (reviewIdx + 1) % track.children.length;
      updateReviews();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (!track || !track.children.length) return;
      reviewIdx = (reviewIdx - 1 + track.children.length) % track.children.length;
      updateReviews();
    });
  }

  if (dots) {
    dots.querySelectorAll('.dot').forEach(function (dot, i) {
      dot.setAttribute('role', 'button');
      dot.setAttribute('tabindex', '0');
      dot.setAttribute('aria-label', 'Отзыв ' + (i + 1));
      dot.addEventListener('click', function () {
        reviewIdx = i;
        updateReviews();
      });
      dot.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          reviewIdx = i;
          updateReviews();
        }
      });
    });
  }

  setInterval(function () {
    if (!track || !track.children.length) return;
    reviewIdx = (reviewIdx + 1) % track.children.length;
    updateReviews();
  }, 5000);

  /* ── FAQ accordion ── */
  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', function () {
        faqItems.forEach(function (other) {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    }
  });

  /* ── Scroll reveal ── */
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });

  /* ── Animated counters ── */
  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var el = entry.target;
        var target = parseInt(el.getAttribute('data-target'), 10);
        var prefix = el.getAttribute('data-prefix') || '';
        var suffix = el.getAttribute('data-suffix') || '';
        if (isNaN(target)) return;
        var duration = 1500;
        var startTime = null;

        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          var progress = Math.min((timestamp - startTime) / duration, 1);
          var eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = prefix + Math.floor(eased * target) + suffix;
          if (progress < 1) {
            requestAnimationFrame(step);
          } else {
            el.textContent = prefix + target + suffix;
          }
        }

        requestAnimationFrame(step);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.counter').forEach(function (el) {
    counterObserver.observe(el);
  });

  /* ── Spotlight cursor ── */
  var spotlight = document.getElementById('spotlight');
  var hero = document.querySelector('.hero');

  if (spotlight && hero) {
    hero.addEventListener('mousemove', function (e) {
      var rect = hero.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      spotlight.style.left = e.clientX + 'px';
      spotlight.style.top = e.clientY + 'px';
      spotlight.classList.add('active');
    });

    hero.addEventListener('mouseleave', function () {
      spotlight.classList.remove('active');
    });
  }

  /* ── Logo scroll to top ── */
  var logoTop = document.getElementById('logoTop');
  if (logoTop) {
    logoTop.addEventListener('click', function () {
      scrollTo(0, { duration: 1.2 });
    });
    logoTop.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        scrollTo(0, { duration: 1.2 });
      }
    });
  }

  /* ── Back to top ── */
  var backToTop = document.getElementById('backToTop');

  if (backToTop) {
    onScroll(function (e) {
      if (e.animatedScroll > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      scrollTo(0, { duration: 1.2 });
    });
  }

  /* ── Contact form mailto ── */
  var contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = this.querySelector('input[type="text"]').value.trim();
      var phone = this.querySelector('input[type="tel"]').value.trim();
      var email = this.querySelector('input[type="email"]').value.trim();
      var message = this.querySelector('textarea').value.trim();

      var subject = encodeURIComponent('Заявка с сайта АТМОСФЕРА от ' + name);
      var body = encodeURIComponent(
        'Имя: ' + name + '\n' +
        'Телефон: ' + phone + '\n' +
        'Email: ' + email + '\n' +
        'Сообщение: ' + message
      );

      window.location.href = 'mailto:hello@arental.ru?subject=' + subject + '&body=' + body;
      alert('Спасибо! Мы получили вашу заявку и свяжемся с вами.');
    });
  }

  /* ── Smooth anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (!href || href.length <= 1) return;
      var target = document.getElementById(href.slice(1));
      if (!target) return;
      e.preventDefault();
      var navH = navbar ? navbar.offsetHeight : 0;
      var reveals = target.querySelectorAll('.reveal');
      var wasVisible = [];
      reveals.forEach(function (r, i) {
        wasVisible[i] = r.classList.contains('visible');
        r.style.transition = 'none';
        r.classList.add('visible');
      });
      var heading = target.querySelector('h2, h1, h3');
      var gap = heading ? (heading.getBoundingClientRect().top - target.getBoundingClientRect().top) : 0;
      reveals.forEach(function (r, i) {
        r.style.transition = '';
        if (!wasVisible[i]) r.classList.remove('visible');
      });
      anchoring = true;
      scrollTo(target, { duration: 1.2, offset: gap - navH - 8 });
      setTimeout(function () { anchoring = false; }, 1400);
      if (history.pushState) {
        history.pushState(null, '', href);
      } else {
        location.hash = href;
      }
    });
  });

  /* ── Honour initial URL hash on load ── */
  /* The inline <head> script strips the hash from the URL before the browser
     could perform its native fragment jump, then exposes it as
     window.__initialHash. We scroll to it here with a navbar-aware offset. */
  var initialHash = window.__initialHash || '';
  if (initialHash && initialHash.length > 1) {
    var initialTarget = document.getElementById(initialHash.slice(1));
    if (initialTarget) {
      var navH = navbar ? navbar.offsetHeight : 0;
      var reveals = initialTarget.querySelectorAll('.reveal');
      var wasVisible = [];
      reveals.forEach(function (r, i) {
        wasVisible[i] = r.classList.contains('visible');
        r.style.transition = 'none';
        r.classList.add('visible');
      });
      var heading = initialTarget.querySelector('h2, h1, h3');
      var gap = heading ? (heading.getBoundingClientRect().top - initialTarget.getBoundingClientRect().top) : 0;
      reveals.forEach(function (r, i) {
        r.style.transition = '';
        if (!wasVisible[i]) r.classList.remove('visible');
      });

      function runInitialScroll() {
        anchoring = true;
        scrollTo(initialTarget, { duration: 1.0, offset: gap - navH - 8 });
        /* Restore the hash in the address bar (replaceState never scrolls). */
        try { history.replaceState(null, '', initialHash); } catch (e) {}
        setTimeout(function () { anchoring = false; }, 1200);
      }

      /* Run after the browser's native fragment jump so ours wins. */
      if (document.readyState === 'complete') {
        setTimeout(runInitialScroll, 60);
      } else {
        window.addEventListener('load', function () {
          setTimeout(runInitialScroll, 60);
        });
        /* Fallback re-assert in case the native jump lands even later. */
        setTimeout(runInitialScroll, 900);
      }
    }
  }

})();

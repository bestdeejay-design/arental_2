(function () {
  'use strict';

  /* ── Lenis smooth scroll ── */
  var lenis = new Lenis({
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

  if (navbar) {
    lenis.on('scroll', function (e) {
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
    burger.addEventListener('click', function () {
      overlay.classList.toggle('open');
    });

    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        overlay.classList.remove('open');
      });
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
      dot.addEventListener('click', function () {
        reviewIdx = i;
        updateReviews();
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
      lenis.scrollTo(0, { duration: 1.2 });
    });
  }

  /* ── Back to top ── */
  var backToTop = document.getElementById('backToTop');

  if (backToTop) {
    lenis.on('scroll', function (e) {
      if (e.animatedScroll > 500) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    });

    backToTop.addEventListener('click', function () {
      lenis.scrollTo(0, { duration: 1.2 });
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
    });
  }

  /* ── Smooth anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          lenis.scrollTo(target, { duration: 1.2, offset: -60 });
        }
      }
    });
  });

})();

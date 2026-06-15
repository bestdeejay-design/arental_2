(function () {
  'use strict';

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

  var navbar = document.getElementById('navbar');
  var lastScroll = 0;

  if (navbar) {
    window.addEventListener('scroll', function () {
      var currentScroll = window.pageYOffset;
      if (currentScroll > 80 && currentScroll > lastScroll) {
        navbar.classList.add('hidden');
      } else {
        navbar.classList.remove('hidden');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

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

  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.length > 1) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

})();

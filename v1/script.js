(function () {
  'use strict';

  var navToggle = document.getElementById('navToggle');
  var mobileOverlay = document.getElementById('mobileOverlay');

  if (navToggle && mobileOverlay) {
    navToggle.addEventListener('click', function () {
      mobileOverlay.classList.toggle('open');
    });

    mobileOverlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileOverlay.classList.remove('open');
      });
    });
  }

  var reviewIdx = 0;
  var track = document.getElementById('reviewsTrack');
  var dotsContainer = document.getElementById('reviewsDots');
  var prevBtn = document.getElementById('prevReview');
  var nextBtn = document.getElementById('nextReview');

  function updateReviews() {
    if (!track) return;
    track.style.transform = 'translateX(' + (-reviewIdx * 100) + '%)';
    if (dotsContainer) {
      var dots = dotsContainer.querySelectorAll('.dot');
      dots.forEach(function (d, i) {
        d.classList.toggle('active', i === reviewIdx);
      });
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (!track || !track.children.length) return;
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

  if (dotsContainer) {
    dotsContainer.querySelectorAll('.dot').forEach(function (dot, i) {
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
  }, 6000);

  var faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(function (item) {
    var question = item.querySelector('.faq-question');
    if (question) {
      question.addEventListener('click', function () {
        item.classList.toggle('open');
      });
    }
  });

  var navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

})();

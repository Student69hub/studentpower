(function () {
  'use strict';

  var PAGES = ['index.html', 'policy.html', 'living-policy.html', 'about.html', 'contact.html'];
  var LEAVE_DURATION = 280;

  function getPageFromHref(href) {
    if (!href) return null;
    var path = href.split('?')[0].split('#')[0];
    var base = path.split('/').pop() || 'index.html';
    if (base === '' || base === '.') base = 'index.html';
    return PAGES.indexOf(base) !== -1 ? base : null;
  }

  function isInternalLink(link) {
    if (!link || link.target === '_blank' || link.getAttribute('rel') === 'external') return false;
    var href = link.getAttribute('href');
    if (!href || href.charAt(0) === '#') return false;
    var page = getPageFromHref(href);
    if (!page) return false;
    try {
      return new URL(link.href, location.href).origin === location.origin;
    } catch (e) {
      return true;
    }
  }

  function smoothNavigate(href) {
    document.body.classList.add('page-leaving');
    setTimeout(function () {
      location.href = href;
    }, LEAVE_DURATION);
  }

  function init() {
    initPageEnter();
    initNav();
    initPolicyCardsScroll();
    initSmoothScroll();
    initPageTransitions();
  }

  function initPageEnter() {
    var main = document.getElementById('main-content');
    if (!main || !main.classList.contains('page-enter')) return;
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        main.classList.remove('page-enter');
      });
    });
  }

  function initNav() {
    var toggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    if (!toggle || !navLinks) return;

    toggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.contains('is-open');
      navLinks.classList.toggle('is-open', !isOpen);
      toggle.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });

    navLinks.querySelectorAll('a:not(.nav-dropdown-toggle)').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        toggle.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });

    var dropdownToggles = document.querySelectorAll('.nav-dropdown-toggle');
    dropdownToggles.forEach(function (toggleLink) {
      toggleLink.addEventListener('click', function (e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          e.stopPropagation();
          var parentItem = this.closest('.nav-item-dropdown');
          parentItem.classList.toggle('is-open');
        }
      });
    });

    // Handle registered user text display in navbar
    if (localStorage.getItem('efootball_user_registered') === 'true') {
      var registerLinks = document.querySelectorAll('a[href="efootball-register.html"]');
      registerLinks.forEach(function (link) {
        if (link.closest('.nav-dropdown-menu')) {
          link.textContent = 'เช็คสถานะการสมัคร';
          link.style.setProperty('display', 'block', 'important');
          link.parentElement.style.setProperty('display', 'block', 'important');
        } else {
          link.style.display = 'none'; // hide generic buttons
        }
      });
    }
  }

  function initPolicyCardsScroll() {
    var cards = document.querySelectorAll('.policy-card');
    if (!cards.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { rootMargin: '0px 0px -50px 0px', threshold: 0.1 }
    );

    cards.forEach(function (card, i) {
      card.style.transitionDelay = (i * 0.1) + 's';
      observer.observe(card);
    });
  }

  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      var href = anchor.getAttribute('href');
      if (href === '#') return;
      var target = document.querySelector(href);
      if (target) {
        anchor.addEventListener('click', function (e) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
        });
      }
    });
  }

  function initPageTransitions() {
    document.body.addEventListener('click', function (e) {
      var link = e.target.closest('a');
      if (!link || !isInternalLink(link)) return;
      var href = link.getAttribute('href');
      var page = getPageFromHref(href);
      var current = getPageFromHref(location.pathname + location.search) || 'index.html';
      if (page === current) return;
      e.preventDefault();
      smoothNavigate(link.href);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
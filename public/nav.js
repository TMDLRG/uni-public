// nav.js — progressive enhancement for the grouped primary nav.
// Desktop open-on-hover/focus is pure CSS; this adds click/tap to open a group,
// the mobile hamburger, close-on-Escape, and close-on-outside-click, keeping
// aria-expanded in sync. The nav works without JS on desktop (hover/focus).
(function () {
  'use strict';
  var nav = document.querySelector('.site-nav');
  if (!nav) return;
  var toggle = nav.querySelector('.site-nav-toggle');
  var groups = Array.prototype.slice.call(nav.querySelectorAll('.nav-group'));

  function closeGroups(except) {
    groups.forEach(function (g) {
      if (g === except) return;
      g.classList.remove('open');
      var b = g.querySelector('.nav-group-btn');
      if (b) b.setAttribute('aria-expanded', 'false');
    });
  }
  function closeMenu() {
    nav.classList.remove('open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }

  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open) closeGroups(null);
    });
  }

  groups.forEach(function (g) {
    var btn = g.querySelector('.nav-group-btn');
    if (!btn) return;
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      var willOpen = !g.classList.contains('open');
      closeGroups(g);
      g.classList.toggle('open', willOpen);
      btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' || e.keyCode === 27) { closeGroups(null); closeMenu(); }
  });
  document.addEventListener('click', function (e) {
    if (!nav.contains(e.target)) { closeGroups(null); closeMenu(); }
  });
})();

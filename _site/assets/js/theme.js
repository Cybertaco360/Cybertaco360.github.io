(function () {
  'use strict';var root = document.documentElement;var systemTheme = window.matchMedia('(prefers-color-scheme: dark)');var preference;var toggle;

  try {
    preference = window.localStorage.getItem('theme');
  } catch (error) {
    // Theme switching still works when browser storage is unavailable.
  }

  function applyTheme() {
    var dark = preference === 'dark' ||
      (preference !== 'light' && systemTheme.matches);
    root.setAttribute('data-theme', dark ? 'dark' : 'light');
    if (toggle) {
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.querySelector('i').className = dark ? 'fas fa-sun' : 'fas fa-moon';
    }
  }

  // Apply before the stylesheet loads to avoid a flash of the wrong theme.
  applyTheme();
  systemTheme.addEventListener('change', applyTheme);

  document.addEventListener('DOMContentLoaded', function () {
    toggle = document.querySelector('.theme-toggle');
    if (!toggle) return;

    applyTheme();
    toggle.hidden = false;
    toggle.addEventListener('click', function () {
      preference = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme();
      try {
        window.localStorage.setItem('theme', preference);
      } catch (error) {
        // Keep the preference for this page even if it cannot be persisted.
      }
    });
  });
}());

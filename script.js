(function () {
  function setCopyrightYear() {
    var year = new Date().getFullYear();
    document.querySelectorAll('[data-year]').forEach(function (node) {
      node.textContent = String(year);
    });
  }

  function setupReveal() {
    var revealItems = document.querySelectorAll('.reveal');
    if (!revealItems.length) {
      return;
    }

    document.body.classList.add('reveal-ready');

    if (!('IntersectionObserver' in window)) {
      revealItems.forEach(function (item) {
        item.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    setCopyrightYear();
    setupReveal();
  });
})();

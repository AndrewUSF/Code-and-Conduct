(function () {
  function setCopyrightYearRange() {
    var startYear = 2026;
    var currentYear = new Date().getFullYear();
    var displayYear = currentYear > startYear
      ? String(startYear) + "-" + String(currentYear)
      : String(startYear);

    document.querySelectorAll("[data-copyright-year]").forEach(function (node) {
      node.textContent = displayYear;
    });
  }

  function setupPortraitImages() {
    var heroImages = document.querySelectorAll(".post-hero");
    if (!heroImages.length) {
      return;
    }

    function updateImageClass(img) {
      if (!img.naturalWidth || !img.naturalHeight) {
        return;
      }
      var isPortrait = img.naturalHeight / img.naturalWidth >= 1.15;
      img.classList.toggle("is-portrait", isPortrait);
    }

    heroImages.forEach(function (img) {
      if (img.complete) {
        updateImageClass(img);
      } else {
        img.addEventListener("load", function () {
          updateImageClass(img);
        });
      }
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
    setCopyrightYearRange();
    setupPortraitImages();
    setupReveal();
  });
})();

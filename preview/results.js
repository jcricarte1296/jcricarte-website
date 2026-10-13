(() => {
  const strip = document.querySelector('.jc-results-strip');
  if (!strip) return;
  const numbers = [...strip.querySelectorAll('.jc-counter')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame;
  let observer;
  let started = false;

  function finish() {
    cancelAnimationFrame(frame);
    numbers.forEach(el => { el.textContent = el.dataset.target; });
    strip.dataset.counted = 'true';
  }

  function start() {
    if (started) return;
    started = true;
    if (observer) observer.disconnect();
    if (reduced.matches) { finish(); return; }
    const startTime = performance.now();
    const duration = 1600;
    function tick(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      numbers.forEach(el => {
        el.textContent = Math.round(Number(el.dataset.target) * eased);
      });
      if (progress < 1) frame = requestAnimationFrame(tick);
      else finish();
    }
    frame = requestAnimationFrame(tick);
  }

  reduced.addEventListener('change', () => {
    if (reduced.matches) { started = true; if (observer) observer.disconnect(); finish(); }
  });
  if (reduced.matches || !('IntersectionObserver' in window)) {
    started = true;
    finish();
    return;
  }
  observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) start();
  }, { threshold: 0.25 });
  observer.observe(strip);
})();

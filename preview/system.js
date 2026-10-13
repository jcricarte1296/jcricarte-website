/* Scroll through the existing six growth stages, with a static readable fallback. */
(() => {
  const section = document.querySelector('#connected-system');
  const timeline = section?.querySelector('.jc-system-timeline');
  const items = [...(timeline?.querySelectorAll('.jc-system-item') || [])];
  if (!timeline || !items.length) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let geometryDirty = true;
  let centers = [];
  let start = 0;
  let length = 1;
  let observer;

  function update() {
    frame = 0;
    if (geometryDirty) {
      centers = items.map(item => item.offsetTop + item.offsetHeight / 2);
      start = centers[0];
      length = Math.max(1, centers[centers.length - 1] - start);
      timeline.style.setProperty('--jc-system-line-top', `${start}px`);
      timeline.style.setProperty('--jc-system-line-height', `${length}px`);
      geometryDirty = false;
    }
    const cursor = innerHeight * .65 - timeline.getBoundingClientRect().top;
    const progress = reduced.matches ? 1 : Math.max(0, Math.min(1, (cursor - start) / length));
    timeline.style.setProperty('--jc-system-progress', progress.toFixed(4));
    let current = -1;
    items.forEach((item, index) => {
      const reached = reduced.matches || centers[index] <= cursor;
      item.classList.toggle('is-active', reached);
      if (reached) {
        current = index;
        item.classList.add('is-visible');
      }
    });
    items.forEach((item, index) => item.classList.toggle('is-current', index === current));
  }

  function schedule(resize = false) {
    geometryDirty ||= resize;
    if (!frame) frame = requestAnimationFrame(update);
  }

  function configureMotion() {
    if (frame) cancelAnimationFrame(frame);
    observer?.disconnect();
    section.classList.remove('is-motion-ready');
    if (reduced.matches || !('IntersectionObserver' in window)) {
      items.forEach(item => item.classList.add('is-visible'));
    } else {
      observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      }, { threshold: .1 });
      items.forEach(item => observer.observe(item));
      section.classList.add('is-motion-ready');
    }
    geometryDirty = true;
    update();
  }

  timeline.addEventListener('focusin', event => {
    event.target.closest('.jc-system-item')?.classList.add('is-visible');
  });
  window.addEventListener('scroll', () => schedule(), { passive: true });
  window.addEventListener('resize', () => schedule(true), { passive: true });
  reduced.addEventListener('change', configureMotion);
  if ('ResizeObserver' in window) new ResizeObserver(() => schedule(true)).observe(timeline);
  if (document.fonts) document.fonts.ready.then(() => schedule(true));
  configureMotion();
})();

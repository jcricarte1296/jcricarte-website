(() => {
  const art = document.querySelector('.jc-hero-art');
  if (!art) return;
  const slides = [...art.querySelectorAll('.jc-mascot')];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let index = 0;
  let timer;

  function start() {
    clearInterval(timer);
    if (reduced.matches || document.hidden || slides.length < 2) return;
    timer = setInterval(() => {
      const next = (index + 1) % slides.length;
      if (!slides[next].complete || !slides[next].naturalWidth) return;
      slides[index].classList.remove('is-active');
      slides[next].classList.add('is-active');
      index = next;
    }, 3000);
  }

  reduced.addEventListener('change', start);
  document.addEventListener('visibilitychange', start);
  start();
})();

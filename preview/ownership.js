(() => {
  const map = document.querySelector('#about .jcr-own05-map');
  if (!map) return;
  const grid = map.querySelector('.jcr-own05-grid');
  const svg = map.querySelector('.jcr-own05-connectors');
  const portrait = map.querySelector('.jcr-own05-portrait');
  const profileLabel = map.querySelector('.jcr-own05-person-label');
  const nodes = [...map.querySelectorAll('[data-jcr05-select]')];
  const cards = [...map.querySelectorAll('.jcr-own05-card')];
  const lines = [...map.querySelectorAll('[data-jcr05-to]')];
  if (!grid || !svg || !portrait || nodes.length !== cards.length) return;
  const mobile = matchMedia('(max-width: 600px)');
  let frame = 0;

  function drawLines() {
    frame = 0;
    const bounds = (mobile.matches ? map : grid).getBoundingClientRect();
    if (!bounds.width || !bounds.height) return;
    const center = portrait.getBoundingClientRect();
    const x = center.left + center.width / 2 - bounds.left;
    const y = center.top + center.height / 2 - bounds.top;
    svg.setAttribute('viewBox', `0 0 ${bounds.width} ${bounds.height}`);
    lines.forEach(line => {
      const key = line.dataset.jcr05To;
      const target = mobile.matches
        ? nodes.find(node => node.dataset.jcr05Select === key)
        : map.querySelector(`.jcr-own05-${key}`);
      if (!target) return;
      const box = target.getBoundingClientRect();
      line.setAttribute('x1', x);
      line.setAttribute('y1', y);
      line.setAttribute('x2', box.left + box.width / 2 - bounds.left);
      line.setAttribute('y2', box.top + box.height / 2 - bounds.top);
    });
  }

  function schedule() {
    if (!frame) frame = requestAnimationFrame(drawLines);
  }

  function highlight(key) {
    nodes.forEach(node => node.classList.toggle('is-selected', node.dataset.jcr05Select === key));
    lines.forEach(line => line.classList.toggle('is-selected', line.dataset.jcr05To === key));
  }

  function updateLayout() {
    const focusedCard = cards.find(card => card.contains(document.activeElement));
    if (mobile.matches && focusedCard) {
      const key = focusedCard.id.replace('jcr05-card-', '');
      nodes.find(node => node.dataset.jcr05Select === key)?.focus();
    }
    map.classList.toggle('is-mobile-map', mobile.matches);
    if (profileLabel) {
      const parent = mobile.matches ? map : portrait;
      if (profileLabel.parentElement !== parent) parent.append(profileLabel);
    }
    cards.forEach(card => {
      card.hidden = mobile.matches;
      card.inert = mobile.matches;
    });
    schedule();
  }

  nodes.forEach(node => {
    node.addEventListener('focus', () => highlight(node.dataset.jcr05Select));
    node.addEventListener('pointerenter', () => highlight(node.dataset.jcr05Select));
  });
  mobile.addEventListener('change', updateLayout);
  map.classList.add('is-interactive');
  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(schedule);
    observer.observe(map);
    observer.observe(grid);
  } else {
    window.addEventListener('resize', schedule, { passive: true });
  }
  if (document.fonts) document.fonts.ready.then(schedule);
  updateLayout();
})();

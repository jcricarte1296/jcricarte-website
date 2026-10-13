/* Real card geometry keeps process arrows in the gaps across all breakpoints. */
(() => {
  const map = document.querySelector('.jc-system-map');
  if (!map) return;
  const diagram = map.querySelector('.jc-system-diagram');
  const grid = map.querySelector('.jc-system-grid');
  const owner = map.querySelector('.jc-system-owner');
  const cards = [...map.querySelectorAll('.jc-system-card')];
  const channels = [...map.querySelectorAll('.jc-system-channels li')];
  const svg = map.querySelector('.jc-system-connectors');
  const track = map.querySelector('.jc-system-scroll-track');
  const nodes = [...map.querySelectorAll('.jc-system-scroll-node')];
  if (!diagram || !grid || !owner || !svg || !track || cards.length !== 6 || nodes.length !== 6) return;
  const mobile = matchMedia('(max-width: 767px)');
  const desktop = matchMedia('(min-width: 1200px)');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let geometryDirty = true;

  function cardBox(card) {
    const x = grid.offsetLeft + card.offsetLeft;
    const y = grid.offsetTop + card.offsetTop;
    return { left: x, right: x + card.offsetWidth, top: y, bottom: y + card.offsetHeight, x: x + card.offsetWidth / 2, y: y + card.offsetHeight / 2 };
  }

  function drawConnections() {
    const width = diagram.offsetWidth;
    const height = diagram.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    const boxes = cards.map(cardBox);
    boxes.slice(0, -1).forEach((source, index) => {
      const target = boxes[index + 1];
      let d;
      if (Math.abs(source.top - target.top) < 10) {
        const rightward = target.x > source.x;
        d = `M ${rightward ? source.right + 5 : source.left - 5} ${source.y} L ${rightward ? target.left - 7 : target.right + 7} ${target.y}`;
      } else if (desktop.matches && index === 2) {
        const lane = source.right + 12;
        d = `M ${source.right + 4} ${source.y} H ${lane} V ${target.y} H ${target.right + 7}`;
      } else {
        const turn = (source.bottom + target.top) / 2;
        d = `M ${source.x} ${source.bottom + 5} V ${turn} H ${target.x} V ${target.top - 7}`;
      }
      svg.querySelector(`[data-route="${index + 1}-${index + 2}"]`).setAttribute('d', d);
    });

    const first = boxes[0];
    const last = boxes[5];
    const feedback = svg.querySelector('[data-route="6-1"]');
    if (desktop.matches) {
      const lane = first.left - 12;
      feedback.setAttribute('d', `M ${last.left - 4} ${last.y} H ${lane} V ${first.y} H ${first.left - 7}`);
      const root = diagram.getBoundingClientRect();
      const chips = channels.map(chip => {
        const rect = chip.getBoundingClientRect();
        return { x: rect.left - root.left + rect.width / 2, bottom: rect.bottom - root.top };
      });
      const bus = Math.max(...chips.map(chip => chip.bottom)) + 15;
      chips.forEach((chip, index) => {
        svg.querySelector(`[data-input="${index}"]`).setAttribute('d', `M ${chip.x} ${chip.bottom + 3} V ${bus} H ${first.x}`);
      });
      svg.querySelector('[data-wire="input-stem"]').setAttribute('d', `M ${first.x} ${bus} V ${first.top - 7}`);
    } else if (!mobile.matches) {
      const lane = first.left - 12;
      const below = last.bottom + 18;
      feedback.setAttribute('d', `M ${last.x} ${last.bottom + 4} V ${below} H ${lane} V ${first.y} H ${first.left - 7}`);
    }
    geometryDirty = false;
  }

  function updateProgress() {
    if (!mobile.matches) {
      map.classList.remove('is-scroll-ready');
      return;
    }
    const start = owner.offsetTop + owner.offsetHeight + 10;
    const milestones = cards.map(card => card.offsetTop + 38);
    const height = Math.max(1, milestones[5] - start);
    const cursor = innerHeight * .78 - grid.getBoundingClientRect().top;
    const progress = Math.max(0, Math.min(1, (cursor - start) / height));
    const animate = !reduced.matches;
    track.style.setProperty('--jc-system-track-top', `${start}px`);
    track.style.setProperty('--jc-system-track-height', `${height}px`);
    track.style.setProperty('--jc-system-progress', animate ? progress : 1);
    cards.forEach((card, index) => {
      nodes[index].style.setProperty('--jc-system-node-y', `${milestones[index] - start}px`);
      const reached = !animate || milestones[index] <= cursor;
      nodes[index].classList.toggle('is-reached', reached);
      if (reached || card.contains(document.activeElement)) card.classList.add('is-visible');
    });
    map.classList.toggle('is-scroll-ready', animate);
  }

  function schedule(resize = false) {
    geometryDirty = geometryDirty || resize;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      frame = 0;
      if (geometryDirty) drawConnections();
      updateProgress();
    });
  }
  window.addEventListener('scroll', () => { if (mobile.matches) schedule(); }, { passive: true });
  window.addEventListener('resize', () => schedule(true), { passive: true });
  mobile.addEventListener('change', () => schedule(true));
  desktop.addEventListener('change', () => schedule(true));
  reduced.addEventListener('change', () => schedule());
  grid.addEventListener('focusin', event => {
    const card = event.target.closest('.jc-system-card');
    if (card) card.classList.add('is-visible');
  });
  if ('ResizeObserver' in window) new ResizeObserver(() => schedule(true)).observe(diagram);
  if (document.fonts) document.fonts.ready.then(() => schedule(true));
  drawConnections();
  updateProgress();
})();

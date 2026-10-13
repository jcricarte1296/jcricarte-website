(() => {
  document.querySelectorAll('.jc-organizations').forEach(section => {
    if (section.classList.contains('is-ready')) return;
    const track = section.querySelector('.jc-organizations-track');
    const group = section.querySelector('.jc-organizations-group');
    const toggle = section.querySelector('.jc-organizations-toggle');
    if (!track || !group || !toggle) return;

    // Equal-width groups make the end of the loop match its first frame.
    const repeat = group.cloneNode(true);
    repeat.setAttribute('aria-hidden', 'true');
    repeat.querySelectorAll('img').forEach(image => { image.alt = ''; });
    track.appendChild(repeat);
    section.classList.add('is-ready');
    toggle.hidden = false;

    toggle.addEventListener('click', () => {
      const paused = section.classList.toggle('is-paused');
      const label = paused ? 'Resume logo animation' : 'Pause logo animation';
      toggle.setAttribute('aria-pressed', String(paused));
      toggle.setAttribute('aria-label', label);
      toggle.title = label;
    });
  });
})();

(() => {
  document.querySelectorAll('.jc-organizations').forEach(section => {
    if (section.classList.contains('is-ready')) return;
    const track = section.querySelector('.jc-organizations-track');
    const group = section.querySelector('.jc-organizations-group');
    if (!track || !group) return;

    // Equal-width groups make the end of the loop match its first frame.
    const repeat = group.cloneNode(true);
    repeat.setAttribute('aria-hidden', 'true');
    repeat.querySelectorAll('img').forEach(image => { image.alt = ''; });
    track.appendChild(repeat);
    section.classList.add('is-ready');
  });
})();

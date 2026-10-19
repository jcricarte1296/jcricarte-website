(() => {
  const header = document.querySelector('.jc-header');
  if (!header) return;
  const menu = header.querySelector('.jc-menu-toggle');
  const nav = header.querySelector('.jc-navigation');
  if (!menu || !nav) return;

  function closeMenu() {
    menu.setAttribute('aria-expanded', 'false');
    menu.setAttribute('aria-label', 'Open navigation');
    nav.classList.remove('is-open');
  }

  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    nav.classList.toggle('is-open', open);
  });
  header.addEventListener('click', event => {
    if (event.target.closest('a')) closeMenu();
  });
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) closeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu();
      menu.focus();
    }
  });
  header.addEventListener('focusout', () => {
    setTimeout(() => {
      if (!header.contains(document.activeElement)) closeMenu();
    }, 0);
  });
  matchMedia('(max-width:1200px)').addEventListener('change', closeMenu);
})();

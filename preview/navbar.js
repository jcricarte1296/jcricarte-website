(() => {
 const header = document.querySelector('.jc-header');
 const menu = header.querySelector('.jc-menu-toggle');
 const nav = header.querySelector('.jc-navigation');
 const services = header.querySelector('.jc-services-toggle');
 const dropdown = header.querySelector('.jc-dropdown');
 function closeServices(){services.setAttribute('aria-expanded','false');dropdown.hidden=true;}
 function closeMenu(){menu.setAttribute('aria-expanded','false');menu.setAttribute('aria-label','Open navigation');nav.classList.remove('is-open');closeServices();}
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));menu.setAttribute('aria-label',open?'Close navigation':'Open navigation');nav.classList.toggle('is-open',open);if(!open)closeServices();});
 services.addEventListener('click',()=>{const open=services.getAttribute('aria-expanded')!=='true';services.setAttribute('aria-expanded',String(open));dropdown.hidden=!open;});
 header.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
 document.addEventListener('click',e=>{if(!header.contains(e.target))closeMenu();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(services.getAttribute('aria-expanded')==='true'){closeServices();services.focus();}else if(menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();}}});
 header.addEventListener('focusout',()=>{setTimeout(()=>{if(!header.contains(document.activeElement))closeMenu();},0);});
 matchMedia('(max-width:850px)').addEventListener('change',closeMenu);
})();
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#menu');
function setMenu(open, restoreFocus = false) {
  menu.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Fechar índice' : 'Abrir índice');
  if (restoreFocus) menuButton.focus();
}
menuButton.addEventListener('click', () => setMenu(menu.hidden));
menu.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
document.addEventListener('click', event => { if (!event.target.closest('.navigation')) setMenu(false); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && !menu.hidden) setMenu(false, true); });
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', event => {
  const target = document.querySelector(link.getAttribute('href'));
  if (!target) return;
  event.preventDefault();
  history.pushState(null, '', link.getAttribute('href'));
  target.setAttribute('tabindex', '-1');
  target.focus({preventScroll:true});
  target.scrollIntoView({behavior:reducedMotion.matches ? 'instant' : 'smooth',block:'start'});
}));

const toast = document.querySelector('.toast');
let toastTimer;
function notify(message) {
  clearTimeout(toastTimer); toast.textContent = message; toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2600);
}
document.querySelectorAll('[data-color]').forEach(button => button.addEventListener('click', async () => {
  try { await navigator.clipboard.writeText(button.dataset.color); notify(`Cor ${button.dataset.color} copiada.`); }
  catch { notify(`Código da cor: ${button.dataset.color}`); }
}));

const imageDialog = document.querySelector('.image-dialog');
const descriptions = {recepcao:'Recepção Life Sculp / mockup fornecido',papelaria:'Papelaria Life Sculp / mockup fornecido',uniforme:'Uniforme Life Sculp / mockup fornecido'};
document.querySelectorAll('.zoom-image').forEach(button => button.addEventListener('click', () => {
  const key = button.dataset.image;
  imageDialog.querySelector('img').src = `assets/${key}-1254.webp`;
  imageDialog.querySelector('img').alt = button.querySelector('img').alt;
  imageDialog.querySelector('p').textContent = descriptions[key];
  imageDialog.showModal();
  document.body.style.overflow = 'hidden';
}));
imageDialog.querySelector('button').addEventListener('click', () => imageDialog.close());
imageDialog.addEventListener('click', event => { if (event.target === imageDialog) imageDialog.close(); });
imageDialog.addEventListener('close', () => { document.body.style.overflow = ''; });

// Each text remains a single accessible phrase; decorative spans only control ink density.
const readings = [...document.querySelectorAll('.read-text')].map(element => {
  const words = [...element.childNodes].map(node => node.nodeName === 'BR' ? ' ' : node.textContent).join('').trim().split(/\s+/);
  element.setAttribute('aria-label', words.join(' '));
  element.replaceChildren(...words.flatMap((word, index) => {
    const span = document.createElement('span'); span.className = 'word'; span.textContent = word; span.setAttribute('aria-hidden','true');
    return index ? [document.createTextNode(' '), span] : [span];
  }));
  return {element, words:[...element.querySelectorAll('.word')]};
});
const revealTargets = document.querySelectorAll('.line-reveal,.reveal-logo,.reveal-image');
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) {
    entry.target.classList.add('is-visible');
    entry.target.querySelectorAll('.reveal-logo').forEach(logo => logo.classList.add('is-visible'));
    observer.unobserve(entry.target);
  }
}), {threshold:0.12});
// Observe the unmasked frame: a fully clipped SVG has a zero intersection area.
revealTargets.forEach(target => observer.observe(target.classList.contains('reveal-logo') ? target.parentElement : target));
const parallax = [...document.querySelectorAll('.hero-art,.chapter-art')];
const progress = document.querySelector('.reading-progress');
let framePending = false;
function renderScroll() {
  framePending = false;
  const height = window.innerHeight;
  const max = document.documentElement.scrollHeight - height;
  progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  if (reducedMotion.matches) return;
  readings.forEach(({element, words}) => {
    const box = element.getBoundingClientRect();
    if (box.bottom < 0 || box.top > height) return;
    const amount = Math.max(0, Math.min(1, (height * .92 - box.top) / (height * .47)));
    words.forEach((word,index) => word.style.setProperty('--word-opacity', amount >= index / words.length ? 1 : .22));
  });
  parallax.forEach(element => {
    const box = element.parentElement.getBoundingClientRect();
    if (box.bottom < 0 || box.top > height) return;
    const shift = Math.max(-65,Math.min(65, -box.top * .08));
    element.style.transform = `translate3d(0,${shift}px,0)`;
  });
}
function requestScrollFrame() { if (!framePending) {framePending = true; requestAnimationFrame(renderScroll);} }
function configureMotion() {
  document.documentElement.classList.toggle('motion-enabled', !reducedMotion.matches);
  if (reducedMotion.matches) parallax.forEach(element => element.style.removeProperty('transform'));
  requestScrollFrame();
}
addEventListener('scroll', requestScrollFrame, {passive:true});
addEventListener('resize', requestScrollFrame, {passive:true});
reducedMotion.addEventListener('change', configureMotion);
configureMotion();

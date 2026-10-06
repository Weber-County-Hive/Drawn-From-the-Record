const cards = [...document.querySelectorAll('.comic-card')];
const filters = [...document.querySelectorAll('.filter')];
const count = document.querySelector('#result-count');
function filterCards(selected = 'all') {
 let visible = 0;
 cards.forEach(card => { card.hidden = selected !== 'all' && !card.dataset.tags.split(' ').includes(selected); if (!card.hidden) visible++; });
 count.textContent = `${visible} cartoon${visible === 1 ? '' : 's'}`;
 filters.forEach(button => { const active = button.dataset.filter === selected; button.classList.toggle('active', active); button.setAttribute('aria-pressed', String(active)); });
}
filters.forEach(button => button.addEventListener('click', () => filterCards(button.dataset.filter)));
filterCards();
const dialog = document.querySelector('#lightbox');
const fullImage = document.querySelector('#lightbox-image');
const title = document.querySelector('#lightbox-title');
const close = document.querySelector('#close-lightbox');
let opener;
document.querySelectorAll('.comic-image').forEach(button => {
 button.addEventListener('click', () => {
  opener = button; fullImage.src = new URL(button.dataset.image, document.baseURI).href;
  fullImage.alt = button.querySelector('img').alt; title.textContent = button.dataset.title; dialog.showModal();
 });
 const img = button.querySelector('img');
 img.addEventListener('error', () => { if (!button.querySelector('.image-error')) { const message = document.createElement('span'); message.className = 'image-error'; message.textContent = 'Image unavailable. Please contact Weber County Hive.'; button.append(message); } });
});
close.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => { fullImage.removeAttribute('src'); opener?.focus(); });
document.querySelectorAll('.comic-image img, #lightbox-image').forEach(img => {
 img.draggable = false;
 img.addEventListener('contextmenu', event => event.preventDefault());
 img.addEventListener('dragstart', event => event.preventDefault());
});

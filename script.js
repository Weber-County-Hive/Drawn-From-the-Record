const filterButtons = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.comic-card')];
const count = document.querySelector('#result-count');

filterButtons.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filterButtons.forEach(item => {
    const isActive = item === button;
    item.classList.toggle('active', isActive);
    item.setAttribute('aria-pressed', String(isActive));
  });
  let visible = 0;
  cards.forEach(card => {
    const matches = selected === 'all' || card.dataset.tags.split(' ').includes(selected);
    card.hidden = !matches;
    if (matches) visible++;
  });
  count.textContent = `${visible} comic${visible === 1 ? '' : 's'}`;
}));

const dialog = document.querySelector('#lightbox');
const dialogImage = document.querySelector('#lightbox-image');
const dialogTitle = document.querySelector('#lightbox-title');

document.querySelectorAll('.comic-image').forEach(button => button.addEventListener('click', () => {
  dialogImage.src = button.dataset.image;
  dialogImage.alt = button.querySelector('img').alt;
  dialogTitle.textContent = button.dataset.title;
  dialog.showModal();
}));

document.querySelector('#close-lightbox').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

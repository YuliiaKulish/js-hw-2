import { galleryItems } from './gallery-items.js';

const galleryListRef = document.querySelector('.gallery');

const markup = galleryItems
  .map(
    ({ preview, original, description }) => `
    <li class="gallery__item">
      <a class="gallery__link" href="${original}">
        <img
          class="gallery__image"
          src="${preview}"
          data-source="${original}"
          alt="${description}"
        />
      </a>
    </li>
    `
  )
  .join('');

galleryListRef.innerHTML += markup;

const openModalItem = event => {
  event.preventDefault();
  if (event.target.nodeName !== 'IMG') {
    return;
  }

  const instance = basicLightbox.create(`
        <img src="${event.target.dataset.source}" width="800" height="600">
    `);

  instance.show();

  const closeOnEscape = event => {
    if (event.key === 'Escape') {
      instance.close();
      document.removeEventListener('keydown', closeOnEscape);
    }
  };

  document.addEventListener('keydown', closeOnEscape);
};

galleryListRef.addEventListener('click', openModalItem);
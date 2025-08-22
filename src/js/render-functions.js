import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox;
let loaderEl;



export function createGallery(images = []) {


  const markup = images
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
      <div class="photo-card">
        <a class="gallery__item" href="${largeImageURL}">
          <img class="gallery__image" src="${webformatURL}" alt="${tags}" loading="lazy" />
        </a>
        <ul class="info">
          <li><b>Likes:</b> ${likes}</li>
          <li><b>Views:</b> ${views}</li>
          <li><b>Comments:</b> ${comments}</li>
          <li><b>Downloads:</b> ${downloads}</li>
        </ul>
      </div>`
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('#gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    lightbox.refresh();
  }
}


export function clearGallery() {
  const gallery = document.querySelector('#gallery');
  if (gallery) gallery.innerHTML = '';
}


function ensureLoader() {
  if (!loaderEl) {
    loaderEl = document.createElement('div');
    loaderEl.classList.add('loader', 'is-hidden');
    loaderEl.innerHTML = `<span class="loader__spinner"></span>`;
    document.querySelector('form').insertAdjacentElement('afterend', loaderEl);
  }
}

export function showLoader() {
  
  loaderEl.classList.remove('is-hidden');
}

export function hideLoader() {
  if (loaderEl) {
    loaderEl.classList.add('is-hidden');
  }
}

export function showLoadMoreButton() {
    moreBtn.classList.remove('is-hidden');
}

export function hideLoadMoreButton() {
    moreBtn.classList.add('is-hidden');
}


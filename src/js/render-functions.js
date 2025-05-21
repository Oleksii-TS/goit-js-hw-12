import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

export function createGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        const keywords = tags.split(',').slice(0, 5).join(', ');

        return `
      <li class="gallery-item">
        <a href="${largeImageURL}" data-lightbox="gallery">
          <img class="gallery-image" src="${webformatURL}" alt="${keywords}" loading="lazy" />
        </a>
        <div class="info">
          <div class="image-info">
            <div class="info-item">
              <p class="info-title"><b>❤️ likes:</b></p>
              <p class="info-value">${likes}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>👁️ views:</b></p>
              <p class="info-value">${views}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>💬 comments:</b></p>
              <p class="info-value">${comments}</p>
            </div>
            <div class="info-item">
              <p class="info-title"><b>⬇️ downloads:</b></p>
              <p class="info-value">${downloads}</p>
            </div>
          </div>
        </div>
      </li>`;
      }
    )
    .join('');

  galleryContainer.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function showLoader() {
  document.getElementById('loader').hidden = false;
}

export function hideLoader() {
  document.getElementById('loader').hidden = true;
}

export function clearGallery() {
  galleryContainer.innerHTML = '';
}

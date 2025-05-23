import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.min.css';

const paginationContainer = document.getElementById('pagination');
let pagination = null;
const perPage = 15;

const form = document.querySelector('.form');
const input = form.querySelector("input[name='search-text']");
const loadMoreBtn = document.querySelector('.load-more-btn');

let currentPage = 1;
let currentQuery = '';
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) {
    iziToast.warning({
      message: 'Please enter a search query.',
      position: 'topRight',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  loadMoreBtn.hidden = true;

  if (pagination) {
    paginationContainer.innerHTML = '';
    pagination = null;
  }

  try {
    showLoader();
    const data = await getImagesByQuery(currentQuery, currentPage);

    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.error({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      loadMoreBtn.hidden = true;
      return;
    }

    createGallery(data.hits);

    if (currentPage * perPage < totalHits) {
      loadMoreBtn.hidden = false;
    } else {
      loadMoreBtn.hidden = true;
    }

    pagination = new Pagination(paginationContainer, {
      totalItems: totalHits,
      itemsPerPage: perPage,
      visiblePages: 5,
      page: currentPage,
      centerAlign: true,
    });

    pagination.on('afterMove', async event => {
      const page = event.page;
      if (page !== currentPage) {
        currentPage = page;
        loadMoreBtn.hidden = true;
        showLoader();

        try {
          const data = await getImagesByQuery(currentQuery, currentPage);

          clearGallery();
          createGallery(data.hits);

          if (currentPage * perPage < totalHits) {
            loadMoreBtn.hidden = false;
          } else {
            loadMoreBtn.hidden = true;
            iziToast.info({
              message:
                "We're sorry, but you've reached the end of search results.",
              position: 'topRight',
            });
          }

          const galleryItems = document.querySelectorAll(
            '.gallery .gallery-item'
          );
          if (galleryItems.length > 0) {
            const { height: cardHeight } =
              galleryItems[0].getBoundingClientRect();
            window.scrollBy({
              top: cardHeight * 2,
              behavior: 'smooth',
            });
          }
        } catch (error) {
          iziToast.error({
            message: `Error: ${error.message}`,
            position: 'topRight',
          });
        } finally {
          hideLoader();
        }
      }
    });
  } catch (error) {
    iziToast.error({
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  currentPage += 1;
  loadMoreBtn.hidden = true;
  showLoader();

  try {
    const data = await getImagesByQuery(currentQuery, currentPage);

    createGallery(data.hits);

    const galleryItems = document.querySelectorAll('.gallery .gallery-item');
    if (galleryItems.length > 0) {
      const { height: cardHeight } = galleryItems[0].getBoundingClientRect();
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });
    }

    if (currentPage * perPage >= totalHits) {
      loadMoreBtn.hidden = true;
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      loadMoreBtn.hidden = false;
    }

    if (pagination) {
      pagination.movePageTo(currentPage);
    }
  } catch (error) {
    iziToast.error({
      message: `Error: ${error.message}`,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

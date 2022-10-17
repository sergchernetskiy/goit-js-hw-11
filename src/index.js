import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { refs } from './js/refs';
import { pixabayAPI } from './js/pixabayAPI';
import { createMarkup } from './js/createMarkup';
import { onSpinnerStart, onSpinnerStop } from './js/spinner';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const pixabay = new pixabayAPI();
//console.log(pixabay);
const lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });

refs.form.addEventListener('submit', onSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSubmit(event) {
  event.preventDefault();

  onSpinnerStart();

  const {
    elements: { searchQuery },
  } = event.currentTarget;
  const request = searchQuery.value.trim().toLowerCase();
  //console.log(request);

  if (!request) {
    Notify.failure('Enter the search data');
    onSpinnerStop();
    return;
  }

  pixabay.request = request;
  clearPage();

  try {
    const { hits, total } = await pixabay.getPhotos();
    if (hits.length === 0) {
      Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      onSpinnerStop();
      return;
    }

    createMarkup(hits);
    //console.log(hits);
    pixabay.calculateTotalPages(total);
    Notify.success(`${total} images found`);
    refs.form.reset();
    lightbox.refresh();

    if (pixabay.isShowLoadMore) {
      refs.loadMoreBtn.classList.remove('is-hidden');
      onLoadMore();
    }
    onSpinnerStop();
  } catch (error) {Notify.failure(error.message, 'Request error');
    clearPage();
}
  
function onLoadMore() {
  pixabay.increment();
  if (!pixabay.isShowLoadMore) {
    refs.loadMoreBtn.classList.add('is-hidden');
    Notify.info(
      'We are sorry, but you have reached the end of search results.'
    );
  }
  pixabay
    .getPhotos()
    .then(({ hits }) => {
      createMarkup(hits);
      lightbox.refresh();
    })
    .catch(error => {
      Notify.failure(error.message, 'Request error');
      clearPage();
    });
}

function clearPage() {
  pixabay.resetPage();
  refs.loadMoreBtn.classList.add('is-hidden');
  refs.list.innerHTML = '';
}

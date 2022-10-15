import { refs } from './refs';

export function createMarkup(photos) {
  const markup = photos
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
        return `<div class="gallery">
      <a class='link' href="${largeImageURL}">
      <img src="${webformatURL}" alt="${tags}" loading="lazy" width='270' height='170' />
  <div class="gallery__info">
      <p class="gallery__item link">
        <b>Likes</b> ${likes}
      </p>
      <p class="gallery__item link">
        <b>Views</b> ${views}
      </p>
      <p class="gallery__item link">
        <b>Comments</b> ${comments}
      </p>
      <p class="gallery__item link">
        <b>Downloads</b> ${downloads}
      </p>
  </div>
      </a>
  </div>`;
      }
    )
    .join('');

  refs.list.insertAdjacentHTML('beforeend', markup);
}

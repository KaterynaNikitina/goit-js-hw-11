import Notiflix from 'notiflix';
import SearchImages from './api-service';
import LoadMoreBtn from './load-more-btn';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let markup = '';

const searchForm = document.querySelector('#search-form');
const galleryCards = document.querySelector('.gallery');
// const loadBtn = document.querySelector('load-more');

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  isHidden: true,
});

const searchImages = new SearchImages();

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.button.addEventListener('click', onLoadMore);

function onSubmit(ev) {
  ev.preventDefault();

  clearHitsMarkup();

  // const searchQuery = ev.target.elements.searchQuery.value.trim();
  // if (!searchQuery) {
  //   Notiflix.Notify.failure('Please enter your request');
  //   return;
  // }
  // searchImages.query = searchQuery;

  searchImages.searchQuery = ev.target.elements.searchQuery.value.trim();
  if (!searchImages.searchQuery) {
    Notiflix.Notify.failure('Please enter your request');
    return;
  }
  
  console.log(searchImages.searchQuery);
  searchImages.resetPage();
  loadMoreBtn.show();

onLoadMore().finally(() => searchForm.reset());
};

function renderMarkup({ largeImageURL, webformatURL, tags, likes, views, comments, downloads}) {
  return `
  <div class="photo-card">
  <a class='photo-link' href="${largeImageURL }">
  <img class ="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  </a>
  <div class="info">
    <p class="info-item">
      <b>Likes</b>${likes}
    </p>
    <p class="info-item">
      <b>Views</b>${views}
    </p>
    <p class="info-item">
      <b>Comments</b>${comments}
    </p>
    <p class="info-item">
      <b>Downloads</b>${downloads}
    </p>
  </div>
</div>
  `
;
};

function updateHitsMarkup(markup) {
  galleryCards.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}

function clearHitsMarkup() {
  galleryCards.innerHTML = '';
}

function checkingTotalHits(countImg, totalHits) {
  if (countImg >= totalHits) {
    loadMoreBtn.hide();
    loadMoreBtn.resetCountImg();
    Notiflix.Notify.failure(
      "We're sorry, but you've reached the end of search results."
    );
  }
}
async function onLoadMore() {
  loadMoreBtn.disable();
  try {
    const { hits, totalHits } = await searchImages.getImages();
    console.log({ hits, totalHits });
    searchImages.countImg += hits.length;
    checkingTotalHits(searchImages.countImg, totalHits);

    const nextLoad = hits.reduce(
      (markup, hits) => renderMarkup(hits) + markup,
      ''
    );

    updateHitsMarkup(nextLoad);
    loadMoreBtn.enable();
  } catch (error) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again!'
    );
  }
}



import Notiflix from 'notiflix';
import SearchImages from './api-service';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

let markup = '';

const searchForm = document.querySelector('#search-form');
const galleryCards = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');


searchForm.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);
  
const searchImages = new SearchImages();

let gallery = new SimpleLightbox('.gallery a', { 
  captionsData: "alt",
  captionDelay: 250,
});

function onSubmit(ev) {
    ev.preventDefault();

    clearHitsMarkup() 
    
    const searchQuery = ev.currentTarget.elements.searchQuery.value.trim();
    // searchImages.query = ev.currentTarget.elements.query.value;


    console.log(searchQuery);
    searchImages.resetPage(); 
    

    searchImages.getImages()
      .then(response => {
        console.log(response.data);
      return response.data;
    })
      .then(renderMarkup)
      .then(updateHitsMarkup);
          
    }

    function onLoadMore(ev) {
      searchImages.getImages().then(data => console.log(data));
         
  }

function renderMarkup({hits})  {
  
    markup = hits
        .map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => 
            `<div class="photo-card">
            <a class='photo-link' href="${largeImageURL}">
            <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
          </div>`
        ).join('');
  
        return markup;
      }

      updateHitsMarkup(markup);

function updateHitsMarkup(markup) {
    
    galleryCards.insertAdjacentHTML("beforeend", markup); 
    gallery.refresh();
  }

  function clearHitsMarkup() {
    galleryCards.innerHTML = '';
  }

// if (searchQuery = '') {
    //   return Notiflix.Notify.info('Please enter a valid request')
    // }
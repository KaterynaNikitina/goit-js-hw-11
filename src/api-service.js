import axios from 'axios';
import Notiflix from 'notiflix';

export default class SearchImages {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async getImages() {
    const API_URL = 'https://pixabay.com/api/';
    const API_KEY = '33444425-aa967b3bfdbb34722499531dc';

    const image_type = 'photo';
    const orientation = 'horizontal';
    const safesearch = true;
    const per_page = 40;

    const URL = `${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=${image_type}&orientation=${orientation}&safesearch=${safesearch}&page=${this.page}&per_page=${per_page}`;

    console.log(this);

    const response = await axios.get(URL);
    this.incrementPage();
    return response;
    console.log(this);
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }
  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  resetPage() {
    this.page = 1;
  }
}










// export default class SearchImages {
//   constructor() {
//     this.queryPage = 1;
//     this.searchQuery = '';
//   }
//   async fetchImages() {
//     const API_URL = 'https://pixabay.com/api/';
//     const API_KEY = '33324048-b9ba4b7c70cb9631c17379677';
//     const response = await axios.get(
//       `${API_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.queryPage}`
//     );
//     this.incrementPage();
//     return response;
//   }
//   resetPage() {
//     this.queryPage = 1;
//   }
//   incrementPage() {
//     this.queryPage += 1;
//   }
//   get query() {
//     return this.searchQuery;
//   }
//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// // }

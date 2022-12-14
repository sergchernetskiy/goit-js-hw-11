import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export class pixabayAPI {
  #page = 1;
  #per_page = 40;
  #request = '';
  #total = 0;
  #options = {
    params: {
      key: '30566775-fc3edcf21448041b2c5bbe7c5',
      //q: this.#request,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: this.#per_page,
    },
  };

  async getPhotos() {
    const urlAXIOS = `?q=${this.#request}&page=${this.#page}`;
    const { data } = await axios.get(urlAXIOS, this.#options);
    return data;
  }

  set request(newRequest) {
    this.#request = newRequest;
  }

  get request() {
    return this.#request;
  }

  increment() {
    this.#page += 1;
  }

  resetPage() {
    this.#page = 1;
  }

  calculateTotalPages(total) {
    this.#total = Math.ceil(total / this.#per_page);
  }

  get isShowLoadMore() {
    return this.#page < this.#total;
  }
}

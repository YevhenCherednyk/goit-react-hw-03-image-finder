import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const API_KEY = '31186773-8484a0bc913959b467e4295b5';
const IMG_PER_PAGE = 12;

async function findImages(query, page = 1) {
  const url = `?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${IMG_PER_PAGE}`;
  const response = await axios.get(url);
  return response.data;
}

const api = {
  findImages,
};

export default api;

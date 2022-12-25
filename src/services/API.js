import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

async function findImages(url) {
  const response = await axios.get(url);
  return response.data;
}

const api = {
  findImages,
};

export default api;

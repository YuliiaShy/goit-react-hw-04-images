

const baseURL = 'https://pixabay.com/api/';

const KEY = '26838114-b92b6e9eb97735375e5f14aed';

const options = '&image_type=photo&orientation=horizontal';

const fetchImages = (searchQuery, page) => {
  const url = `${baseURL}?key=${KEY}&q=${searchQuery}${options}&per_page=12&page=${page}`;

  const { data } = (url);
  return data;
}; 

const api = {
  fetchImages
};

export default api;
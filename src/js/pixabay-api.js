import axios from 'axios';

const API_KEY = '50286619-c20e9afd7f4c04ec0a12478f1';
const BASE_URL = 'https://pixabay.com/api/';

export async function getImagesByQuery(query, page = 1, per_page = 15) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page,
  };
  try {
    const response = await axios.get(BASE_URL, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
}

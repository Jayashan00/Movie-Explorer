import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
console.log(
  'TMDb API key loaded:',
  Boolean(API_KEY)
);
const BASE_URL = 'https://api.themoviedb.org/3';
export const IMAGE_BASE = 'https://image.tmdb.org/t/p';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 12000,
  params: { api_key: API_KEY, language: 'en-US' },
});

export const tmdb = {
  trending: (page = 1) => api.get('/trending/movie/week', { params: { page } }),
  popular: (page = 1) => api.get('/movie/popular', { params: { page } }),
  topRated: (page = 1) => api.get('/movie/top_rated', { params: { page } }),
  upcoming: (page = 1) => api.get('/movie/upcoming', { params: { page } }),
  search: (query, page = 1, filters = {}) => api.get('/search/movie', {
    params: { query, page, include_adult: false, ...filters },
  }),
  discover: (page = 1, filters = {}) => api.get('/discover/movie', {
    params: { page, include_adult: false, sort_by: 'popularity.desc', ...filters },
  }),
  details: (id) => api.get(`/movie/${id}`, { params: { append_to_response: 'credits,videos,similar,recommendations' } }),
  genres: () => api.get('/genre/movie/list'),
};

export const posterUrl = (path, size = 'w500') => path ? `${IMAGE_BASE}/${size}${path}` : '';
export const backdropUrl = (path) => path ? `${IMAGE_BASE}/original${path}` : '';
export default api;

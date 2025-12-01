import axios from 'axios';

// Use environment variable for API URL, fallback to localhost for development
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

console.log('🔗 API Base URL:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Admin APIs
export const adminLogin = (credentials) => 
  api.post('/admin/login', credentials);

// Movie APIs
export const getMovies = () => 
  api.get('/movies');

export const getMovie = (id) => 
  api.get(`/movies/${id}`);

export const createMovie = (movie) => 
  api.post('/admin/movies', movie);

// Venue APIs
export const getVenues = () => 
  api.get('/venues');

// Show APIs
export const getShowsForMovie = (movieId) => 
  api.get(`/shows/${movieId}`);

export const getAllShows = () => 
  api.get('/shows');

export const createShow = (show) => 
  api.post('/admin/shows', show);

// Booking APIs
export const bookShow = (showId, booking) => 
  api.post(`/book/${showId}`, booking);

export const getBookings = () => 
  api.get('/bookings');

export default api;


import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Update to your Laravel backend URL
  withCredentials: true, // Needed for Sanctum/cookie auth
});

export default api;

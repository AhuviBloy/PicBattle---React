// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com/api';

// Interceptor גלובלי – מוסיף Authorization לכל קריאה
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor לתשובות אם תרצי
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

const apiService = {
  getChallenges: () => axios.get(`${API_BASE_URL}/challenges`),

  createChallenge: (challengeData) =>
    axios.post(`${API_BASE_URL}/challenges`, challengeData),

  submitCreation: (challengeId, creationData) =>
    axios.post(`${API_BASE_URL}/challenges/${challengeId}/creations`, creationData),

  voteForCreation: (creationId) =>
    axios.post(`${API_BASE_URL}/creations/${creationId}/vote`),

  getCreationsForChallenge: (challengeId) =>
    axios.get(`${API_BASE_URL}/challenges/${challengeId}/creations`),

  login: (credentials) =>
    axios.post(`${API_BASE_URL}/auth/login`, credentials),

  register: (userData) =>
    axios.post(`${API_BASE_URL}/auth/register`, userData),

  getCurrentUser: () =>
    axios.get(`${API_BASE_URL}/auth/me`),
};

export default apiService;

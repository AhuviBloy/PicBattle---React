// src/services/apiService.js
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

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
  getChallenges: () => axios.get(`${apiUrl}/challenges`),

  createChallenge: (challengeData) =>
    axios.post(`${apiUrl}/challenges`, challengeData),

  submitCreation: (challengeId, creationData) =>
    axios.post(`${apiUrl}/challenges/${challengeId}/creations`, creationData),

  voteForCreation: (creationId) =>
    axios.post(`${apiUrl}/creations/${creationId}/vote`),

  getCreationsForChallenge: (challengeId) =>
    axios.get(`${apiUrl}/challenges/${challengeId}/creations`),

  login: (credentials) =>
    axios.post(`${apiUrl}/auth/login`, credentials),

  register: (userData) =>
    axios.post(`${apiUrl}/auth/register`, userData),

  getCurrentUser: () =>
    axios.get(`${apiUrl}/auth/me`),
};

export default apiService;

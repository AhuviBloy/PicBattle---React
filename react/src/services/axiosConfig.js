import axios from "axios";

// Interceptor לבקשות – הוספת Authorization header עם ה-token
axios.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// // Interceptor לתגובות – טיפול בשגיאות (למשל 401)
// axios.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     if (error.response && error.response.status === 401) {
//       // טיפול ב-Unauthorized: הסרת הטוקן וניווט למסך login
//       sessionStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );


import axios from "axios";

const api = axios.create({
<<<<<<< HEAD
  baseURL: "https://hrmsbackend-7.onrender.com/api",
=======
  baseURL: "https://hrmsbackend-3.onrender.com//api",
>>>>>>> f65b31dd0b5da4d8d5477c94806296f500ea634d
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (!config.headers) config.headers = {};
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      if (window.location.pathname !== "/login") window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export default api;

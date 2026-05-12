import axios from "axios";

const api = axios.create({
  baseURL: "https://tk-sekolah-api.onrender.com/api",
});

// otomatis kirim token admin
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
import axios from 'axios'
import { getToken } from "./Auth";

const api = axios.create({ baseURL: process.env.API_URL || 'http://localhost:8081'})

api.interceptors.request.use(async config => {
  const token = getToken();
  
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
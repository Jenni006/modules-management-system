import axios from 'axios';

const api = axios.create({
  baseURL: "https://modules-management-system.onrender.com" ,
  headers: { 'Content-Type': 'application/json' },
});
console.log("AXIOS BASE URL:", import.meta.env.VITE_API_URL);
export default api;
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://localhost:8976/",
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
    'Content-Security-Policy': "script-src 'self' 'unsafe-eval'"
  },
});


export default axiosInstance;
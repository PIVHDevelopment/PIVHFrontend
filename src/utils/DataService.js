import axios from "axios";

const DataService = axios.create({
  // baseURL: 'https://pocketpitest.com/api/',
  baseURL: import.meta.env.VITE_BACKEND_URL,
  timeout: 20000,
  withCredentials: true,
});

export default DataService;

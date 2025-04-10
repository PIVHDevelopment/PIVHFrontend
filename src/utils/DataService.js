import axios from "axios";

const DataService = axios.create({
  baseURL: 'https://pocketpitest.com/api/',
  timeout: 20000,
  withCredentials: true,
});

export default DataService;

import axios from 'axios';

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT,
});

export default http;

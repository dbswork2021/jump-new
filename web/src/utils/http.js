import axios from 'axios';
import { message } from 'antd';

const http = axios.create({
  baseURL: process.env.REACT_APP_SERVER_PORT,
});

http.interceptors.request.use(
  (config) => {
    if (localStorage.__web_token) {
      config.headers.Authorization = 'Bearer ' + localStorage.__web_token;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

http.interceptors.response.use(
  (res) => {
    if (res.data.message) {
      message.success(res.data.message);
    }
    return res;
  },
  (err) => {
    if (err.response.status === 401) {
      localStorage.removeItem('__web_token');
      console.log(window.location.pathname.indexOf('login'));

      if (window.location.pathname.indexOf('login') === -1) {
        window.location.pathname = '/login';
      }
    }
    if (err.response.data) {
      message.error(err.response.data);
      return Promise.reject(err);
    }
    return Promise.reject(err);
  }
);

export default http;

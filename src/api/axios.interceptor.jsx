import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API;

const http = axios.create({
  baseURL: BASE_URL,
});

axios.interceptors.response.use(
  (response) => {
    const { config, data } = response;
    return Promise.resolve(response);
  },
  async function (error) {
    const { response } = error;
    return Promise.reject(error);
  }
);

export { axios, http };

import axios from 'axios';

const host = process.env.BACKEND_HOST || 'localhost';
const port = process.env.BACKEND_PORT || 5000;
let baseURL = `http://${host}:${port}`

const createHttpInstance  = (headers) => {
  return axios.create({
    baseURL: baseURL,
    headers,
  });
};

const api = {
  get: (url, params, headers) => {
    const http = createHttpInstance(headers);
    return http.get(url, { params });
  },
  post: (url, data, headers) => {
    const http = createHttpInstance(headers);
    return http.post(url, data);
  },
  put: (url, data, headers) => {
    const http = createHttpInstance(headers);
    return http.put(url, data);
  },
  delete: (url, headers) => {
    const http = createHttpInstance(headers);
    return http.delete(url);
  },
};

export default api;
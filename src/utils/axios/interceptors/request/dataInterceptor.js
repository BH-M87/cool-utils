/* eslint-disable no-param-reassign */
import axios from 'axios';

axios.interceptors.request.use(
  function(config) {
    const { method } = config;
    if (method === 'get') {
      const { params, data } = config;
      config.params = { ...data, ...params };
      config.data = {};
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

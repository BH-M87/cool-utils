/* eslint-disable no-param-reassign */
import axios from 'axios';

axios.interceptors.request.use(
  function(config) {
    const { method } = config;
    if (method !== 'form') {
      return config;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

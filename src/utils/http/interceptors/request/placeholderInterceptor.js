/* eslint-disable no-param-reassign */
import axios from 'axios';
import replacePlaceholder from '../../../replacePlaceholder';

axios.interceptors.request.use(
  function(config) {
    let { url, params, data } = config;
    if (typeof params === 'object') {
      ({ string: url, data: params } = replacePlaceholder(url, /:\w+/g, params));
    }
    if (typeof data === 'object') {
      ({ string: url, data } = replacePlaceholder(url, /:\w+/g, data));
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

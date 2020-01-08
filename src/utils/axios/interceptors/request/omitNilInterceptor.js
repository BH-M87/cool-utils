/* eslint-disable no-param-reassign */
import axios from 'axios';
import omitNil from '../../../omitNil';

axios.interceptors.request.use(
  function(config) {
    const { params, data } = config;
    config.params = omitNil(params);
    config.data = omitNil(data);
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

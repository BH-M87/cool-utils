/* eslint-disable no-param-reassign */
import axios from 'axios';
import { pickBy } from 'lodash-es';

const omitNil = obj => pickBy(obj, value => value !== undefined && value !== null);
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

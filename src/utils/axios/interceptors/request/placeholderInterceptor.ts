import { AxiosInstance } from 'axios';
import replacePlaceholder from '../../../replacePlaceholder';
import isObject from '../../../isObject';

export default (axios: AxiosInstance) => {
  axios.interceptors.request.use(
    function(config) {
      let { url, params, data } = config;
      if (isObject(params)) {
        ({ string: url, data: params } = replacePlaceholder(url, /:\w+/g, params));
      }
      if (isObject(data)) {
        ({ string: url, data } = replacePlaceholder(url, /:\w+/g, data));
      }
      return { ...config, url, params, data };
    },
    function(error) {
      return Promise.reject(error);
    },
  );
};

import { AxiosInstance, Options, AxiosError } from 'axios';
import parseResponse from '../../libs/parseResponse';

export default (axios: AxiosInstance) => {
  axios.interceptors.response.use(parseResponse, function(error: AxiosError) {
    const { options } = axios.defaults;
    const { throwError = false } = options as Options;
    const { request, config, response } = error;
    const { method } = config || request || {};
    if (typeof throwError === 'object' && method ? throwError[method] : throwError) {
      return Promise.reject(error);
    }
    return response;
  });
};

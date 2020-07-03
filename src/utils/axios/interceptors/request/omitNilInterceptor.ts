import { AxiosInstance } from 'axios';
import omitNil from '../../../omitNil';

export default (axios: AxiosInstance) => {
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
};

import { AxiosInstance } from 'axios';
import checkLogin from '../../libs/checkLogin';
import toLoginPage from '../../libs/toLoginPage';

export default (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    function(response) {
      const { loginPage, error } = checkLogin(response);
      if (error) {
        if (loginPage) {
          toLoginPage(loginPage);
          return response;
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({ ...response, ...error });
      }
      return response;
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
};

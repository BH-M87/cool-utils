import { AxiosInstance, Options } from 'axios';

export default (axios: AxiosInstance) => {
  axios.interceptors.response.use(
    function(response) {
      const { options } = axios.defaults;
      const { parseResponse, correctErrorCode } = options as Options;
      const { errorCode, errCode, errorMsg, errMsg } = parseResponse(response);
      const eCode = errorCode || errCode || 0;
      if (!eCode || eCode === correctErrorCode) {
        return response;
      }
      const eMsg = errorMsg || errMsg || 'Default no defined error message!';
      const error = new Error(eMsg);
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject({ ...response, ...error });
    },
    function(error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
};

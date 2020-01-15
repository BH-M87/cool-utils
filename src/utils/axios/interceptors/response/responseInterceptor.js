import axios from 'axios';
import parseResponse from '../../libs/parseResponse';

axios.interceptors.response.use(parseResponse, function(error) {
  const {
    options: { throwError },
  } = axios.defaults;
  const {
    request: { method, throwError: _throwError },
    response,
  } = error;
  if (
    _throwError !== false &&
    (_throwError || (typeof throwError === 'object' ? throwError[method] : throwError))
  ) {
    return Promise.reject(error);
  }
  return response;
});

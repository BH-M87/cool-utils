import axios, { Options, AxiosResponse } from 'axios';
import parseResponse from './parseResponse';

// return {} when login
export default (response: AxiosResponse) => {
  const { options } = axios.defaults;
  const { notLoginErrorCode, loginPage } = options as Options;
  const { errorCode, errCode, errorMsg, errMsg } = parseResponse(response);
  const eCode = errorCode || errCode || 0;
  if (
    notLoginErrorCode instanceof RegExp
      ? notLoginErrorCode.test(eCode)
      : notLoginErrorCode === eCode
  ) {
    const eMsg = errorMsg || errMsg || 'Default not login error message!';
    return { loginPage, error: new Error(eMsg) };
  }
  return {};
};

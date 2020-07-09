import axios, { Options, AxiosResponse } from 'axios';

// return {} when login
export default (response: AxiosResponse) => {
  const { options } = axios.defaults;
  const { notLoginErrorCode, loginPage } = options as Options;
  const { errorCode, errCode, errorMsg, errMsg } = response.data;
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

import axios, { AxiosRequestConfig } from 'axios';
// request interceptors
import dataInterceptor from '../interceptors/request/dataInterceptor';
import omitNilInterceptor from '../interceptors/request/omitNilInterceptor';
import placeholderInterceptor from '../interceptors/request/placeholderInterceptor';
import xsrfInterceptor from '../interceptors/request/xsrfInterceptor';

// response interceptors
import notLoginInterceptor from '../interceptors/response/notLoginInterceptor';
import errorInterceptor from '../interceptors/response/errorInterceptor';
import responseInterceptor from '../interceptors/response/responseInterceptor';

export default (config: AxiosRequestConfig = {}) => {
  const axiosInstance = axios.create(config);
  // copy options from static axios to axios instance
  axiosInstance.defaults.options = axios.defaults.options;
  dataInterceptor(axiosInstance);
  omitNilInterceptor(axiosInstance);
  placeholderInterceptor(axiosInstance);
  xsrfInterceptor(axiosInstance);

  notLoginInterceptor(axiosInstance);
  errorInterceptor(axiosInstance);
  responseInterceptor(axiosInstance);
  return axiosInstance;
};

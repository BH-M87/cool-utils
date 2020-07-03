import { AxiosRequestConfig } from 'axios';
import axios from './axios';
import isObject from '../isObject';

// interface API {
//   method: 'get' | 'post' | 'delete' | 'put' | 'form';
//   url: string;
//   data: any;
// }

export function get(api: string | AxiosRequestConfig, params = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'get',
          ...(api as AxiosRequestConfig),
        }
      : {
          method: 'get',
          params,
          headers,
          ...config,
        },
  );
}

export function post(api: string | AxiosRequestConfig, data = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'post',
          ...(api as AxiosRequestConfig),
        }
      : {
          method: 'post',
          data,
          headers,
          ...config,
        },
  );
}

export function deleteMethod(
  api: string | AxiosRequestConfig,
  data = {},
  headers = {},
  config = {},
) {
  return axios(
    isObject(api)
      ? {
          method: 'delete',
          ...(api as AxiosRequestConfig),
        }
      : {
          method: 'delete',
          data,
          headers,
          ...config,
        },
  );
}

export function put(api: string | AxiosRequestConfig, data = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'put',
          ...(api as AxiosRequestConfig),
        }
      : {
          method: 'put',
          data,
          headers,
          ...config,
        },
  );
}

export function form(api: string | AxiosRequestConfig, data = {}, headers = {}, config = {}) {
  return isObject(api)
    ? axios.form(
        (api as AxiosRequestConfig).url || '',
        (api as AxiosRequestConfig).data,
        api as AxiosRequestConfig,
      )
    : axios.form(api as string, data, { headers, ...config });
}

export default {
  get,
  post,
  delete: deleteMethod,
  put,
  form,
};

import { AxiosRequestConfig } from 'axios';
import axios from './axios';
import isObject from '../isObject';

// interface API {
//   method: 'get' | 'post' | 'delete' | 'put' | 'form';
//   url: string;
//   data: any;
// }

export function get(api: string | AxiosRequestConfig, params = {}, headers = {}, config = {}) {
  if (!api) {
    return undefined;
  }
  return axios(
    isObject(api)
      ? {
          method: 'get',
          ...(api as AxiosRequestConfig),
        }
      : {
          url: api as string,
          method: 'get',
          params,
          headers,
          ...config,
        },
  );
}

export function post(api: string | AxiosRequestConfig, data = {}, headers = {}, config = {}) {
  if (!api) {
    return undefined;
  }
  return axios(
    isObject(api)
      ? {
          method: 'post',
          ...(api as AxiosRequestConfig),
        }
      : {
          url: api as string,
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
  if (!api) {
    return undefined;
  }
  return axios(
    isObject(api)
      ? {
          method: 'delete',
          ...(api as AxiosRequestConfig),
        }
      : {
          url: api as string,
          method: 'delete',
          data,
          headers,
          ...config,
        },
  );
}

export function put(api: string | AxiosRequestConfig, data = {}, headers = {}, config = {}) {
  if (!api) {
    return undefined;
  }
  return axios(
    isObject(api)
      ? {
          method: 'put',
          ...(api as AxiosRequestConfig),
        }
      : {
          url: api as string,
          method: 'put',
          data,
          headers,
          ...config,
        },
  );
}

export function form(api: string | AxiosRequestConfig, data = {}, headers = {}, config = {}) {
  if (!api) {
    return undefined;
  }
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

import axios from './axios';
import isObject from '../isObject';

interface API {
  method: 'get' | 'post' | 'delete' | 'put' | 'form';
  url: string;
  data: any;
}

export function get(api: string | API, params = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'get',
          ...(api as API),
        }
      : {
          method: 'get',
          params,
          headers,
          ...config,
        },
  );
}

export function post(api: string | API, data = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'post',
          ...(api as API),
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
  api: string | API,
  data = {},
  headers = {},
  config = {},
) {
  return axios(
    isObject(api)
      ? {
          method: 'delete',
          ...(api as API),
        }
      : {
          method: 'delete',
          data,
          headers,
          ...config,
        },
  );
}

export function put(api: string | API, data = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'put',
          ...(api as API),
        }
      : {
          method: 'put',
          data,
          headers,
          ...config,
        },
  );
}

export function form(api: string | API, data = {}, headers = {}, config = {}) {
  return isObject(api)
    ? axios.form((api as API).url, (api as API).data, api)
    : axios.form(api, data, { headers, ...config });
}

export default {
  get,
  post,
  delete: deleteMethod,
  put,
  form,
};

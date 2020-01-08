import axios from './axios';
import isObject from '../isObject';

export function get(api, params = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'get',
          ...api,
        }
      : {
          method: 'get',
          params,
          headers,
          ...config,
        },
  );
}

export function post(api, data = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'post',
          ...api,
        }
      : {
          method: 'post',
          data,
          headers,
          ...config,
        },
  );
}

export function deleteMethod(api, data = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'delete',
          ...api,
        }
      : {
          method: 'delete',
          data,
          headers,
          ...config,
        },
  );
}

export function put(api, data = {}, headers = {}, config = {}) {
  return axios(
    isObject(api)
      ? {
          method: 'put',
          ...api,
        }
      : {
          method: 'put',
          data,
          headers,
          ...config,
        },
  );
}

export function form(api, data = {}, headers = {}, config = {}) {
  return isObject(api)
    ? axios.form(api.url, api.data, api)
    : axios.form(api, data, { headers, ...config });
}

export default {
  get,
  post,
  delete: deleteMethod,
  put,
  form,
};

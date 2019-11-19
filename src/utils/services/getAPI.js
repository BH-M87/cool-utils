import { pickBy, negate, isNil } from 'lodash-es';
import http from '../http';

const parseKey = key => {
  let method = 'get';
  let path = key;

  if (key.indexOf(' ') > -1) {
    const splited = key.split(' ');
    method = splited[0].toLowerCase();
    // eslint-disable-next-line prefer-destructuring
    path = splited[1];
  }

  return { method, path };
};

const gen = param => {
  const { method, path } = parseKey(param);
  return function(data, headers, config) {
    return http[method](path, pickBy(data, negate(isNil)), headers, config);
  };
};

const getAPI = (api = {}) => {
  const API = {};
  Object.keys(api).forEach(apiKey => {
    API[apiKey] = gen(api[apiKey]);
  });
  return API;
};

export default getAPI;

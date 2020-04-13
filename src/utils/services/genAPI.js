import isFunction from '../isFunction';
import isObject from '../isObject';

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

const gen = (param, library) => {
  const { method, path } = parseKey(param);
  return function(data, headers, config) {
    if (isFunction(library)) {
      return library({ method, path, data, headers, config });
    }
    if (isObject(library) && isFunction(library[method])) {
      return library[method](path, data, headers, config);
    }
    return () => {
      console.warn(`No library found, params are : ${{ method, path, data, headers, config }}`);
      return null;
    };
  };
};

const genAPI = (api = {}, library) => {
  const API = {};
  Object.keys(api).forEach(apiKey => {
    API[apiKey] = gen(api[apiKey], library);
  });
  return API;
};

export default genAPI;

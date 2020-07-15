import isFunction from '../isFunction';
import isObject from '../isObject';

const parseKey = (key: string) => {
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

const gen = (param: string, library: Function | AnyObject) => {
  const { method, path } = parseKey(param);
  return function(data: any, headers: object, config: object) {
    if (isFunction(library)) {
      return (library as Function)({ method, path, data, headers, header: headers, config });
    }
    if (isObject(library) && isFunction((library as AnyObject)[method])) {
      return (library as AnyObject)[method](path, data, headers, config);
    }
    return () => {
      console.warn(
        `No library found, params are : ${{
          method,
          path,
          data,
          headers,
          config,
        }}`,
      );
      return null;
    };
  };
};

const genAPI = (api: AnyObject = {}, library: Function | AnyObject) => {
  const API: AnyObject = {};
  Object.keys(api).forEach(apiKey => {
    API[apiKey] = gen(api[apiKey], library);
  });
  return API;
};

export default genAPI;

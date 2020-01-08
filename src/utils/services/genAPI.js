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
    return library[method](path, data, headers, config);
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

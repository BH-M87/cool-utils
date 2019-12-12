/* eslint-disable no-param-reassign */
import axios from 'axios';

axios.interceptors.request.use(
  async function(config) {
    const { options, method } = config;
    if (!options.isXsrfOn || ['get', 'head'].includes(method)) {
      return config;
    }
    const {
      xsrfToken,
      xsrfConfig: { url, xsrfHeaderName, getToken, timeout = 0 },
    } = options;
    const setXsrfHeader = _xsrfToken => {
      config.xsrfToken = _xsrfToken;
      config.headers[xsrfHeaderName] = _xsrfToken;
    };
    if (config.xsrfToken) {
      setXsrfHeader(config.xsrfToken);
      return config;
    }
    if (xsrfToken) {
      setXsrfHeader(xsrfToken);
      return config;
    }
    // get xsrf token
    const newXsrfToken = getToken(await axios.get(url));
    if (!newXsrfToken) {
      throw new Error('XSRF Not EXIST!');
    }
    setXsrfHeader(newXsrfToken);
    if (timeout !== null && timeout > 0) {
      setTimeout(() => {
        config.xsrfToken = null;
      }, timeout);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

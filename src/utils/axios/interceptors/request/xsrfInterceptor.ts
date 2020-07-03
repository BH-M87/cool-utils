/* eslint-disable no-param-reassign */
import axios, { Options, XsrfConfig } from 'axios';

axios.interceptors.request.use(
  async function(config) {
    const options = axios.defaults.options as Options;
    const { method } = config;
    if (
      !options.isXsrfOn ||
      ['get', 'head'].includes((method || 'NO_FOUND').toLowerCase())
    ) {
      return config;
    }
    const { xsrfToken, xsrfConfig } = options;
    const {
      url,
      xsrfHeaderName,
      getToken,
      timeout = 0,
    } = xsrfConfig as XsrfConfig;
    const setXsrfHeader = (_xsrfToken: string) => {
      config.xsrfToken = _xsrfToken;
      config.headers[xsrfHeaderName || 'xsrf-token'] = _xsrfToken;
    };
    if (config.xsrfToken) {
      setXsrfHeader(config.xsrfToken);
      return config;
    }
    if (xsrfToken) {
      setXsrfHeader(xsrfToken);
      return config;
    }
    if (!getToken || !url) {
      return Promise.reject(
        new Error(
          'Neithor xsrf token found nor url for getting new xsrf token provide.',
        ),
      );
    }
    // get xsrf token
    const newXsrfToken = getToken(await axios.get(url));
    if (!newXsrfToken) {
      throw new Error('XSRF Not EXIST!');
    }
    setXsrfHeader(newXsrfToken);
    if (timeout !== null && timeout > 0) {
      setTimeout(() => {
        config.xsrfToken = undefined;
      }, timeout);
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  },
);

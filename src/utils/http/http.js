import { isEmpty, omitBy } from 'lodash-es';
import URLSearchParams from 'url-search-params';
import isArray from '../isArray';
import replacePlaceholder from '../replacePlaceholder';

const CODE_MESSAGE = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

export class Http {
  commonConfig = {
    csrf: false,
    headers: {},
    errorHook: (error, url) => {
      // eslint-disable-next-line no-console
      console.warn(`Http Request Error in '${url}':`, error);
    },
    notLoginInErrorCode: /18003|18004/,
    notLoginInUrl: '/login',
    notLoginCallback: function notLoginCallback(notLoginInUrl) {
      const history = window.g_history;
      if (!history) {
        return;
      }
      history.push({
        pathname: notLoginInUrl,
        search: `?redirectUrl=${history.location.pathname}${
          history.location.search.substr(1) ? `&${history.location.search.substr(1)}` : ''
        }`,
      });
    },
    isResultCheck: true,
    parseResult: data => data && data.data,
    isGetParamJsonStringfy: false,
    throwError: {
      get: false,
      post: true,
      form: true,
      put: true,
      delete: true,
    },
    correctErrorCode: 200,
    requestInterval: 0,
    requestTimeout: 0,
    fetchRetryTimes: 0,
    codeMessage: CODE_MESSAGE,
    urlPrefix: '',
    dataInterceptor: [
      function omitNil(data) {
        return omitBy(data, function isNil(value) {
          return value === undefined || value === null;
        });
      },
    ],
    requestInterceptor: [],
    responseInterceptor: [],
  };

  set config(_commonConfig = {}) {
    this.commonConfig = {
      ...this.commonConfig,
      ..._commonConfig,
      codeMessage: {
        ...this.commonConfig.codeMessage,
        ...(_commonConfig.codeMessage || {}),
      },
    };
  }

  notLoginIn(loginPageUrl) {
    const urlReg = /^https?:\/\/*/;
    if (loginPageUrl && urlReg.test(loginPageUrl)) {
      window.location.href = loginPageUrl;
      return;
    }
    const { notLoginInUrl, notLoginCallback } = this.commonConfig;
    if (!notLoginInUrl) {
      return;
    }
    if (urlReg.test(notLoginInUrl)) {
      window.location.href = `${notLoginInUrl}?redirectUrl=${window.location.href}`;
    } else if (window.location.pathname !== notLoginInUrl && notLoginCallback) {
      notLoginCallback(notLoginInUrl);
    }
  }

  checkStatus(response) {
    if (response.status === 200) {
      return response;
    }
    const error = new Error(response.statusText || this.commonConfig.codeMessage[response.status]);
    error.status = response.status;
    error.data = response;
    throw error;
  }

  checkErrCode(dataObj) {
    const { data, errorCode, errCode, errorMsg, errMsg } = dataObj;
    const eCode = errorCode || errCode || 0;
    const eMsg = errorMsg || errMsg || 'No defined error message!';
    const { correctErrorCode, notLoginInErrorCode } = this.commonConfig;
    if (!eCode || eCode === correctErrorCode) {
      return;
    }
    if (
      notLoginInErrorCode instanceof RegExp
        ? notLoginInErrorCode.test(eCode)
        : notLoginInErrorCode === eCode
    ) {
      this.notLoginIn(eMsg);
      return;
    }
    const error = new Error(eMsg);
    error.data = data;
    error.errorCode = errorCode;
    error.errCode = errCode;
    throw error;
  }

  parseResult(data) {
    this.checkErrCode(data);
    return this.commonConfig.parseResult ? this.commonConfig.parseResult(data) : data;
  }

  async processResult(response) {
    this.checkStatus(response);
    const returnResponse = await response.json();
    if (!this.commonConfig.isResultCheck) {
      return returnResponse;
    }
    return this.parseResult(returnResponse, response.url);
  }

  csrfToken = null;

  async getCsrfToken() {
    if (!this.commonConfig.csrf) {
      return undefined;
    }
    if (!this.csrfToken) {
      let response = await this.get(this.commonConfig.csrf.api);
      if (this.commonConfig.csrf.parseToken) {
        response = this.commonConfig.csrf.parseToken(response);
      }
      if (!response) {
        throw new Error('CSRF Not EXIST!');
      }
      // response is a object with attribute token
      this.csrfToken = response;
      setTimeout(() => {
        this.csrfToken = null;
      }, this.commonConfig.csrf.timeout || 11 * 60 * 1000);
    }
    return this.csrfToken;
  }

  objectToFormData(obj, form, namespace) {
    const fd = form || new FormData();
    let formKey;
    // eslint-disable-next-line no-unused-vars
    for (const property in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, property)) {
        if (namespace) {
          formKey = namespace + Array.isArray(obj) ? '[]' : `[${property}]`;
        } else {
          formKey = property;
        }

        // if the property is an object, but not a File, use recursivity.
        if (
          typeof obj[property] === 'object' &&
          !(obj[property] instanceof File) &&
          !(obj[property] instanceof Blob)
        ) {
          this.objectToFormData(obj[property], fd, formKey);
        } else {
          // if it's a string or a File object
          fd.append(formKey, obj[property]);
        }
      }
    }

    return fd;
  }

  requestPromises = new Map();

  requestCache(url, customOptions, headers = {}, config = {}) {
    const request = () => this.request(url, customOptions, headers, config);
    if (this.commonConfig.requestInterval <= 0) {
      return request();
    }
    const hash = `${url}-${JSON.stringify(customOptions)}-${JSON.stringify(
      headers,
    )}-${JSON.stringify(config)}`;
    const o = this.requestPromises.get(hash);
    const now = Date.now();
    if (o && now - o.now < this.commonConfig.requestInterval) {
      return o.promise;
    }
    const output = {
      now,
      promise: request,
    };
    this.requestPromises.set(hash, output);
    return request();
  }

  savedFetchRetryTimes = {};

  async request(_url, customOptions, headers = {}, config = {}) {
    const {
      requestTimeout,
      fetchRetryTimes,
      throwError,
      urlPrefix,
      headers: commonHeaders,
    } = this.commonConfig;
    const url = `${urlPrefix}${_url}`;
    const requestInterceptor = [
      ...this.commonConfig.requestInterceptor,
      ...(isArray(config.requestInterceptor) ? config.requestInterceptor : []),
    ];
    const responseInterceptor = [
      ...this.commonConfig.responseInterceptor,
      ...(isArray(config.responseInterceptor) ? config.responseInterceptor : []),
    ];
    const options = requestInterceptor.reduce(
      (accumulator, interceptor) => interceptor(accumulator),
      {
        credentials: 'include',
        rejectUnauthorized: false,
        ...customOptions,
        headers: {
          'x-requested-with': 'XMLHttpRequest',
          ...(commonHeaders || {}),
          ...(customOptions.headers || {}),
          ...(headers || {}),
        },
      },
    );
    try {
      const originalResponse =
        requestTimeout > 0
          ? await Promise.race([
              fetch(url, options),
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  reject(new Error(`Request ${url} timeout after ${requestTimeout}ms!!!`));
                }, requestTimeout);
              }),
            ])
          : await fetch(url, options);
      const response = responseInterceptor.reduce(
        (accumulator, interceptor) => interceptor(accumulator),
        originalResponse,
      );
      const processedResponse = await this.processResult(response);
      return processedResponse;
    } catch (error) {
      const thisUrlFetchRetryTimes = this.savedFetchRetryTimes[url] || 1;
      if (thisUrlFetchRetryTimes > fetchRetryTimes) {
        delete this.savedFetchRetryTimes[url];
        this.commonConfig.errorHook(error, url);
        if (
          config.throwError !== false &&
          (config.throwError ||
            (typeof throwError === 'object'
              ? throwError[(options.method || 'get').toLowerCase()]
              : throwError))
        ) {
          throw error;
        }
        return null;
      }
      this.savedFetchRetryTimes[url] = thisUrlFetchRetryTimes + 1;
      return this.request(url, customOptions, headers, config);
    }
  }

  interceptData(_api, _data, config) {
    const { string: api, data: replacedData } = replacePlaceholder(_api, /:\w+/g, _data);
    const dataInterceptor = [
      ...this.commonConfig.dataInterceptor,
      ...(isArray(config.dataInterceptor) ? config.dataInterceptor : []),
    ];
    const data = dataInterceptor.reduce(
      (accumulator, interceptor) => interceptor(accumulator),
      replacedData,
    );
    return {
      api,
      data,
    };
  }

  async get(getApi, getData = {}, headers = {}, config = {}) {
    const { api, data } = this.interceptData(getApi, getData, config);
    let query;
    if (isEmpty(data)) {
      query = '';
    } else if (this.commonConfig.isGetParamJsonStringfy) {
      query = `?json=${encodeURIComponent(JSON.stringify(data))}`;
    } else {
      // https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams
      const searchParams = new URLSearchParams();
      Object.keys(data).forEach(key => {
        searchParams.append(key, data[key]);
      });
      query = `?${searchParams.toString()}`;
    }
    return this.requestCache(`${api}${query}`, { method: 'GET' }, headers, config);
  }

  async post(postApi, postData = {}, customeHeaders = {}, config = {}) {
    const { api, data } = this.interceptData(postApi, postData, config);
    const csrfToken = await this.getCsrfToken();
    const headers = {
      'content-type': 'application/json',
      'x-csrf-token': csrfToken,
      ...customeHeaders,
    };
    const body = JSON.stringify(data);
    return this.requestCache(
      api,
      {
        method: 'POST',
        headers,
        body,
      },
      {},
      config,
    );
  }

  async delete(postApi, postData = {}, customeHeaders = {}, config = {}) {
    const { api, data } = this.interceptData(postApi, postData, config);
    const csrfToken = await this.getCsrfToken();
    const headers = {
      'content-type': 'application/json',
      'x-csrf-token': csrfToken,
      ...customeHeaders,
    };
    const body = JSON.stringify(data);
    return this.requestCache(
      api,
      {
        method: 'DELETE',
        headers,
        body,
      },
      {},
      config,
    );
  }

  async put(postApi, postData = {}, customeHeaders = {}, config = {}) {
    const { api, data } = this.interceptData(postApi, postData, config);
    const csrfToken = await this.getCsrfToken();
    const headers = {
      'content-type': 'application/json',
      'x-csrf-token': csrfToken,
      ...customeHeaders,
    };
    const body = JSON.stringify(data);
    return this.requestCache(
      api,
      {
        method: 'PUT',
        headers,
        body,
      },
      {},
      config,
    );
  }

  async form(formApi, formData, customeHeaders = {}, config = {}) {
    const { api, data } = this.interceptData(formApi, formData, config);
    const csrfToken = await this.getCsrfToken();
    const headers = {
      'x-csrf-token': csrfToken,
      ...customeHeaders,
    };
    const body = data instanceof FormData ? data : this.objectToFormData(data);
    return this.requestCache(
      api,
      {
        method: 'POST',
        headers,
        body,
      },
      {},
      config,
    );
  }
}

export default new Http();

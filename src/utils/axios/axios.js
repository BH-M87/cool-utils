import axios from 'axios';
import setDefaults from './libs/setDefaults';
import setOptions from './libs/setOptions';

setDefaults();
setOptions();

// add form method to axios
require('./libs/form');

// request interceptors
require('./interceptors/request/placeholderInterceptor');
require('./interceptors/request/xsrfInterceptor');

// response interceptors
require('./interceptors/response/notLoginInterceptor');
require('./interceptors/response/errorInterceptor');
require('./interceptors/response/responseInterceptor');

export default axios;

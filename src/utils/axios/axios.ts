/* eslint-disable import/first */
import axios from 'axios';
import './libs/setDefaults';
import setOptions from './libs/setOptions';

setOptions();

// add form method to axios
import './libs/form';

// request interceptors
import './interceptors/request/dataInterceptor';
import './interceptors/request/omitNilInterceptor';
import './interceptors/request/placeholderInterceptor';
import './interceptors/request/xsrfInterceptor';

// response interceptors
import './interceptors/response/notLoginInterceptor';
import './interceptors/response/errorInterceptor';
import './interceptors/response/responseInterceptor';

export default axios;

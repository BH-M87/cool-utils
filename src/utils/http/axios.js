import axios from 'axios';
import setDefaults from './libs/setDefaults';
import setOptions from './libs/setOptions';

setDefaults(axios);
setOptions();

// add form method to axios
require('./libs/form');

// request interceptors
require('./interceptors/request/placeholderInterceptor');
require('./interceptors/request/xsrfInterceptor');
require('./interceptors/request/formInterceptor');

export default axios;

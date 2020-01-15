import axios from 'axios';

import isFunction from '../../isFunction';

export default response => {
  const {
    options: { parseResponse },
  } = axios.defaults;
  return isFunction(parseResponse) ? parseResponse(response) : response;
};

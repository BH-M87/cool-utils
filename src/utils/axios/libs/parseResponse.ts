import axios, { AxiosResponse, Options } from 'axios';
import isFunction from '../../isFunction';

export default (response: AxiosResponse) => {
  const { options } = axios.defaults;
  const { parseResponse } = options as Options;
  return isFunction(parseResponse) ? parseResponse(response.data) : response.data;
};

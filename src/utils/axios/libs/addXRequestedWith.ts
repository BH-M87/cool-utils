import { AxiosRequestConfig } from 'axios';

export default (options: AxiosRequestConfig) => ({
  ...options,
  headers: {
    ...(options.headers || {}),
    ...('x-requested-with' in (options.headers || {})
      ? {}
      : { 'x-requested-with': 'XMLHttpRequest' }),
  },
});

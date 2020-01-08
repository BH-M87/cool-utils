import axios from 'axios';

// headers
axios.defaults.headers.common = {
  ...axios.defaults.headers.common,
  'x-requested-with': 'XMLHttpRequest',
};
axios.defaults.headers.get = {
  ...axios.defaults.headers.get,
  'content-type': 'application/json',
};
axios.defaults.headers.post = {
  ...axios.defaults.headers.post,
  'content-type': 'application/json',
};
axios.defaults.headers.delete = {
  ...axios.defaults.headers.delete,
  'content-type': 'application/json',
};
axios.defaults.headers.put = {
  ...axios.defaults.headers.put,
  'content-type': 'application/json',
};
// withCredentials
axios.defaults.withCredentials = true;

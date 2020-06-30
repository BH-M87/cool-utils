import axios from 'axios';

// headers
axios.defaults.headers.common = {
  ...axios.defaults.headers.common,
  'x-requested-with': 'XMLHttpRequest',
};
// axios.defaults.headers.get = {
//   ...axios.defaults.headers.get,
// };
// axios.defaults.headers.post = {
//   ...axios.defaults.headers.post,
// };
// axios.defaults.headers.delete = {
//   ...axios.defaults.headers.delete,
// };
// axios.defaults.headers.put = {
//   ...axios.defaults.headers.put,
// };
// withCredentials
axios.defaults.withCredentials = true;

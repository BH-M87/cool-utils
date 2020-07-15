import axios from 'axios';
import defaultOptions from '../options';

export default (options = {}) => {
  axios.defaults.options = {
    ...(typeof axios.defaults.options === 'object'
      ? axios.defaults.options
      : defaultOptions),
    ...options,
  };
};

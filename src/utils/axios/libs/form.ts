import axios from 'axios';
import merge from '../../merge';
import isFormData from '../../isFormData';
import objectToFormData from '../../objectToFormData';

axios.Axios.prototype.form = function(
  url: string,
  data: any,
  config: AnyObject,
) {
  return axios.Axios.prototype.request(
    merge(config || {}, {
      method: 'post',
      url,
      data: isFormData(data) ? data : objectToFormData(data),
    }),
  );
};

import axios from 'axios';
import merge from '../../merge';
import isFormData from '../../isFormData';
import objectToFormData from '../../objectToFormData';
import addXRequestedWith from './addXRequestedWith';

axios.Axios.prototype.form = function(url: string, data: any, config: AnyObject) {
  return axios.Axios.prototype.request(
    addXRequestedWith(
      merge(config || {}, {
        method: 'post',
        url,
        data: isFormData(data) ? data : objectToFormData(data),
      }),
    ),
  );
};

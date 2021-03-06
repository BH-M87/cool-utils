export {
  default as axios,
  get as axiosGet,
  post as axiosPost,
  put as axiosPut,
  deleteMethod as axiosDelete,
  form as axiosForm,
  axiosMethods,
  setAxiosOptions,
} from './utils/axios';
export { default as http, get, post, put, deleteMethod, form } from './utils/http';
export { usePrevious, usePreviousProp, useCompare, useDifferentiation } from './utils/hooks';
export { default as genAPI } from './utils/services/genAPI';
export { default as getAPI } from './utils/services/getAPI';
export { default as generateAPI } from './utils/services/generateAPI';
export { default as getDifferentiation } from './utils/getDifferentiation';
export { default as replacePlaceholder } from './utils/replacePlaceholder';
export { default as loadScripts } from './utils/loadScripts';
export { default as loadStyles } from './utils/loadStyles';
export { default as stringToDomElement } from './utils/stringToDomElement';
export { default as classnames } from './utils/classnames';
export { default as forEach } from './utils/forEach';
export { default as isArray } from './utils/isArray';
export { default as isBlob } from './utils/isBlob';
export { default as isFile } from './utils/isFile';
export { default as isFormData } from './utils/isFormData';
export { default as isFunction } from './utils/isFunction';
export { default as isObject } from './utils/isObject';
export { default as isStream } from './utils/isStream';
export { default as merge } from './utils/merge';
export { default as objectToFormData } from './utils/objectToFormData';
export { default as omitNil } from './utils/omitNil';

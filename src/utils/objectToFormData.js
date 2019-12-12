import isFile from './isFile';
import isBlob from './isBlob';
import isObject from './isObject';

export default (obj, form, namespace) => {
  const fd = form || new FormData();
  let formKey;
  // eslint-disable-next-line no-unused-vars
  for (const property in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, property)) {
      if (namespace) {
        formKey = namespace + Array.isArray(obj) ? '[]' : `[${property}]`;
      } else {
        formKey = property;
      }
      const value = obj[property];
      // if the property is an object, but not a File, use recursivity.
      if (isObject(value) && !isFile(value) && !isBlob(value)) {
        this.objectToFormData(value, fd, formKey);
      } else {
        // if it's a string or a File object
        fd.append(formKey, value);
      }
    }
  }
  return fd;
};

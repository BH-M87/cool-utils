import isArray from './isArray';

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach<T>(obj: T[], fn: (value: T, key: number, obj: T[]) => void): T[];
function forEach<T>(obj: T, fn: (value: T, key: number, obj: T) => void): T;
function forEach(obj: AnyObject, fn: (value: any, key: string, obj: AnyObject) => void): AnyObject;
function forEach(obj: any, fn: Function): any {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return obj;
  }

  let newObj: AnyObject;

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    newObj = [obj];
  }

  if (isArray(obj)) {
    newObj = [];
    // Iterate over array values
    for (let i = 0, l = obj.length; i < l; i += 1) {
      newObj[i] = fn.call(null, obj[i], i, obj);
    }
  } else {
    newObj = {};
    // Iterate over object keys
    // eslint-disable-next-line no-unused-vars
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] = fn.call(null, obj[key], key, obj);
      }
    }
  }
  return newObj;
}

export default forEach;

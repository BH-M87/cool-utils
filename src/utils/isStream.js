import isObject from './isObject';
import isFunction from './isFunction';

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
export default function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}
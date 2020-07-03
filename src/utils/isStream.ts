import isObject from './isObject';
import isFunction from './isFunction';

export interface Val {
  pipe: unknown;
}
/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
export default function isStream(val: unknown | Val) {
  return isObject(val) && isFunction((val as Val).pipe);
}

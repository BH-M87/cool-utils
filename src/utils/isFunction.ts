/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
export default function isFunction(val: unknown) {
  return toString.call(val) === '[object Function]';
}

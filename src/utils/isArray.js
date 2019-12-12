/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
export default function isArray(val) {
  return toString.call(val) === '[object Array]';
}
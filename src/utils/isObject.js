/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
export default function isObject(val) {
  return val !== null && typeof val === 'object';
}
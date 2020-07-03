/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
export default function isFile(val: unknown) {
  return toString.call(val) === '[object File]';
}

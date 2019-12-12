/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
export default function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

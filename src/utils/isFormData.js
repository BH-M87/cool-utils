/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
export default function isFormData(val) {
  return typeof FormData !== 'undefined' && val instanceof FormData;
}

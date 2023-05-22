/**
 * Check if the value is a function.
 * @param {*} value
 * @returns {boolean}
 */
const isFn = value => value != null && ( Object.prototype.toString.call( value ) === "[object Function]" || typeof value === "function" || value instanceof Function );

module.exports = isFn;
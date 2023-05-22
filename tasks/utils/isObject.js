/**
 * Check if the value is an object.
 * @param {*} value
 * @returns {boolean}
 */
const isObject = value => value != null && typeof value === "object";

module.exports = isObject;
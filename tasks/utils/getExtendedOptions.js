const isObject = require( "./isObject" );
const isFn = require( "./isFn" );

/**
 * Gets an extended options object for a task. Options can be supplied as an object or a function that extends the default options.
 * @param {object|function} supplied
 * @param {object} defaults
 * @returns {object} Returns the merged supplied and defaults options.
 */
const getExtendedOptions = ( supplied, defaults ) => {
    if ( isObject( supplied ) ) {
        return { ...defaults, ...supplied };
    }
    if ( isFn( supplied ) ) {
        return supplied( defaults );
    }
    return defaults;
};

module.exports = getExtendedOptions;
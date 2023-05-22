const chalk = require( "chalk" );

/**
 * Utility method to verbose log a tasks generated configuration.
 * @param grunt
 * @param taskName
 * @param config
 * @returns {unknown}
 */
const logVerboseTask = ( grunt, taskName, config ) => grunt.verbose.write( `Configured task ${ chalk.cyan( taskName ) }: ${ JSON.stringify( config, null, 4 ) }\n` );

module.exports = logVerboseTask;
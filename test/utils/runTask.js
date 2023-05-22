const { exec } = require('child_process');

const runTask = ( name, target ) => {
    const cmd = `grunt ${ name }` + ( typeof target === 'string' ? `:${ target }` : '' );
    return new Promise( ( resolve, reject ) => {
        exec( cmd, ( error, stdout, stderr) => {
            if ( error ) reject( error );
            else resolve( { stdout, stderr } );
        } );
    } );
};

module.exports = runTask;
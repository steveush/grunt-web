const fs = require( "fs/promises");
const runTask = require( "./utils/runTask" );

test( 'webjs:default', () => {

    return runTask( 'webjs', 'default' ).then( () => {
        return Promise.all( [
            fs.readFile( './test/expected/default/output.js', 'utf8' ),
            fs.readFile( './test/received/default/output.js', 'utf8' )
        ] ).then( ( [ expected, received ] ) => {
            expect( received ).toBe( expected );
        } );
    } );

} );

test( 'webcss:default', () => {

    return runTask( 'webcss', 'default' ).then( () => {
        return Promise.all( [
            fs.readFile( './test/expected/default/output.css', 'utf8' ),
            fs.readFile( './test/received/default/output.css', 'utf8' )
        ] ).then( ( [ expected, received ] ) => {
            expect( received ).toBe( expected );
        } );
    } );

} );

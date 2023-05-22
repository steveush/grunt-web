const fs = require( "fs/promises");
const runTask = require( "./utils/runTask" );

test( 'webjs:mapped', () => {

    return runTask( 'webjs', 'mapped' ).then( () => {
        return Promise.all( [
            fs.readFile( './test/expected/mapped/output.js', 'utf8' ),
            fs.readFile( './test/expected/mapped/output.js.map', 'utf8' ),
            fs.readFile( './test/received/mapped/output.js', 'utf8' ),
            fs.readFile( './test/received/mapped/output.js.map', 'utf8' )
        ] ).then( ( [ expected_js, expected_map, received_js, received_map ] ) => {
            expect( received_js ).toBe( expected_js );
            expect( received_map ).toBe( expected_map );
        } );
    } );

} );

test( 'webcss:mapped', () => {

    return runTask( 'webcss', 'mapped' ).then( () => {
        return Promise.all( [
            fs.readFile( './test/expected/mapped/output.css', 'utf8' ),
            fs.readFile( './test/expected/mapped/output.css.map', 'utf8' ),
            fs.readFile( './test/received/mapped/output.css', 'utf8' ),
            fs.readFile( './test/received/mapped/output.css.map', 'utf8' )
        ] ).then( ( [ expected_css, expected_map, received_css, received_map ] ) => {
            expect( received_css ).toBe( expected_css );
            expect( received_map ).toBe( expected_map );
        } );
    } );

} );

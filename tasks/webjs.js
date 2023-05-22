const path = require( 'path' );
const logVerboseTask = require( "./utils/logVerboseTask" );
const getExtendedOptions = require( "./utils/getExtendedOptions" );
const chalk = require( "chalk" );

module.exports = function( grunt ) {

    grunt.task.loadTasks( path.resolve( __dirname, '../node_modules/grunt-contrib-clean/tasks' ) );
    grunt.task.loadTasks( path.resolve( __dirname, '../node_modules/grunt-contrib-concat/tasks' ) );
    grunt.task.loadTasks( path.resolve( __dirname, '../node_modules/grunt-contrib-uglify/tasks' ) );
    grunt.task.loadTasks( path.resolve( __dirname, '../node_modules/grunt-babel/tasks' ) );
    grunt.task.loadTasks( path.resolve( __dirname, '../node_modules/@steveush/grunt-map-normalizer/tasks' ) );

    grunt.registerMultiTask( 'webjs', 'Builds JS using Babel, Concat & Uglify.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        const options = this.options( {
            babel: true,
            clean: true,
            sourceMap: false,
            uglify: true
        } );

        const sourceMap = !!options.sourceMap;
        const unique = `${ this.name }-${ this.target }`;

        this.files.forEach( f => {
            const dest_map = f.dest + '.map';
            const tasks = [];

            if ( options.clean ) {
                const clean_config = {
                    [ unique ]: [ f.dest, dest_map ]
                };
                grunt.config.set( 'clean', clean_config );
                tasks.push( `clean:${ unique }` );
                logVerboseTask( grunt, `clean:${ unique }`, clean_config );
            }

            const concat_config = {
                [ unique ]: {
                    options: getExtendedOptions( options.concat, {
                        sourceMap: sourceMap,
                        sourceMapStyle: 'embed'
                    } ),
                    src: f.src,
                    dest: f.dest
                }
            };
            grunt.config.set( 'concat', concat_config );
            tasks.push( `concat:${ unique }` );
            logVerboseTask( grunt, `concat:${ unique }`, concat_config );

            if ( !!options.babel ) {
                const babel_config = {
                    [ unique ]: {
                        options: getExtendedOptions( options.babel, {
                            presets: [ '@babel/preset-env' ],
                            sourceMap: sourceMap,
                            inputSourceMap: sourceMap
                        } ),
                        src: f.dest,
                        dest: f.dest
                    }
                }
                grunt.config.set( 'babel', babel_config );
                tasks.push( `babel:${ unique }` );
                logVerboseTask( grunt, `babel:${ unique }`, babel_config );
            }

            if ( !!options.uglify ) {
                const uglify_config = {
                    [ unique ]: {
                        options: getExtendedOptions( options.uglify, {
                            sourceMap: sourceMap ? { includeSources: true } : false,
                            sourceMapIn: dest_map
                        } ),
                        src: f.dest,
                        dest: f.dest
                    }
                };
                grunt.config.set( 'uglify', uglify_config );
                tasks.push( `uglify:${ unique }` );
                logVerboseTask( grunt, `uglify:${ unique }`, uglify_config );
            }

            if ( sourceMap ){
                const basename = path.basename( f.dest, path.extname( f.dest ) );
                const normalizer_config = {
                    [ unique ]: {
                        options: getExtendedOptions( options.sourceMap, {
                            output: 'virtual',
                            virtualRoot: `${ basename }/js`
                        } ),
                        src: dest_map
                    }
                };
                grunt.config.set( 'map-normalizer', normalizer_config );
                tasks.push( `map-normalizer:${ unique }` );
                logVerboseTask( grunt, `map-normalizer:${ unique }`, normalizer_config );
            }

            if ( tasks.length ) {
                grunt.log.ok( `Executing ${ tasks.length } configured ${ chalk.cyan( 'js' ) } ${ grunt.util.pluralize( tasks.length, 'task/tasks' ) }.` );
                grunt.task.run( tasks );
            } else {
                grunt.log.error( `No ${ chalk.cyan( 'js' ) } tasks were configured.` );
            }

        } );

    } );

};
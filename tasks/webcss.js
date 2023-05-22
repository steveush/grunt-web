const path = require( 'path' );
const sass = require( 'sass' );
const autoprefixer = require( 'autoprefixer' );
const cssnano = require( 'cssnano' );
const chalk = require( "chalk" );
const getExtendedOptions = require( "./utils/getExtendedOptions" );
const logVerboseTask = require( "./utils/logVerboseTask" );

module.exports = function( grunt ) {

    const root = process.cwd();

    grunt.task.loadTasks( path.resolve( root, 'node_modules/grunt-sass/tasks' ) );
    grunt.task.loadTasks( path.resolve( root, 'node_modules/@lodder/grunt-postcss/tasks' ) );
    grunt.task.loadTasks( path.resolve( root, 'node_modules/@steveush/grunt-map-normalizer/tasks' ) );

    grunt.registerMultiTask( 'webcss', 'Builds CSS using SASS, Autoprefixer & CSSNano.', function() {

        // Merge task-specific and/or target-specific options with these defaults.
        const options = this.options( {
            clean: true,
            postcss: true,
            sass: true,
            sourceMap: false
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

            if ( !!options.sass ) {
                const sass_config = {
                    [ unique ]: {
                        options: getExtendedOptions( options.sass, {
                            implementation: sass,
                            sourceMap: sourceMap,
                            sourceMapContents: sourceMap
                        } ),
                        src: f.src,
                        dest: f.dest
                    }
                };
                grunt.config.set( 'sass', sass_config );
                tasks.push( `sass:${ unique }` );
                logVerboseTask( grunt, `sass:${ unique }`, sass_config );
            }

            if ( !!options.postcss ) {
                const postcss_config = {
                    [ unique ]: {
                        options: getExtendedOptions( options.postcss, {
                            processors: [ autoprefixer(), cssnano() ],
                            map: sourceMap
                        } ),
                        src: f.dest,
                        dest: f.dest
                    }
                };
                grunt.config.set( 'postcss', postcss_config );
                tasks.push( `postcss:${ unique }` );
                logVerboseTask( grunt, `postcss:${ unique }`, postcss_config );
            }

            if ( sourceMap ){
                const basename = path.basename( f.dest, path.extname( f.dest ) );
                const normalizer_config = {
                    [ unique ]: {
                        options: getExtendedOptions( options.sourceMap, {
                            output: 'virtual',
                            virtualRoot: `${ basename }/css`,
                            filter: ( src ) => !src.endsWith( `${ basename }.css` )
                        } ),
                        src: dest_map
                    }
                };
                grunt.config.set( 'map-normalizer', normalizer_config );
                tasks.push( `map-normalizer:${ unique }` );
                logVerboseTask( grunt, `map-normalizer:${ unique }`, normalizer_config );
            }

            if ( tasks.length ) {
                grunt.log.ok( `Executing ${ tasks.length } configured ${ chalk.cyan( 'css' ) } ${ grunt.util.pluralize( tasks.length, 'task/tasks' ) }.` );
                grunt.task.run( tasks );
            } else {
                grunt.log.error( `No ${ chalk.cyan( 'css' ) } tasks were configured.` );
            }

        } );

    } );

};
module.exports = function( grunt ) {

    grunt.loadTasks( 'tasks' );

    grunt.initConfig( {
        clean: {
            output: [ "./test/received" ]
        },
        webjs: {
            default: {
                src: [
                    './test/src/js/rootNamespace.js',
                    './test/src/js/childNamespace.js',
                    './test/src/js/TestClass.js',
                    './test/src/js/TestChild.js'
                ],
                dest: './test/received/default/output.js'
            },
            mapped: {
                options: { sourceMap: true },
                src: [
                    './test/src/js/rootNamespace.js',
                    './test/src/js/childNamespace.js',
                    './test/src/js/TestClass.js',
                    './test/src/js/TestChild.js'
                ],
                dest: './test/received/mapped/output.js'
            }
        },
        webcss: {
            default: {
                src: './test/src/css/index.scss',
                dest: './test/received/default/output.css'
            },
            mapped: {
                options: { sourceMap: true },
                src: './test/src/css/index.scss',
                dest: './test/received/mapped/output.css'
            }
        }
    } );

    grunt.registerTask( 'default', [ 'webjs', 'webcss' ] );
};
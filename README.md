# grunt-web

> Grunt tasks to build JS and CSS.

Some custom tasks to make configuring JS & CSS builds a bit simpler. These tasks are simply wrappers for other NPM modules.

The JavaScript build uses `grunt-contrib-concat`, `grunt-contrib-uglify`, `grunt-babel` and `@steveush/grunt-map-normalizer` to produce its output.

The CSS build uses `grunt-sass`, `@steveush/grunt-map-normalizer` and `@lodder/grunt-postcss` with `autoprefixer` and `cssnano` to produce its output.

## Getting Started

If you haven't used [Grunt](https://gruntjs.com/) before, be sure to check out the [Getting Started](https://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](https://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install @steveush/grunt-web --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('@steveush/grunt-web');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](https://gruntjs.com/upgrading-from-0.3-to-0.4)*

## WebJS Task

_Run this task with the `grunt webjs` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](https://gruntjs.com/configuring-tasks) guide.

### Options

#### clean

Type: `Boolean`  
Default: `true`

Whether any existing destination files are removed before the build.

#### babel

Type: `Boolean|Object|Function(Object):Object`  
Default: `true`

If `false` then Babel will not be run at all. If `true` then Babel will be run using the built-in default configuration which uses `@babel/preset-env` and the value of the `sourceMap` option.

An `object` can be supplied which is merged with the defaults and then passed to `grunt-babel` task as its options.

A `function` can also be supplied which is passed the defaults and must return an `object` which is then passed to `grunt-babel` task as its options.

#### uglify

Type: `Boolean|Object|Function(Object):Object`  
Default: `true`

If `false` then uglify will not be run at all. If `true` then uglify will be run using the built-in default configuration which uses the value of the `sourceMap` option.

An `object` can be supplied which is merged with the defaults and then passed to `grunt-contrib-uglify` task as its options.

A `function` can also be supplied which is passed the defaults and must return an `object` which is then passed to `grunt-contrib-uglify` task as its options.

#### sourceMap

Type: `Boolean|Object|Function(Object):Object`  
Default: `false`

If `false` then no source map will be created. If `true` then a source map will be created using the built-in default configuration.

An `object` can be supplied which is merged with the defaults and then passed to `@steveush/grunt-map-normalizer` task as its options.

A `function` can also be supplied which is passed the defaults and must return an `object` which is then passed to `@steveush/grunt-map-normalizer` task as its options.

### Example Usage

Using the default options to concat, Babel and then uglify multiple source files into a single file.

```js
"webjs": {
    "output.js": [ "file1.js", "file2.js", "file3.js" ]
}
```

Override the default options.

```js
"webjs": {
    "options": {
        "clean": false,
        "sourceMap": {
            "output": "virtual",
            "virtualRoot": "MyLib"
        },
        "babel": ( defaults ) => {
            return {
                ...defaults,
                presets: [ ...defaults.presets, 'some-preset' ]
            };
        }
    },
    "src": [ "file1.js", "file2.js", "file3.js" ],
    "dest": "output.js"
}
```

## WebCSS Task

_Run this task with the `grunt webcss` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](https://gruntjs.com/configuring-tasks) guide.

### Options

#### clean

Type: `Boolean`  
Default: `true`

Whether any existing destination files are removed before the build.

#### postcss

Type: `Boolean|Object|Function(Object):Object`  
Default: `true`

If `false` then PostCSS will not be run at all. If `true` then PostCSS will be run using the built-in default configuration which uses `autoprefixer`, `cssnano` and the value of the `sourceMap` option.

An `object` can be supplied which is merged with the defaults and then passed to `@lodder/grunt-postcss` task as its options.

A `function` can also be supplied which is passed the defaults and must return an `object` which is then passed to `@lodder/grunt-postcss` task as its options.

#### sass

Type: `Boolean|Object|Function(Object):Object`  
Default: `true`

If `false` then SASS will not be run at all. If `true` then SASS will be run using the built-in default configuration and the value of the `sourceMap` option.

An `object` can be supplied which is merged with the defaults and then passed to `grunt-sass` task as its options.

A `function` can also be supplied which is passed the defaults and must return an `object` which is then passed to `grunt-sass` task as its options.

#### sourceMap

Type: `Boolean|Object|Function(Object):Object`  
Default: `false`

If `false` then no source map will be created. If `true` then a source map will be created using the built-in default configuration.

An `object` can be supplied which is merged with the defaults and then passed to `@steveush/grunt-map-normalizer` task as its options.

A `function` can also be supplied which is passed the defaults and must return an `object` which is then passed to `@steveush/grunt-map-normalizer` task as its options.

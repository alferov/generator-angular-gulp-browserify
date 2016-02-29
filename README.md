# generator-angular-gulp-browserify

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][depstat-image]][depstat-url]

> A Yeoman generator for creating modern web applications using Angular, SASS, Gulp, and Browserify

## Packages
- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

## Getting Started
```bash
# Install Yeoman, gulp & the generator:
npm install -g yo gulp generator-angular-gulp-browserify

# Make a new directory, and 'cd' into it:
mkdir my-project && cd $_

#To initialize the generator, run:
yo angular-gulp-browserify

#Finally, run:
gulp dev
```

Your browser will automatically be opened and directed to the browser-sync proxy address.

Now that gulp dev is running, the server is up as well and serving files from the `/build` directory. Any changes in the `/app` directory will be automatically processed by gulp and the changes will be injected to any open browsers pointed at the proxy address.

## Overview
The complete project guide can be found in the [official boilerplate readme](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate/blob/master/README.md).

### Structure
The AngularJS files are all located within `/app/js`, structured in the following manner:

```
/controllers
  _index.js   (the main module on which all controllers will be mounted, loaded in main.js)
  example.js
/directives
  _index.js   (the main module on which all directives will be mounted, loaded in main.js)
  example.js
/services
  _index.js   (the main module on which all services will be mounted, loaded in main.js)
  example.js
constants.js  (any constant values that you want to make available to Angular)
main.js       (the main file read by Browserify, also where the application is defined and bootstrapped)
on_run.js     (any functions or logic that need to be executed on app.run)
on_config.js  (all route definitions and any logic that need to be executed on app.config)
templates.js  (this is created via gulp by compiling your views, and will not be present beforehand)
```

### Gulpfile features
- **JSHint:** gulp is currently configured to run a JSHint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring.
- **Browserify:** The main build process run on any Javascript files. This processes any of the `require('module')` statements, compiling the files as necessary.
- **Babelify:** This uses [babelJS](https://babeljs.io/) to provide support for ES6+ features.
- **Debowerify:** Parses `require()` statements in your code, mapping them to `bower_components` when necessary. This allows you to use and include bower components just as you would npm modules.
- **ngAnnotate:** This will automatically add the correct dependency injection to any AngularJS files, as mentioned previously.
- **Uglifyify:** This will minify the file created by Browserify and ngAnnotate.
- **Browser Sync**: Full-featured development web server with livereload and devices sync

### Testing
This generator also includes a simple framework for unit and end-to-end (e2e) testing via [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/). In order to test AngularJS modules, the [angular.mocks](https://docs.angularjs.org/api/ngMock/object/angular.mock) module is used.

All of the tests can be run at once with the command `gulp test`. However, the tests are broken up into two main categories:

## License
MIT © [Philipp Alferov](https://github.com/alferov)

[npm-url]: https://npmjs.org/package/generator-angular-gulp-browserify
[npm-image]: https://img.shields.io/npm/v/generator-angular-gulp-browserify.svg?style=flat-square

[travis-url]: https://travis-ci.org/alferov/generator-angular-gulp-browserify
[travis-image]: https://img.shields.io/travis/alferov/generator-angular-gulp-browserify.svg?style=flat-square

[depstat-url]: https://david-dm.org/alferov/generator-angular-gulp-browserify
[depstat-image]: https://david-dm.org/alferov/generator-angular-gulp-browserify.svg?style=flat-square

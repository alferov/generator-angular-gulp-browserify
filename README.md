# generator-angular-gulp-browserify [![Build Status](https://secure.travis-ci.org/alferov/generator-generator-angular-gulp-browserify.png?branch=master)](https://travis-ci.org/alferov/generator-angular-gulp-browserify)

An [AngularJS](https://angularjs.org/) project generator for [Yeoman](http://yeoman.io). This generator is build on top of [angularjs-gulp-browserify-boilerplate](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate). It uses SASS, Gulp, and Browserify and utilizes [best AngularJS practices](https://github.com/toddmotto/angularjs-styleguide) and Gulp best practices from [this resource](https://github.com/greypants/gulp-starter).

## Getting Started

Install `yo`

```bash
npm install -g yo gulp
```

Make a new directory, and `cd` into it:

```bash
mkdir my-ng-project && cd $_
```

To initialize generator, run

```bash
yo angular-gulp-browserify
```

## Overview

A full project description you can find in [official boilerplate readme](https://github.com/jakemmarsh/angularjs-gulp-browserify-boilerplate/blob/master/README.md).

### Packages

- [AngularJS](http://angularjs.org/)
- [SASS](http://sass-lang.com/)
- [Gulp](http://gulpjs.com/)
- [Browserify](http://browserify.org/)

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
templates.js  (this is created via Gulp by compiling your views, and will not be present beforehand)
```

### Gulpfile features

- **JSHint:** Gulp is currently configured to run a JSHint task before processing any Javascript files. This will show any errors in your code in the console, but will not prevent compilation or minification from occurring.
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

MIT

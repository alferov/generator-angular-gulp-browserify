/*global describe, before, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var mockery = require('mockery');

describe('angular with gulp and browserify generator', function () {

  before(function(done) {
    mockery.enable({warnOnUnregistered: false});

    mockery.registerMock('npm-name', function (name, fn) {
      fn(null, true);
    });

    helpers.run(path.join(__dirname, '../generators/app'))
      .withOptions({
        skipInstall: true,
      })
      .withPrompts({
        generatorName: 'temp'
      })
      .on('end', done);
  });

  after(function() {
    mockery.disable();
  });

  it('it should create dotfiles files', function () {

    assert.file([
      'package.json',
      'gulpfile.js',
      '.jshintrc',
      '.gitignore'
    ]);
  });

  it('it should create nested files and folders', function () {

    assert.file([
      'app/index.html',
      'app/js/main.js',
      'app/js/controllers/_index.js',
      'gulp/index.js',
      'gulp/tasks/browserify.js',
      'test/karma.conf.js',
      'test/e2e/example_spec.js',
      'test/unit/controllers/example_spec.js'
    ]);
  });

  it('fills package.json with correct information', function () {
    assert.fileContent('package.json',  /"name": "generator-temp"/);
  });

});

'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');
var glob = require('glob');
var _ = require('lodash');
var extend = _.assign;

// Helpers
var betterTypeErrors = function(expected, obj) {
  var type = typeof obj;
  throw new TypeError('Expected ' + expected + ' but got ' +  type);
};

// Perform a shallow copy of an object ignoring specified properties
var copyExcept = function(obj, except) {
  var result = {};

  if (!_.isArray(except)) {
    betterTypeErrors('an array', obj);
  }

  if (!_.isObject(obj)) {
    betterTypeErrors('an object', obj);
  }

  for (var prop in obj) {
    if (except.indexOf(prop) >= 0 && obj.hasOwnProperty(prop)) {
      continue ;
    }
    result[prop] = obj[prop];
  }

  return result;
};

// Generator initialization
var Generator = module.exports = function() {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function() {
  if (this.options['skip-welcome-message']) {
    return ;
  }

  var title = 'Welcome!';
  var text = [
    'You\'re using the fantastic generator for scaffolding an',
    'application with AngularJS, SASS, Gulp, and Browserify!'
  ].join('\s');

  this.log(yosay([chalk.red(title), chalk.yellow(text)].join('\n')));
};

Generator.prototype.askForGeneratorName = function() {
  var done = this.async();
  var prompts = [{
    name: 'appname',
    message: 'What\'s the name of your app?',
    default: 'app'
  }];

  this.prompt(prompts, function(props) {
    this.appname = props.appname;
    done();
  }.bind(this));
};

Generator.prototype.copyAll = function() {
  var files = glob.sync('**', { dot: true, nodir: true, cwd: this.sourceRoot() });
  var exclude = ['package.json', '.gitignore', '.npmignore'];
  var diff = _.difference(files, exclude);

  diff.forEach(function(value) {
    this.fs.copy(this.templatePath(value), this.destinationPath(value));
  }.bind(this));
};

Generator.prototype.gitignore = function() {
  if (this.fs.exists(this.templatePath('.gitignore'))) {
    this.copy('.gitignore', '.gitignore');
    return ;
  }

  if (this.fs.exists(this.templatePath('.npmignore'))) {
    this.copy('.npmignore', '.gitignore');
  }
};

Generator.prototype.packageJSON = function() {
  var templateRoot = this.sourceRoot();
  var pkg = this.fs.readJSON(templateRoot + '/package.json');
  var exclude = [
    'author',
    'repository',
    'private',
    'engines'
  ];
  var newValues = {
    name: this.appname,
    version: '1.0.0'
  };
  var copy = extend(copyExcept(pkg, exclude), newValues);
  this.fs.writeJSON(this.destinationPath('package.json'), copy);
};

Generator.prototype.npm = function() {
  this.npmInstall();
};

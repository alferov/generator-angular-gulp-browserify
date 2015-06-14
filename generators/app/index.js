'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');

var Generator = module.exports = function (args, options) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function () {
  if (!this.options['skip-welcome-message']) {
    this.log(yosay(
      [
        chalk.red('Welcome!'),
        chalk.yellow('You\'re using the fantastic generator for scaffolding an application with AngularJS, SASS, Gulp, and Browserify!')
      ].join('\n')
    ));
  }
};

Generator.prototype.askFor = function () {
  var cb = this.async(),
    prompts = [{
      type: 'confirm',
      name: 'installNpmDep',
      message: 'Would you like to install Node dependencies?',
      default: true
    }];

  this.prompt(prompts, function (answers) {
    this.installNpmDep = answers.installNpmDep;
    cb();
  }.bind(this));
};

Generator.prototype.app = function () {
  this.directory('app', 'app');
  this.copy('.gitignore', '.gitignore');
  this.copy('.jshintrc', '.jshintrc');

};

Generator.prototype.test = function () {
  this.directory('test', 'test');
};

Generator.prototype.gulp = function () {
  this.directory('gulp', 'gulp');
  this.copy('gulpfile.js', 'gulpfile.js');
};

Generator.prototype.npm = function () {
  this.copy('package.json', 'package.json');

  if (this.installNpmDep) {
    this.npmInstall();
  }
};

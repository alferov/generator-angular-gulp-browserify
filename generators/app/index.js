'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');
var fs = require('fs');

var Generator = module.exports = function (args, options) {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function() {
  if (!this.options['skip-welcome-message']) {
    this.log(yosay(
      [
        chalk.red('Welcome!'),
        chalk.yellow(['You\'re using the fantastic generator for scaffolding an',
        'application with AngularJS, SASS, Gulp, and Browserify!'].join('\s'))
      ].join('\n')
    ));
  }
};

Generator.prototype.askFor = function() {
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

Generator.prototype.app = function() {
  this.directory('app', 'app');
  this.copy('.jshintrc', '.jshintrc');
};

Generator.prototype.gitignore = function() {
  var templateRoot = this.templatePath('');

  if (fs.existsSync(templateRoot + '/.gitignore')) {
    this.copy('.gitignore', '.gitignore');
    return ;
  }

  //If generator templates are served by npm (npm serves .gitignore as
  //.npmignore), generator treats .npmignore as .gitignore
  if (fs.existsSync(templateRoot + '/.npmignore')) {
    this.copy('.npmignore', '.gitignore');
    return ;
  }

  var output = this.destinationPath('.gitignore');
  var content = ['.DS_Store', '# Logs', 'logs', '*.log', '# Runtime data', 'pids',
    'lib-cov', '# Coverage directory used by tools like istanbul',
    'coverage', '# Compiled binary addons (http://nodejs.org/api/addons.html)',
    'build/Release', '# Dependency directories', 'node_modules',
    'bower_components', '# Build files', 'build', 'templates.js', '#webstorm',
    '.idea'
  ].join('\n');

  fs.writeFile(output, content, function(err) {
    if(err) {
      return console.log(err);
    }
  });
};

Generator.prototype.test = function() {
  this.directory('test', 'test');
};

Generator.prototype.gulp = function() {
  this.directory('gulp', 'gulp');
  this.copy('gulpfile.js', 'gulpfile.js');
};

Generator.prototype.npm = function() {
  this.copy('package.json', 'package.json');

  if (this.installNpmDep) {
    this.npmInstall();
  }
};

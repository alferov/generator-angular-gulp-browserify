'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');
var fs = require('fs');
var _s = require('underscore.string');

var Generator = module.exports = function() {
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

};

Generator.prototype.app = function() {
  this.directory('app', 'app');
  this.copy('.jshintrc', '.jshintrc');
};

Generator.prototype.gitignore = function() {
  var templateRoot = this.sourceRoot();

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
  var templateRoot = this.sourceRoot();
  var destinationRoot = this.destinationRoot();
  var pkg = JSON.parse(fs.readFileSync(templateRoot + '/package.json'));
  var exclude = [
    'version',
    'author',
    'description',
    'repository',
    'private',
    'engines'
  ];

  for (var prop in pkg) {
    if (exclude.indexOf(prop) >= 0 && pkg.hasOwnProperty(prop)) {
      delete pkg[prop];
    }
  }

  pkg.name = _s.slugify(this.appname);

  var json = JSON.stringify(pkg, null, 2);
  var filename = destinationRoot + '/package.json';

  fs.writeFileSync(filename, json);

  this.npmInstall();
};

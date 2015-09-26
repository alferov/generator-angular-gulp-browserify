'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var util = require('util');
var fs = require('fs');
var path = require('path');
var _s = require('underscore.string');
var glob = require('glob');

var Generator = module.exports = function() {
  yeoman.generators.Base.apply(this, arguments);
};

util.inherits(Generator, yeoman.generators.Base);

Generator.prototype.welcome = function() {
  if (!this.options['skip-welcome-message']) {
    this.log(yosay([
        chalk.red('Welcome!'),
        chalk.yellow(['You\'re using the fantastic generator for scaffolding an',
        'application with AngularJS, SASS, Gulp, and Browserify!'].join('\s'))
      ].join('\n')
    ));
  }
};

// Use custom method to copy all files from the root folder.
// Yeoman's 'copy' method doesn't support
Generator.prototype.copyAll = function() {
  var templateRoot = this.sourceRoot();
  var destinationRoot = this.destinationRoot();
  var files = glob.sync('**', { dot: true, nodir: true, cwd: templateRoot });
  var cp = this.copy;
  var exclude = ['package.json', '.gitignore', '.npmignore'];

  for (var i in files) {
    var file = files[i];

    if (exclude.indexOf(file) >= 0) {
      continue;
    }

    var dest = path.join(destinationRoot, files[i]);
    cp.call(this, path.join(templateRoot, files[i]), dest);
  }
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

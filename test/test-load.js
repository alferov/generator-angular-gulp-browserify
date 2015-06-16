/*global it, describe */
'use strict';

var assert  = require('assert');

describe('angular with gulp and browserify generator', function () {
  it('can be imported without blowing up', function () {
    var app = require('../generators/app');
    assert(app !== undefined);
  });
});

'use strict';
var path = require('path');
var assert = require('yeoman-assert');
var helpers = require('yeoman-test');

describe('generator-pwa-lite:pwa', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({pwaNameTag: 'pwa-lite'});
  });

  it('creates files', () => {
    assert.file([
      'index.html',
      'manifest.json',
      'LICENSE.md',
      'package.json',
      'polymer.json',
      'README.md',
      'service-worker.js',
      'wct.conf.json',
      'src/store.js',
      'src/components/pwa-lite.js'
    ]);
  });
});

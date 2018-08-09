define('cyclorama-kiosk/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/cyclorama-painting.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/cyclorama-painting.js should pass ESLint\n\n3:10 - \'A\' is defined but never used. (no-unused-vars)\n21:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n22:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n23:3 - Only string, number, symbol, boolean, null, undefined, and function are allowed as default properties (ember/avoid-leaking-state-in-ember-objects)\n118:9 - Unexpected console statement. (no-console)\n127:7 - Unexpected console statement. (no-console)\n142:36 - \'bar\' is defined but never used. (no-unused-vars)');
  });

  QUnit.test('components/painting-pois.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/painting-pois.js should pass ESLint\n\n8:12 - \'L\' is not defined. (no-undef)\n11:15 - \'L\' is not defined. (no-undef)');
  });

  QUnit.test('controllers/application.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'controllers/application.js should pass ESLint\n\n');
  });

  QUnit.test('helpers/doughnut.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/doughnut.js should pass ESLint\n\n');
  });

  QUnit.test('hotspots.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'hotspots.js should pass ESLint\n\n');
  });

  QUnit.test('resolver.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass ESLint\n\n');
  });

  QUnit.test('router.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass ESLint\n\n');
  });
});
define('cyclorama-kiosk/tests/app.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | app');

  QUnit.test('app.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass ESLint\n\n');
  });

  QUnit.test('components/cyclorama-painting.js', function (assert) {
    assert.expect(1);
    assert.ok(false, 'components/cyclorama-painting.js should pass ESLint\n\n22:3 - Duplicate key \'crs\'. (no-dupe-keys)');
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
define('cyclorama-kiosk/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/cyclorama-painting-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/cyclorama-painting-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/helpers/doughnut-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/helpers/doughnut-test.js should pass ESLint\n\n');
  });

  QUnit.test('test-helper.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass ESLint\n\n');
  });

  QUnit.test('unit/controllers/application-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/controllers/application-test.js should pass ESLint\n\n');
  });
});
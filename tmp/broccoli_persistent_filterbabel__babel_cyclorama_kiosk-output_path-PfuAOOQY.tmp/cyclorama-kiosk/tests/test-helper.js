define('cyclorama-kiosk/tests/test-helper', ['cyclorama-kiosk/app', 'cyclorama-kiosk/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
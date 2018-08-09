'use strict';

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
define('cyclorama-kiosk/tests/integration/components/cyclorama-painting-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | cyclorama-painting', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "OGfuZXaj",
        "block": "{\"symbols\":[],\"statements\":[[1,[18,\"cyclorama-painting\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "S29klRE/",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"cyclorama-painting\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('cyclorama-kiosk/tests/integration/components/painting-pois-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Component | painting-pois', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    (0, _qunit.test)('it renders', async function (assert) {
      // Set any properties with this.set('myProperty', 'value');
      // Handle any actions with this.set('myAction', function(val) { ... });

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "tROfoPKD",
        "block": "{\"symbols\":[],\"statements\":[[1,[18,\"painting-pois\"],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '');

      // Template block usage:
      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "lwbnEZTc",
        "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[4,\"painting-pois\",null,null,{\"statements\":[[0,\"        template block text\\n\"]],\"parameters\":[]},null],[0,\"    \"]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), 'template block text');
    });
  });
});
define('cyclorama-kiosk/tests/integration/helpers/doughnut-test', ['qunit', 'ember-qunit', '@ember/test-helpers'], function (_qunit, _emberQunit, _testHelpers) {
  'use strict';

  (0, _qunit.module)('Integration | Helper | doughnut', function (hooks) {
    (0, _emberQunit.setupRenderingTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it renders', async function (assert) {
      this.set('inputValue', '1234');

      await (0, _testHelpers.render)(Ember.HTMLBars.template({
        "id": "+jiKA8Fs",
        "block": "{\"symbols\":[],\"statements\":[[1,[25,\"doughnut\",[[20,[\"inputValue\"]]],null],false]],\"hasEval\":false}",
        "meta": {}
      }));

      assert.equal(this.element.textContent.trim(), '1234');
    });
  });
});
define('cyclorama-kiosk/tests/test-helper', ['cyclorama-kiosk/app', 'cyclorama-kiosk/config/environment', '@ember/test-helpers', 'ember-qunit'], function (_app, _environment, _testHelpers, _emberQunit) {
  'use strict';

  (0, _testHelpers.setApplication)(_app.default.create(_environment.default.APP));

  (0, _emberQunit.start)();
});
define('cyclorama-kiosk/tests/tests.lint-test', [], function () {
  'use strict';

  QUnit.module('ESLint | tests');

  QUnit.test('integration/components/cyclorama-painting-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/cyclorama-painting-test.js should pass ESLint\n\n');
  });

  QUnit.test('integration/components/painting-pois-test.js', function (assert) {
    assert.expect(1);
    assert.ok(true, 'integration/components/painting-pois-test.js should pass ESLint\n\n');
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
define('cyclorama-kiosk/tests/unit/controllers/application-test', ['qunit', 'ember-qunit'], function (_qunit, _emberQunit) {
  'use strict';

  (0, _qunit.module)('Unit | Controller | application', function (hooks) {
    (0, _emberQunit.setupTest)(hooks);

    // Replace this with your real tests.
    (0, _qunit.test)('it exists', function (assert) {
      let controller = this.owner.lookup('controller:application');
      assert.ok(controller);
    });
  });
});
define('cyclorama-kiosk/config/environment', [], function() {
  var prefix = 'cyclorama-kiosk';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

require('cyclorama-kiosk/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;
//# sourceMappingURL=tests.map

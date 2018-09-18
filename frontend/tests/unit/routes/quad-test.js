import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | quad', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:quad');
    assert.ok(route);
  });
});

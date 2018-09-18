import EmberObject from '@ember/object';
import PaintingActionsMixin from 'cyclorama-kiosk/mixins/painting-actions';
import { module, test } from 'qunit';

module('Unit | Mixin | painting-actions', function() {
  // Replace this with your real tests.
  test('it works', function (assert) {
    let PaintingActionsObject = EmberObject.extend(PaintingActionsMixin);
    let subject = PaintingActionsObject.create();
    assert.ok(subject);
  });
});

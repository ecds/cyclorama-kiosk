define('ember-leaflet/mixins/draggability', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Mixin.create({

    draggableDidChange: Ember.observer('draggable', function () {
      if (this.get('draggable')) {
        this._layer.dragging.enable();
      } else {
        this._layer.dragging.disable();
      }
    })

  });
});
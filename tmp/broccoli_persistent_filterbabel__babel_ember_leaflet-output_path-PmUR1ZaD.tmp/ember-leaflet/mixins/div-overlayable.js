define('ember-leaflet/mixins/div-overlayable', ['exports', 'ember-composability-tools', 'ember-leaflet/templates/div-overlayable'], function (exports, _emberComposabilityTools, _divOverlayable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Mixin.create(_emberComposabilityTools.ParentMixin, _emberComposabilityTools.ChildMixin, {
    layout: _divOverlayable.default
  });
});
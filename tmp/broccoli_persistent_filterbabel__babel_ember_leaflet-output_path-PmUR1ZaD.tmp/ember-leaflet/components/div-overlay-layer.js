define('ember-leaflet/components/div-overlay-layer', ['exports', 'ember-leaflet/components/base-layer', 'ember-leaflet/templates/div-overlay', 'ember-composability-tools'], function (exports, _baseLayer, _divOverlay, _emberComposabilityTools) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _baseLayer.default.extend(_emberComposabilityTools.RenderBlockMixin, {
    layout: _divOverlay.default,

    leafletOptions: ['offset', 'className', 'pane'],

    fastboot: Ember.computed(function () {
      let owner = Ember.getOwner(this);
      return owner.lookup('service:fastboot');
    }),

    isFastBoot: Ember.computed('fastboot', function () {
      return this.get('fastboot') && this.get('fastboot.isFastBoot');
    })
  });
});
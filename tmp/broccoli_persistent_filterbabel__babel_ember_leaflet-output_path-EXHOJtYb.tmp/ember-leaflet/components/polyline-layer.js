define('ember-leaflet/components/polyline-layer', ['exports', 'ember-leaflet/components/array-path-layer'], function (exports, _arrayPathLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _arrayPathLayer.default.extend({
    leafletOptions: ['smoothFactor', 'noClip'],

    createLayer() {
      return this.L.polyline(...this.get('requiredOptions'), this.get('options'));
    }
  });
});
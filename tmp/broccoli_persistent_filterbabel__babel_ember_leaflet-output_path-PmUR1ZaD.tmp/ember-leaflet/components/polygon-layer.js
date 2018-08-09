define('ember-leaflet/components/polygon-layer', ['exports', 'ember-leaflet/components/polyline-layer'], function (exports, _polylineLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _polylineLayer.default.extend({
    createLayer() {
      return this.L.polygon(...this.get('requiredOptions'), this.get('options'));
    }
  });
});
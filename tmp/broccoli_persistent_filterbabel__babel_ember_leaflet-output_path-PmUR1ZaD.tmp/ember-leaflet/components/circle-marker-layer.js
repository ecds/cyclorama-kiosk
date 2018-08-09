define('ember-leaflet/components/circle-marker-layer', ['exports', 'ember-leaflet/components/point-path-layer'], function (exports, _pointPathLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pointPathLayer.default.extend({

    leafletOptions: ['radius'],

    leafletProperties: ['radius'],

    createLayer() {
      return this.L.circleMarker(...this.get('requiredOptions'), this.get('options'));
    }
  });
});
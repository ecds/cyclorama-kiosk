define('ember-leaflet/components/circle-layer', ['exports', 'ember-leaflet/components/point-path-layer'], function (exports, _pointPathLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pointPathLayer.default.extend({

    leafletRequiredOptions: ['radius'],

    leafletProperties: ['radius'],

    createLayer() {
      return this.L.circle(...this.get('requiredOptions'), this.get('options'));
    }
  });
});
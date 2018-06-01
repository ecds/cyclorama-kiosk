define('ember-leaflet/components/wms-tile-layer', ['exports', 'ember-leaflet/components/tile-layer'], function (exports, _tileLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _tileLayer.default.extend({

    leafletOptions: ['layers', 'styles', 'format', 'transparent', 'version', 'crs'],

    createLayer() {
      return this.L.tileLayer.wms(...this.get('requiredOptions'), this.get('options'));
    }

  });
});
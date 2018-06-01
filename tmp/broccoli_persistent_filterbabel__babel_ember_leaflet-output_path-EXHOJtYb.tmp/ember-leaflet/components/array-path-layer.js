define('ember-leaflet/components/array-path-layer', ['exports', 'ember-leaflet/components/path-layer'], function (exports, _pathLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pathLayer.default.extend({

    leafletRequiredOptions: ['locations'],

    leafletProperties: ['locations.[]:setLatLngs']
  });
});
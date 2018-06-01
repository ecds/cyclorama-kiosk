define('ember-leaflet/components/point-path-layer', ['exports', 'ember-leaflet/components/path-layer', 'ember-leaflet/macros/to-lat-lng'], function (exports, _pathLayer, _toLatLng) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pathLayer.default.extend({

    leafletRequiredOptions: ['location'],

    leafletProperties: ['location:setLatLng'],

    location: (0, _toLatLng.default)()
  });
});
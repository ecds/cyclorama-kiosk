define('cyclorama-kiosk/helpers/lat-lng-bounds', ['exports', 'ember-leaflet/helpers/lat-lng-bounds'], function (exports, _latLngBounds) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _latLngBounds.default;
    }
  });
  Object.defineProperty(exports, 'latLngBounds', {
    enumerable: true,
    get: function () {
      return _latLngBounds.latLngBounds;
    }
  });
});
define('ember-leaflet/macros/to-lat-lng', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  exports.default = function (latKey = 'lat', lngKey = 'lng') {
    return Ember.computed(latKey, lngKey, {
      get() {
        let [lat, lng] = [this.get(latKey), this.get(lngKey)];
        return this.L.latLng(lat, lng);
      },
      set(key, value) {
        this.setProperties({
          [latKey]: value ? value.lat : value,
          [lngKey]: value ? value.lng : value
        });
        return value;
      }
    });
  };
});
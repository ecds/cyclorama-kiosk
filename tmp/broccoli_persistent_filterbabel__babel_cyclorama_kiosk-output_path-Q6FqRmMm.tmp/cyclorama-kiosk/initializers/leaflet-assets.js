define('cyclorama-kiosk/initializers/leaflet-assets', ['exports', 'ember-get-config'], function (exports, _emberGetConfig) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() /* container, application */{
    if (typeof FastBoot === 'undefined') {
      let prefix = '';

      if (!Ember.isNone(_emberGetConfig.default.rootURL)) {
        prefix = _emberGetConfig.default.rootURL;
      } else if (!Ember.isNone(_emberGetConfig.default.baseURL)) {
        prefix = _emberGetConfig.default.baseURL;
      }

      L.Icon.Default.imagePath = `${prefix}assets/images/`;
    }
  }

  exports.default = {
    name: 'leaflet-assets',
    initialize
  };
});
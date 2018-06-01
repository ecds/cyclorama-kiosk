define('ember-leaflet/helpers/div-icon', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const isFastBoot = typeof FastBoot !== 'undefined';

  const divIcon = exports.divIcon = isFastBoot ? function () {} : function divIcon(_, hash) {
    return L.divIcon(hash);
  };

  exports.default = Ember.Helper.helper(divIcon);
});
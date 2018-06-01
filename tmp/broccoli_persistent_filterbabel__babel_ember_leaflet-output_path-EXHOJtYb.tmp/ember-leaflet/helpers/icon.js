define('ember-leaflet/helpers/icon', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const isFastBoot = typeof FastBoot !== 'undefined';

  const icon = exports.icon = isFastBoot ? function () {} : function icon(_, hash) {
    return L.icon(hash);
  };

  exports.default = Ember.Helper.helper(icon);
});
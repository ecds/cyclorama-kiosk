define('ember-leaflet/helpers/point', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const isFastBoot = typeof FastBoot !== 'undefined';

  const point = exports.point = isFastBoot ? function () {} : function point(params) {
    return L.point(...params);
  };

  exports.default = Ember.Helper.helper(point);
});
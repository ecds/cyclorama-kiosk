define('cyclorama-kiosk/helpers/doughnut', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.doughnut = doughnut;
  function doughnut(hotSpotPolygon) {
    return [[[-55, 170], [-55, -170], [55, -170], [55, 170]], hotSpotPolygon];
  }

  exports.default = Ember.Helper.helper(doughnut);
});
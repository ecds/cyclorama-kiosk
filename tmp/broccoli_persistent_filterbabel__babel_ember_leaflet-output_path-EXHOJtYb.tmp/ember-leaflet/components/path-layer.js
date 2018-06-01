define('ember-leaflet/components/path-layer', ['exports', 'ember-leaflet/components/base-layer', 'ember-leaflet/mixins/div-overlayable', 'ember-leaflet/mixins/style'], function (exports, _baseLayer, _divOverlayable, _style) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _baseLayer.default.extend(_divOverlayable.default, _style.default, {

    leafletOptions: ['stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor', 'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin', 'clickable', 'pointerEvents', 'className'],

    leafletEvents: ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'add', 'remove', 'popupopen', 'popupclose']
  });
});
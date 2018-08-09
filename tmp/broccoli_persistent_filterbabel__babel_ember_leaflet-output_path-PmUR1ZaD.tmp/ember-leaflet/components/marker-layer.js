define('ember-leaflet/components/marker-layer', ['exports', 'ember-leaflet/components/base-layer', 'ember-leaflet/mixins/draggability', 'ember-leaflet/mixins/div-overlayable', 'ember-leaflet/macros/to-lat-lng'], function (exports, _baseLayer, _draggability, _divOverlayable, _toLatLng) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _baseLayer.default.extend(_draggability.default, _divOverlayable.default, {

    leafletRequiredOptions: ['location'],

    leafletOptions: ['icon', 'clickable', 'draggable', 'keyboard', 'title', 'alt', 'zIndexOffset', 'opacity', 'riseOnHover', 'riseOffset'],

    leafletEvents: ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'dragstart', 'drag', 'dragend', 'move', 'moveend', 'remove', 'add', 'popupopen', 'popupclose'],

    leafletProperties: ['zIndexOffset', 'opacity', 'location:setLatLng'],

    location: (0, _toLatLng.default)(),

    createLayer() {
      return this.L.marker(...this.get('requiredOptions'), this.get('options'));
    },

    // icon observer separated from generated (leaflet properties) due to a
    // leaflet bug where draggability is lost on icon change
    iconDidChange: Ember.observer('icon', function () {
      this._layer.setIcon(this.get('icon'));

      if (this.get('draggable')) {
        this._layer.dragging.enable();
      } else {
        this._layer.dragging.disable();
      }
    })
  });
});
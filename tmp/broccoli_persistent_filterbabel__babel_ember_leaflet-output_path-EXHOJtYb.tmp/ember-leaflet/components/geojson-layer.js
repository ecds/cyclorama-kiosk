define('ember-leaflet/components/geojson-layer', ['exports', 'ember-leaflet/components/base-layer', 'ember-leaflet/mixins/style', 'ember-leaflet/mixins/div-overlayable'], function (exports, _baseLayer, _style, _divOverlayable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _baseLayer.default.extend(_divOverlayable.default, _style.default, {
    leafletRequiredOptions: ['geoJSON'],

    leafletOptions: ['stroke', 'color', 'weight', 'opacity', 'fill', 'fillColor', 'fillOpacity', 'fillRule', 'dashArray', 'lineCap', 'lineJoin', 'clickable', 'pointerEvents', 'className', 'pointToLayer', 'style', 'onEachFeature', 'filter', 'coordsToLatLng'],

    leafletEvents: ['click', 'dblclick', 'mousedown', 'mouseover', 'mouseout', 'contextmenu', 'add', 'remove', 'popupopen', 'popupclose'],

    didUpdateAttrs() {
      this._super(...arguments);

      let geoJSON = this.get('geoJSON');
      if (geoJSON) {
        this.pushDataToLeaflet(geoJSON);
      }
    },

    pushDataToLeaflet(geoJSON) {
      if (!this._layer) {
        return;
      }

      // recall that GeoJSON layers are actually layer groups -- we have to clear
      // their contents first...
      this._layer.clearLayers();

      if (geoJSON) {
        // ...then add new data to recreate the child layers in an updated form
        this._layer.addData(geoJSON);
      }
    },

    createLayer() {
      return this.L.geoJson(...this.get('requiredOptions'), this.get('options'));
    }
  });
});
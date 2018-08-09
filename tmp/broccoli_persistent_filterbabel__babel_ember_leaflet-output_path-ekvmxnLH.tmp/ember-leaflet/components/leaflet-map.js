define('ember-leaflet/components/leaflet-map', ['exports', 'ember-leaflet/components/base-layer', 'ember-composability-tools', 'ember-leaflet/macros/to-lat-lng', 'ember-leaflet/templates/leaflet-map'], function (exports, _baseLayer, _emberComposabilityTools, _toLatLng, _leafletMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  const assign = Ember.assign || Ember.merge;

  exports.default = _baseLayer.default.extend(_emberComposabilityTools.ParentMixin, {
    tagName: 'div',
    layout: _leafletMap.default,

    leafletOptions: [
    // Map state options
    'center', 'zoom', 'minZoom', 'maxZoom', 'maxBounds', 'crs',
    // Interaction options
    'dragging', 'touchZoom', 'scrollWheelZoom', 'doubleClickZoom', 'boxZoom', 'tap', 'tapTolerance', 'trackResize', 'worldCopyJump', 'closePopupOnClick', 'bounceAtZoomLimits', 'wheelPxPerZoomLevel', 'zoomDelta', 'zoomSnap',
    // Keyboard navigation options
    'keyboard', 'keyboardPanOffset', 'keyboardZoomOffset',
    // Panning Inertia Options
    'inertia', 'inertiaDeceleration', 'inertiaMaxSpeed', 'inertiaThreshold', 'easeLinearity', 'worldCopyJump', 'maxBoundsViscosity',
    // Control options
    'zoomControl', 'attributionControl',
    // Animation options
    'fadeAnimation', 'zoomAnimation', 'zoomAnimationThreshold', 'markerZoomAnimation'],

    // Events this map can respond to.
    leafletEvents: ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'mousemove', 'contextmenu', 'focus', 'blur', 'preclick', 'load', 'unload', 'viewreset', 'movestart', 'move', 'moveend', 'dragstart', 'drag', 'dragend', 'zoomstart', 'zoomend', 'zoomlevelschange', 'resize', 'autopanstart', 'layeradd', 'layerremove', 'baselayerchange', 'overlayadd', 'overlayremove', 'locationfound', 'locationerror', 'popupopen', 'popupclose'],

    leafletProperties: ['zoom:setZoom:zoomPanOptions', 'minZoom', 'maxZoom', 'center:panTo:zoomPanOptions', 'bounds:fitBounds:fitBoundsOptions', 'maxBounds'],

    center: (0, _toLatLng.default)(),

    // By default all layers try to register in a container layer.
    // It is not the case of the map itself as it is the topmost container.
    registerWithParent() {},
    unregisterWithParent() {},

    createLayer() {
      let options = this.get('options');

      // Don't set center and zoom right now.
      // Let base layer bind the events first
      delete options.center;
      delete options.zoom;
      return this.L.map(this.element, options);
    },

    // Manually call `remove` method in the case of the root map layer.
    willDestroyParent() {
      let layer = this._layer;
      this._super(...arguments);
      layer.remove();
    },

    didCreateLayer() {
      // after base layer bound the events, we can now set the map's view
      (true && !(this.get('bounds') && !this.get('center') && this.get('zoom') === undefined || !this.get('bounds') && this.get('center') && this.get('zoom') !== undefined) && Ember.assert('You must provide either valid `bounds` or a `center` (or `lat`/`lng`) and a `zoom` value.', this.get('bounds') && !this.get('center') && this.get('zoom') === undefined || !this.get('bounds') && this.get('center') && this.get('zoom') !== undefined));

      if (this.get('bounds')) {
        this._layer.fitBounds(this.get('bounds'), assign({ reset: true }, this.get('fitBoundsOptions')));
      } else {
        this._layer.setView(this.get('center'), this.get('zoom'), assign({ reset: true }, this.get('zoomPanOptions')));
      }
    }
  });
});
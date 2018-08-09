define('ember-leaflet/index', ['exports', 'ember-leaflet/components/circle-layer', 'ember-leaflet/components/circle-marker-layer', 'ember-leaflet/components/geojson-layer', 'ember-leaflet/components/image-layer', 'ember-leaflet/components/leaflet-map', 'ember-leaflet/components/marker-layer', 'ember-leaflet/components/polygon-layer', 'ember-leaflet/components/polyline-layer', 'ember-leaflet/components/popup-layer', 'ember-leaflet/components/tile-layer', 'ember-leaflet/components/tooltip-layer', 'ember-leaflet/components/wms-tile-layer', 'ember-leaflet/macros/to-lat-lng'], function (exports, _circleLayer, _circleMarkerLayer, _geojsonLayer, _imageLayer, _leafletMap, _markerLayer, _polygonLayer, _polylineLayer, _popupLayer, _tileLayer, _tooltipLayer, _wmsTileLayer, _toLatLng) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'CircleLayer', {
    enumerable: true,
    get: function () {
      return _circleLayer.default;
    }
  });
  Object.defineProperty(exports, 'CircleMarkerLayer', {
    enumerable: true,
    get: function () {
      return _circleMarkerLayer.default;
    }
  });
  Object.defineProperty(exports, 'GeojsonLayer', {
    enumerable: true,
    get: function () {
      return _geojsonLayer.default;
    }
  });
  Object.defineProperty(exports, 'ImageLayer', {
    enumerable: true,
    get: function () {
      return _imageLayer.default;
    }
  });
  Object.defineProperty(exports, 'LeafletMap', {
    enumerable: true,
    get: function () {
      return _leafletMap.default;
    }
  });
  Object.defineProperty(exports, 'MarkerLayer', {
    enumerable: true,
    get: function () {
      return _markerLayer.default;
    }
  });
  Object.defineProperty(exports, 'PolygonLayer', {
    enumerable: true,
    get: function () {
      return _polygonLayer.default;
    }
  });
  Object.defineProperty(exports, 'PolylineLayer', {
    enumerable: true,
    get: function () {
      return _polylineLayer.default;
    }
  });
  Object.defineProperty(exports, 'PopupLayer', {
    enumerable: true,
    get: function () {
      return _popupLayer.default;
    }
  });
  Object.defineProperty(exports, 'TileLayer', {
    enumerable: true,
    get: function () {
      return _tileLayer.default;
    }
  });
  Object.defineProperty(exports, 'TooltipLayer', {
    enumerable: true,
    get: function () {
      return _tooltipLayer.default;
    }
  });
  Object.defineProperty(exports, 'WmsTileLayer', {
    enumerable: true,
    get: function () {
      return _wmsTileLayer.default;
    }
  });
  Object.defineProperty(exports, 'toLatLng', {
    enumerable: true,
    get: function () {
      return _toLatLng.default;
    }
  });
  const L = window.L || {};
  exports.L = L;
  exports.Leaflet = L;
});
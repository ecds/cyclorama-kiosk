"use strict";



define('cyclorama-kiosk/app', ['exports', 'cyclorama-kiosk/resolver', 'ember-load-initializers', 'cyclorama-kiosk/config/environment'], function (exports, _resolver, _emberLoadInitializers, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const App = Ember.Application.extend({
    modulePrefix: _environment.default.modulePrefix,
    podModulePrefix: _environment.default.podModulePrefix,
    Resolver: _resolver.default
  });

  (0, _emberLoadInitializers.default)(App, _environment.default.modulePrefix);

  exports.default = App;
});
define('cyclorama-kiosk/components/array-path-layer', ['exports', 'ember-leaflet/components/array-path-layer'], function (exports, _arrayPathLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _arrayPathLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/base-layer', ['exports', 'ember-leaflet/components/base-layer'], function (exports, _baseLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _baseLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/circle-layer', ['exports', 'ember-leaflet/components/circle-layer'], function (exports, _circleLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _circleLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/circle-marker-layer', ['exports', 'ember-leaflet/components/circle-marker-layer'], function (exports, _circleMarkerLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _circleMarkerLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/container-layer', ['exports', 'ember-leaflet/components/container-layer'], function (exports, _containerLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _containerLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/cyclorama-painting', ['exports', 'fetch', 'uikit'], function (exports, _fetch, _uikit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    // classNames: ['uk-width-1-1'],
    bounds: null,
    L: null,
    _map: null,
    activeHotSpot: null,
    panel: null,
    showThumbNav: true,
    miniMap: null,
    data: null,
    crs: L.CRS.Simple,
    activeButton: 'people',
    people: {},
    landmarks: {},
    alterations: {},

    didInsertElement() {
      // q3
      // set(this, 'bounds', new L.latLngBounds([
      //   new L.LatLng(-99.625, 0.25),
      //   new L.LatLng(-0.26318359375, 239.77783203125)
      // ]));
      //q1
      Ember.set(this, 'bounds', new L.latLngBounds([new L.LatLng(0, 240), new L.LatLng(-80, 0)]));

      (0, _fetch.default)('/cyclorama-kiosk/q1/people.json').then(response => {
        response.json().then(data => {
          this.setProperties({
            people: data,
            activePois: data
          });
        });
      });

      (0, _fetch.default)('/cyclorama-kiosk/q1/landmarks.json').then(response => {
        response.json().then(data => {
          this.setProperties({
            landmarks: data
          });
        });
      });

      (0, _fetch.default)('/cyclorama-kiosk/buttons.json').then(response => {
        response.json().then(data => {
          this.setProperties({ buttons: data });
        });
      });
    },

    didRender() {
      let panel = _uikit.default.offcanvas(document.getElementById('panel'), {
        mode: 'push',
        bgClose: false
      });
      Ember.set(this, 'panel', panel);

      if (Ember.get(this, '_map') && Ember.get(this, 'miniMap') === null) {
        var painting = new L.tileLayer('https://s3.amazonaws.com/battleofatlanta/tiles/q1/{z}/{x}/{y}.png', {
          crs: Ember.get(this, 'crs'),
          minZoom: 0,
          maxZoom: 0,
          bounds: Ember.get(this, 'bounds')
        });
        let miniMap = new L.Control.MiniMap(painting, {
          zoomLevelFixed: true,
          width: document.getElementsByTagName('body')[0].clientHeight / 10 * 2,
          height: document.getElementsByTagName('body')[0].clientHeight / 10,
          aimingRectOptions: {
            stroke: '#688EAB'
          }
        });
        this.setProperties({ miniMap: miniMap });
        miniMap.addTo(Ember.get(this, '_map'));
        let lCtrlContainer = miniMap.getContainer();
        let newCtrlContainer = document.getElementById('minimap');
        newCtrlContainer.appendChild(lCtrlContainer);
      }

      // https://geoserver-private.ecds.emory.edu/ECDS_Projects/wms?service=WMS&request=GetMap&layers=ECDS_Projects%3Akioskexample_geo&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=512&height=512&srs=EPSG%3A3857&bbox=0,-10018754.171394622,10018754.171394622,0
      // https://geoserver-private.ecds.emory.edu/ECDS_Projects/wms?service=WMS&request=GetMap&layers=&styles=&format=image%2Fpng&transparent=false&version=1.1.1&layer=ECDS_Projects%3Akioskexample_geo&width=512&height=512&srs=EPSG%3A3857&bbox=-20037508.342789244,-20037508.34278071,60112525.02836774,20037508.34278071

      _uikit.default.util.on(document.getElementById('panel'), 'show', () => {
        document.getElementsByClassName('leaflet-container')[0].style.width = '67vw';
      });

      // UIkit.util.on(document.getElementById('panel'), 'hide', () => {
      //   document.getElementsByClassName('leaflet-container')[0].style.width = '100%';
      // });
    },

    // paintingBounds: A([[-55, 170],[-55, -170],[55, -170],[55, 170]]),

    actions: {
      initMap(event) {
        let map = event.target;
        map.zoomControl.setPosition('topright');
        // map.setZoom(3);
        map.fitBounds(Ember.get(this, 'bounds'));
        Ember.set(this, '_map', map);
        map.on('click', function (e) {
          console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng);
        });
      },

      paintingLoaded() {
        // get(this, _map).fitBounds(get(this, 'bounds'));
      },

      whatBounds() {
        console.log(Ember.get(this, '_map'));
      },

      switchPoi(button) {
        this.send('reCenter');
        this.buttons.forEach(b => {
          Ember.set(b, 'active', false);
        });
        Ember.set(button, 'active', true);
        this.setProperties({
          activeButton: button.label,
          activePois: Ember.get(this, button.label)
        });
      },

      highlightHotspot(hotspot, foo, bar) {
        this.activePois.forEach(hs => {
          Ember.set(hs, 'active', false);
        });
        Ember.set(hotspot, 'active', true);
        Ember.set(this, 'activeHotspot', hotspot);
      },

      flyToHotspot(hotspot) {
        Ember.get(this, '_map').flyToBounds(hotspot.bounds);
        Ember.get(this, 'panel').show();
      },

      next(index) {
        const next = index + 1;
        this.send('highlight', Ember.get(this, 'hotSpots')[next], next);
      },

      previous(index) {
        const prev = index - 1;
        this.send('highlight', Ember.get(this, 'hotSpots')[prev], prev);
      },

      reCenter() {
        if (Ember.get(this, '_map') && Ember.get(this, 'panel').isToggled()) {
          this.panel.hide();
          Ember.set(this, 'activeHotspot', null);

          this._map.getContainer().style.width = '100%';

          this.activePois.forEach(h => {
            Ember.setProperties(h, { active: false });
          });

          this._map.flyToBounds(this.bounds, {
            padding: [0, 0]
          });
        }
      },

      reSize() {
        // console.log('oh hi');
      }
    }
  });
});
define('cyclorama-kiosk/components/div-overlay-layer', ['exports', 'ember-leaflet/components/div-overlay-layer'], function (exports, _divOverlayLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _divOverlayLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/draw-control', ['exports', 'ember-leaflet-draw/components/draw-control'], function (exports, _drawControl) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _drawControl.default;
    }
  });
});
define('cyclorama-kiosk/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormhole) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _emberWormhole.default;
    }
  });
});
define('cyclorama-kiosk/components/geojson-layer', ['exports', 'ember-leaflet/components/geojson-layer'], function (exports, _geojsonLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _geojsonLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/image-layer', ['exports', 'ember-leaflet/components/image-layer'], function (exports, _imageLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _imageLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/leaflet-map', ['exports', 'ember-leaflet/components/leaflet-map'], function (exports, _leafletMap) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _leafletMap.default;
    }
  });
});
define('cyclorama-kiosk/components/marker-layer', ['exports', 'ember-leaflet/components/marker-layer'], function (exports, _markerLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _markerLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/painting-pois', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: '',

    setDot(feature, point) {
      return L.marker(point, {
        icon: L.divIcon({
          html: '<div class="jesse-dot"><div class="dot"></div><div class="pulsate-ring"></div></div>'
        })
      });
    },

    setStyle() {
      return {
        color: '#263238',
        fillOpacity: .6,
        fillColor: '#263238'
      };
    },

    actions: {
      clickSpot(poi) {
        Ember.get(this, 'highlight')(poi);
      },

      flyToPoi(poi) {
        Ember.get(this, 'flyToPoi')(poi);
      }
    }
  });
});
define('cyclorama-kiosk/components/path-layer', ['exports', 'ember-leaflet/components/path-layer'], function (exports, _pathLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pathLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/point-path-layer', ['exports', 'ember-leaflet/components/point-path-layer'], function (exports, _pointPathLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _pointPathLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/polygon-layer', ['exports', 'ember-leaflet/components/polygon-layer'], function (exports, _polygonLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _polygonLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/polyline-layer', ['exports', 'ember-leaflet/components/polyline-layer'], function (exports, _polylineLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _polylineLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/popup-layer', ['exports', 'ember-leaflet/components/popup-layer'], function (exports, _popupLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _popupLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/tile-layer', ['exports', 'ember-leaflet/components/tile-layer'], function (exports, _tileLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tileLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/tooltip-layer', ['exports', 'ember-leaflet/components/tooltip-layer'], function (exports, _tooltipLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _tooltipLayer.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-badge', ['exports', 'ember-uikit/components/uk-badge'], function (exports, _ukBadge) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukBadge.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-button', ['exports', 'ember-uikit/components/uk-button'], function (exports, _ukButton) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukButton.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-card', ['exports', 'ember-uikit/components/uk-card'], function (exports, _ukCard) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukCard.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-card/body', ['exports', 'ember-uikit/components/uk-card/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _body.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-card/footer', ['exports', 'ember-uikit/components/uk-card/footer'], function (exports, _footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _footer.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-card/header', ['exports', 'ember-uikit/components/uk-card/header'], function (exports, _header) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _header.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-card/title', ['exports', 'ember-uikit/components/uk-card/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _title.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-flex', ['exports', 'ember-uikit/components/uk-flex'], function (exports, _ukFlex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukFlex.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-icon', ['exports', 'ember-uikit/components/uk-icon'], function (exports, _ukIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukIcon.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-label', ['exports', 'ember-uikit/components/uk-label'], function (exports, _ukLabel) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukLabel.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-list', ['exports', 'ember-uikit/components/uk-list'], function (exports, _ukList) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukList.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-list/item', ['exports', 'ember-uikit/components/uk-list/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-sortable', ['exports', 'ember-uikit/components/uk-sortable'], function (exports, _ukSortable) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukSortable.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-spinner', ['exports', 'ember-uikit/components/uk-spinner'], function (exports, _ukSpinner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukSpinner.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-subnav', ['exports', 'ember-uikit/components/uk-subnav'], function (exports, _ukSubnav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukSubnav.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-subnav/item', ['exports', 'ember-uikit/components/uk-subnav/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-subnav/link-item', ['exports', 'ember-uikit/components/uk-subnav/link-item'], function (exports, _linkItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkItem.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-switcher', ['exports', 'ember-uikit/components/uk-switcher'], function (exports, _ukSwitcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukSwitcher.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-switcher/content', ['exports', 'ember-uikit/components/uk-switcher/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _content.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-switcher/content/item', ['exports', 'ember-uikit/components/uk-switcher/content/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-switcher/nav', ['exports', 'ember-uikit/components/uk-switcher/nav'], function (exports, _nav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _nav.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-tab', ['exports', 'ember-uikit/components/uk-tab'], function (exports, _ukTab) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukTab.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-tab/item', ['exports', 'ember-uikit/components/uk-tab/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _item.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-tab/link-item', ['exports', 'ember-uikit/components/uk-tab/link-item'], function (exports, _linkItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _linkItem.default;
    }
  });
});
define('cyclorama-kiosk/components/uk-width', ['exports', 'ember-uikit/components/uk-width'], function (exports, _ukWidth) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ukWidth.default;
    }
  });
});
define('cyclorama-kiosk/components/welcome-page', ['exports', 'ember-welcome-page/components/welcome-page'], function (exports, _welcomePage) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _welcomePage.default;
    }
  });
});
define('cyclorama-kiosk/components/wms-tile-layer', ['exports', 'ember-leaflet/components/wms-tile-layer'], function (exports, _wmsTileLayer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _wmsTileLayer.default;
    }
  });
});
define('cyclorama-kiosk/controllers/application', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Controller.extend({});
});
define('cyclorama-kiosk/helpers/app-version', ['exports', 'cyclorama-kiosk/config/environment', 'ember-cli-app-version/utils/regexp'], function (exports, _environment, _regexp) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.appVersion = appVersion;


  const {
    APP: {
      version
    }
  } = _environment.default;

  function appVersion(_, hash = {}) {
    if (hash.hideSha) {
      return version.match(_regexp.versionRegExp)[0];
    }

    if (hash.hideVersion) {
      return version.match(_regexp.shaRegExp)[0];
    }

    return version;
  }

  exports.default = Ember.Helper.helper(appVersion);
});
define('cyclorama-kiosk/helpers/div-icon', ['exports', 'ember-leaflet/helpers/div-icon'], function (exports, _divIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _divIcon.default;
    }
  });
  Object.defineProperty(exports, 'divIcon', {
    enumerable: true,
    get: function () {
      return _divIcon.divIcon;
    }
  });
});
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
define('cyclorama-kiosk/helpers/icon', ['exports', 'ember-leaflet/helpers/icon'], function (exports, _icon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _icon.default;
    }
  });
  Object.defineProperty(exports, 'icon', {
    enumerable: true,
    get: function () {
      return _icon.icon;
    }
  });
});
define('cyclorama-kiosk/helpers/lat-lng-bounds', ['exports', 'ember-leaflet/helpers/lat-lng-bounds'], function (exports, _latLngBounds) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _latLngBounds.default;
    }
  });
  Object.defineProperty(exports, 'latLngBounds', {
    enumerable: true,
    get: function () {
      return _latLngBounds.latLngBounds;
    }
  });
});
define('cyclorama-kiosk/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _pluralize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _pluralize.default;
});
define('cyclorama-kiosk/helpers/point', ['exports', 'ember-leaflet/helpers/point'], function (exports, _point) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _point.default;
    }
  });
  Object.defineProperty(exports, 'point', {
    enumerable: true,
    get: function () {
      return _point.point;
    }
  });
});
define('cyclorama-kiosk/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _singularize) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _singularize.default;
});
define("cyclorama-kiosk/hotspots", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  const hotSpots = {
    "type": "FeatureCollection",
    "features": [{
      "type": "Feature",
      "properties": {
        "title": "Troup Hurt"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-142.251492, -33.943502], [-144.173927, -34.341877], [-148.794193, -33.165936], [-149.998312, -34.130137], [-158.440704, -33.394831], [-158.304749, -20.073104], [-153.40991, -18.506715], [-153.45849, -17.565975], [-150.540333, -15.801916], [-150.331678, -14.054411], [-148.577471, -13.902659], [-148.516445, -14.86433], [-142.134075, -11.67737], [-134.92198, -14.769654], [-134.941206, -14.069148], [-133.181505, -13.989625], [-133.111725, -15.176938], [-128.138437, -17.457274], [-128.640203, -17.894624], [-128.836756, -31.488773], [-142.251492, -33.943502]]]
      }
    }, {
      "type": "Feature",
      "properties": {},
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[-41.066723, -6.680439], [-15.22469, -7.029683], [-18.684397, -6.459324], [-26.392035, -4.433659], [-28.808041, -5.402785], [-30.137944, -5.005703], [-31.94262, -4.95829], [-33.468904, -5.345189], [-35.436015, -5.82928], [-36.319342, -6.018251], [-37.653451, -6.516377], [-38.733652, -6.591095], [-41.066723, -6.680439]]]
      }
    }]
  };

  exports.default = hotSpots;
});
define('cyclorama-kiosk/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'cyclorama-kiosk/config/environment'], function (exports, _initializerFactory, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  let name, version;
  if (_environment.default.APP) {
    name = _environment.default.APP.name;
    version = _environment.default.APP.version;
  }

  exports.default = {
    name: 'App Version',
    initialize: (0, _initializerFactory.default)(name, version)
  };
});
define('cyclorama-kiosk/initializers/container-debug-adapter', ['exports', 'ember-resolver/resolvers/classic/container-debug-adapter'], function (exports, _containerDebugAdapter) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'container-debug-adapter',

    initialize() {
      let app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _containerDebugAdapter.default);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('cyclorama-kiosk/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data'], function (exports, _setupContainer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: 'ember-data',
    initialize: _setupContainer.default
  };
});
define('cyclorama-kiosk/initializers/export-application-global', ['exports', 'cyclorama-kiosk/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.initialize = initialize;
  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_environment.default.exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _environment.default.exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = Ember.String.classify(_environment.default.modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function () {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports.default = {
    name: 'export-application-global',

    initialize: initialize
  };
});
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
define("cyclorama-kiosk/instance-initializers/ember-data", ["exports", "ember-data/initialize-store-service"], function (exports, _initializeStoreService) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    name: "ember-data",
    initialize: _initializeStoreService.default
  };
});
define('cyclorama-kiosk/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = _emberResolver.default;
});
define('cyclorama-kiosk/router', ['exports', 'cyclorama-kiosk/config/environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const Router = Ember.Router.extend({
    location: _environment.default.locationType,
    rootURL: _environment.default.rootURL
  });

  Router.map(function () {});

  exports.default = Router;
});
define('cyclorama-kiosk/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _ajax) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function () {
      return _ajax.default;
    }
  });
});
define("cyclorama-kiosk/templates/application", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MVplX8NK", "block": "{\"symbols\":[],\"statements\":[[0,\"\\n\"],[1,[18,\"cyclorama-painting\"],false],[0,\"\\n\"],[0,\"\\n\"]],\"hasEval\":false}", "meta": { "moduleName": "cyclorama-kiosk/templates/application.hbs" } });
});
define("cyclorama-kiosk/templates/components/cyclorama-painting", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "dFh2Nmxw", "block": "{\"symbols\":[\"button\",\"features\"],\"statements\":[[4,\"if\",[[20,[\"bounds\"]]],null,{\"statements\":[[0,\"    \"],[6,\"div\"],[9,\"uk-grid\",\"\"],[9,\"class\",\"uk-grid-collapse\"],[7],[0,\"\\n  \"],[6,\"div\"],[9,\"class\",\"uk-offcanvas-content\"],[7],[0,\"\\n    \"],[6,\"div\"],[9,\"id\",\"panel\"],[7],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"uk-offcanvas-bar uk-flex uk-flex-column\"],[7],[0,\"\\n        \"],[6,\"button\"],[9,\"class\",\"uk-offcanvas-close\"],[9,\"type\",\"button\"],[9,\"uk-close\",\"\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"reCenter\"],null],null],[7],[8],[0,\"\\n        \"],[6,\"h2\"],[7],[1,[20,[\"activeHotspot\",\"name\"]],false],[8],[0,\"\\n        \"],[6,\"section\"],[7],[0,\"\\n          \"],[1,[20,[\"activeHotSpot\",\"description\"]],true],[0,\"\\n        \"],[8],[0,\"\\n        \"],[6,\"section\"],[9,\"uk-grid\",\"\"],[7],[0,\"\\n          \"],[4,\"uk-button\",null,[[\"class\",\"on-click\"],[\"uk-width-1-2\",[25,\"action\",[[19,0,[]],\"previous\",[20,[\"activeHotSpot\",\"index\"]]],null]]],{\"statements\":[[0,\"previous\"]],\"parameters\":[]},null],[0,\"\\n          \"],[4,\"uk-button\",null,[[\"class\",\"on-click\"],[\"uk-width-1-2\",[25,\"action\",[[19,0,[]],\"next\",[20,[\"activeHotSpot\",\"index\"]]],null]]],{\"statements\":[[0,\"Next\"]],\"parameters\":[]},null],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n      \"],[6,\"div\"],[9,\"class\",\"painting-container uk-width-1-1\"],[7],[0,\"\\n\"],[4,\"leaflet-map\",null,[[\"onLoad\",\"onResize\",\"bounds\",\"zoomSnap\",\"maxBounds\",\"bounceAtZoomLimits\",\"maxBoundsViscosity\",\"minZoom\",\"maxZoom\",\"crs\",\"bounceAtZoomLimits\",\"onClick\",\"onZoomend\"],[[25,\"action\",[[19,0,[]],\"initMap\"],null],[25,\"action\",[[19,0,[]],\"reSize\"],null],[20,[\"bounds\"]],0,[20,[\"bounds\"]],false,1,3,10,[20,[\"crs\"]],false,[25,\"action\",[[19,0,[]],\"reCenter\"],null],[25,\"action\",[[19,0,[]],\"whatBounds\"],null]]],{\"statements\":[[0,\"\\n\"],[0,\"\\n          \"],[1,[25,\"component\",[[19,2,[\"tile\"]]],[[\"url\",\"onLoad\"],[\"https://s3.amazonaws.com/battleofatlanta/tiles/q1/{z}/{x}/{y}.png\",[25,\"action\",[[19,0,[]],\"paintingLoaded\"],null]]]],false],[0,\"\\n\\n          \"],[1,[25,\"painting-pois\",null,[[\"pois\",\"highlight\",\"flyToPoi\"],[[20,[\"activePois\"]],[25,\"action\",[[19,0,[]],\"highlightHotspot\"],null],[25,\"action\",[[19,0,[]],\"flyToHotspot\"],null]]]],false],[0,\"\\n\\n\"],[0,\"\\n\"]],\"parameters\":[2]},null],[0,\"\\n      \"],[8],[0,\"\\n\"],[8],[0,\"\\n      \"],[6,\"div\"],[9,\"class\",\"uk-width-1-1 bottom-nav uk-container\"],[7],[0,\"\\n        \"],[6,\"div\"],[9,\"uk-grid\",\"\"],[7],[0,\"\\n          \"],[6,\"div\"],[9,\"class\",\"uk-width-1-4 ahc-logo uk-inline\"],[7],[0,\"\\n            \"],[6,\"img\"],[9,\"class\",\"uk-position-center\"],[9,\"src\",\"http://www.atlantahistorycenter.com/assets/images/AHC_Brand_Asset_Lockup_White.png\"],[7],[8],[0,\"\\n          \"],[8],[0,\"\\n          \\n          \"],[6,\"div\"],[9,\"class\",\"uk-width-1-2\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"poi-nav\"],[9,\"uk-grid\",\"\"],[7],[0,\"\\n              \\n\"],[4,\"each\",[[20,[\"buttons\"]]],null,{\"statements\":[[0,\"              \"],[6,\"div\"],[10,\"class\",[26,[\"uk-width-1-4 poi-nav-button uk-inline \",[25,\"if\",[[19,1,[\"active\"]],\"active-poi\"],null]]]],[9,\"role\",\"button\"],[10,\"onclick\",[25,\"action\",[[19,0,[]],\"switchPoi\",[19,1,[]]],null],null],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"uk-text-center uk-grid-collapse uk-position-center\"],[9,\"uk-grid\",\"\"],[7],[0,\"\\n                  \"],[6,\"img\"],[9,\"class\",\"uk-width-1-1 uk-border-circle\"],[10,\"src\",[19,1,[\"icon\"]],null],[10,\"alt\",[25,\"concat\",[\"Button to highlight \",[19,1,[\"lable\"]],\" in the painting.\"],null],null],[7],[8],[0,\"\\n                  \"],[6,\"p\"],[9,\"class\",\"uk-width-1-1 uk-margin-small-top\"],[7],[1,[19,1,[\"label\"]],false],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n\"]],\"parameters\":[1]},null],[0,\"              \\n              \"],[6,\"div\"],[9,\"class\",\"uk-width-1-4 poi-nav-button uk-inline\"],[9,\"style\",\"border-left: solid white; line-height: 20px;\"],[7],[0,\"\\n                \"],[6,\"div\"],[9,\"class\",\"uk-text-center uk-grid-collapse uk-position-center active-poi\"],[9,\"uk-grid\",\"\"],[7],[0,\"\\n                  \"],[6,\"img\"],[9,\"class\",\"uk-width-1-1 uk-border-circle\"],[9,\"src\",\"images/tours.png\"],[9,\"alt\",\"Border circle\"],[7],[8],[0,\"\\n                  \"],[6,\"p\"],[9,\"class\",\"uk-width-1-1 uk-margin-small-top\"],[7],[0,\"TOURS\"],[8],[0,\"\\n                \"],[8],[0,\"\\n              \"],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n          \\n          \"],[6,\"div\"],[9,\"class\",\"uk-width-1-4 uk-margin-small\"],[7],[0,\"\\n            \"],[6,\"div\"],[9,\"class\",\"uk-grid-collapse active-poi\"],[9,\"uk-grid\",\"\"],[7],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"uk-width-1-2\"],[7],[0,\"\\n                \"],[6,\"img\"],[9,\"src\",\"/images/view.png\"],[9,\"style\",\"height: 90px\"],[7],[8],[0,\"\\n              \"],[8],[0,\"\\n              \"],[6,\"div\"],[9,\"class\",\"uk-width-1-2\"],[9,\"id\",\"minimap\"],[7],[8],[0,\"\\n            \"],[8],[0,\"\\n          \"],[8],[0,\"\\n        \"],[8],[0,\"\\n      \"],[8],[0,\"\\n    \"],[8],[0,\"\\n\\n\\n\"]],\"parameters\":[]},null]],\"hasEval\":false}", "meta": { "moduleName": "cyclorama-kiosk/templates/components/cyclorama-painting.hbs" } });
});
define("cyclorama-kiosk/templates/components/painting-pois", ["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.HTMLBars.template({ "id": "MpNfuX+9", "block": "{\"symbols\":[\"hotspot\"],\"statements\":[[4,\"each\",[[20,[\"pois\"]]],null,{\"statements\":[[0,\"  \"],[1,[25,\"geojson-layer\",null,[[\"geoJSON\",\"pointToLayer\",\"onClick\"],[[19,1,[\"hotspot\"]],[20,[\"setDot\"]],[25,\"action\",[[19,0,[]],\"clickSpot\",[19,1,[]]],null]]]],false],[0,\"\\n\\n\"],[4,\"if\",[[19,1,[\"active\"]]],null,{\"statements\":[[0,\"    \"],[1,[25,\"geojson-layer\",null,[[\"geoJSON\",\"style\",\"onAdd\"],[[19,1,[\"polygon\"]],[20,[\"setStyle\"]],[25,\"action\",[[19,0,[]],\"flyToPoi\",[19,1,[]]],null]]]],false],[0,\"\\n\"]],\"parameters\":[]},null]],\"parameters\":[1]},null]],\"hasEval\":false}", "meta": { "moduleName": "cyclorama-kiosk/templates/components/painting-pois.hbs" } });
});


define('cyclorama-kiosk/config/environment', [], function() {
  var prefix = 'cyclorama-kiosk';
try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

});

if (!runningTests) {
  require("cyclorama-kiosk/app")["default"].create({"name":"cyclorama-kiosk","version":"0.0.0+8761e484"});
}
//# sourceMappingURL=cyclorama-kiosk.map

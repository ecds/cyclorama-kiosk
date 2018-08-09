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

      (0, _fetch.default)('/q1/people.json').then(response => {
        response.json().then(data => {
          this.setProperties({
            people: data,
            activePois: data
          });
        });
      });

      (0, _fetch.default)('/q1/landmarks.json').then(response => {
        response.json().then(data => {
          this.setProperties({
            landmarks: data
          });
        });
      });

      (0, _fetch.default)('/buttons.json').then(response => {
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
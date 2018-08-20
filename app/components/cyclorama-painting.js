import Component from '@ember/component';
import { get, set, setProperties } from '@ember/object';
import { A } from '@ember/array';
import fetch from 'fetch';
import UIkit from 'uikit';
// import MiniMap from 'leaflet-minimap';
/* global L */

export default Component.extend({
  tagName: '',
  bounds: null,
  L: null,
  _map: null,
  activePois: A(),
  panel: null,
  showThumbNav: true,
  miniMap: null,
  data: null,
  crs: L.CRS.Simple,
  activeButton: 'people',
  people: null,
  landmarks: null,
  alterations: null,
  showingTours: false,

  didInsertElement() {
    // q3
    // set(this, 'bounds', new L.latLngBounds([
    //   new L.LatLng(-99.625, 0.25),
    //   new L.LatLng(-0.26318359375, 239.77783203125)
    // ]));
    //q1
    set(this, 'bounds', new L.latLngBounds([
      new L.LatLng(0, 240),
      new L.LatLng(-78, 0)
    ]));

    fetch('/q1/people.json').then(response => {
      response.json().then(data => {
        this.setProperties({
          people: data,
          activePois: data
        });
      });
    });

    fetch('/q1/landmarks.json').then(response => {
      response.json().then(data => {
        this.setProperties({
          landmarks: data
        });
      });
    });

    fetch('/q1/alterations.json').then(response => {
      response.json().then(data => {
        this.setProperties({
          alterations: data
        });
      });
    });

    fetch('/buttons.json').then(response => {
      response.json().then(data => {
        this.setProperties({buttons: data});
      });
    });
  },

  didRender() {
    //     if (get(this, '_map') && get(this, 'miniMap') === null) {
    // }

    // https://geoserver-private.ecds.emory.edu/ECDS_Projects/wms?service=WMS&request=GetMap&layers=ECDS_Projects%3Akioskexample_geo&styles=&format=image%2Fpng&transparent=true&version=1.1.1&width=512&height=512&srs=EPSG%3A3857&bbox=0,-10018754.171394622,10018754.171394622,0
    // https://geoserver-private.ecds.emory.edu/ECDS_Projects/wms?service=WMS&request=GetMap&layers=&styles=&format=image%2Fpng&transparent=false&version=1.1.1&layer=ECDS_Projects%3Akioskexample_geo&width=512&height=512&srs=EPSG%3A3857&bbox=-20037508.342789244,-20037508.34278071,60112525.02836774,20037508.34278071

    // UIkit.util.on(document.getElementById('panel'), 'show', () => {
    //   document.getElementsByClassName('leaflet-container')[0].style.width = '67vw';
    // });

    // UIkit.util.on(document.getElementById('panel'), 'hide', () => {
    //   document.getElementsByClassName('leaflet-container')[0].style.width = '100%';
    // });
  },

  // paintingBounds: A([[-55, 170],[-55, -170],[55, -170],[55, 170]]),

  actions: {
    initMap(event) {
      let map = event.target;
      // map.zoomControl.setPosition('bottomleft');
      // map.setZoom(3);
      // map.fitBounds(get(this, 'bounds'));
      set(this, '_map', map);
      // map.on('click', function(e) {
        // console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
      // });
      map.setZoom(4);

      // L.rectangle(this.bounds, {color: "#ff7800", weight: 1}).addTo(map);
    },

    paintingLoaded(painting) {
      if (this.miniMap === null) {
        var miniPainting = new L.tileLayer(
          painting.target._url,
          {
            crs: get(this, 'crs'),
            minZoom: 0,
            maxZoom: 0,
            center: this._map.getCenter()
          }
        );

        let miniMap = new L.Control.MiniMap(
          miniPainting,
          {
            // zoomLevelFixed: true,
            centerFixed: this._map.getCenter(),
            width: '10vw',
            height: '8vh',
            aimingRectOptions: {
              stroke: '#688EAB'
            }
          }
        );
        this.setProperties({miniMap: miniMap});
        miniMap.addTo(this._map);
        let lCtrlContainer = miniMap.getContainer();
        let newCtrlContainer = document.getElementById('minimap');
        newCtrlContainer.appendChild(lCtrlContainer);
        // lCtrlContainer.setAttribute('style', 'height: 8vh; width: 100%; position: relative; outline: none;');
      }
    },

    whatBounds() {
      // console.log(get(this, '_map'));
    },

    switchPoi(button) {
      this.activePois.forEach(poi => {
        set(poi, 'active', false);
      }),
      this.buttons.forEach(b => {
        set(b, 'active', false);
      });
      set(button, 'active', true);
      this.setProperties({
        activeButton: button.label,
        activePois: get(this, button.label)
      });
    },

    highlightHotspot(hotspot) {
      const panel = UIkit.offcanvas(document.getElementById('poi-detail'));
      this.activePois.forEach(hs => {
        set(hs, 'active', false);
      });
      // set(hotspot, 'active', true);
      // console.log(hotspot);
       this.set('activeHotspot', hotspot);
      set(this, 'activeHotspot', hotspot);
      // console.log(this.panel.isToggled());
      if (panel.isToggled() === true) {
        this.send('flyToHotspot')
      } else {
        this.send('flyToHotspot')
        panel.show();
      }
    },

    zoomend() {
      const activePoi = get(this, 'activeHotspot');
      if (activePoi) {
        set(activePoi, 'active', true);
      }
    },

    flyToHotspot() {
      this._map.getContainer().style.width = '67vw';
      this._map.getContainer().style.height = '100vh';
      this._map.flyToBounds(this.activeHotspot.bounds, { duration: 3 });
    },

    next(next) {
      this.send('highlightHotspot', this.activePois[parseInt(next)]);
    },

    previous(previous) {
      this.send('highlightHotspot', this.activePois[parseInt(previous)]);
    },

    reCenter() {
      const panel = UIkit.offcanvas(document.getElementById('poi-detail'));
      panel.hide();
      set(this, 'activeHotspot', null);

      this.activePois.forEach(h => {
        setProperties(h, { active: false });
      });

      this._map.getContainer().style.width = '100vw';
      this._map.getContainer().style.height = '85vh';

      this._map.flyToBounds(this.bounds, { duration: 2 });

    },

    showTours() {
      set(this, 'showingTours', true);
    },

    hideTours() {
      set(this, 'showingTours', false);
    },

    reSize() {
      // console.log('oh hi');
    }
  }
});

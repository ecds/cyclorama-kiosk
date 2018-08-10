import Component from '@ember/component';
import { get, set, setProperties } from '@ember/object';
import { A } from '@ember/array';
import fetch from 'fetch';
import UIkit from 'uikit';
// import MiniMap from 'leaflet-minimap';
/* global L */

export default Component.extend({
  // classNames: ['uk-width-1-1'],
  tagName: '',
  bounds: null,
  L: null,
  _map: null,
  // activeHotspot: {},
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

    fetch('/buttons.json').then(response => {
      response.json().then(data => {
        this.setProperties({buttons: data});
      });
    });
  },

  didRender() {
    let panel = UIkit.offcanvas(document.getElementById('panel'), {
      mode: 'push',
      bgClose: false
    });
    // UIkit.util.on(document.getElementById('panel'), 'shown', () => {this.send('flyToHotspot')});
    UIkit.util.on(document.getElementById('panel'), 'hidden', () => {this.send('reCenter')});
    this.panel = panel;

    if (get(this, '_map') && get(this, 'miniMap') === null) {
      var painting = new L.tileLayer(
        'https://s3.amazonaws.com/battleofatlanta/tiles/q1/{z}/{x}/{y}.png',
        {
          crs: get(this, 'crs'),
          minZoom: 0,
          maxZoom: 0,
          bounds: get(this, 'bounds')
        }
      );
      let miniMap = new L.Control.MiniMap(
        painting,
        {
          zoomLevelFixed: true,
          width: document.getElementsByTagName('body')[0].clientHeight / 10 * 2,
          height: document.getElementsByTagName('body')[0].clientHeight / 10,
          aimingRectOptions: {
            stroke: '#688EAB'
          }
        }
      );
      this.setProperties({miniMap: miniMap});
      miniMap.addTo(get(this, '_map'));
      let lCtrlContainer = miniMap.getContainer();
      let newCtrlContainer = document.getElementById('minimap');
      newCtrlContainer.appendChild(lCtrlContainer);
    }

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
      map.zoomControl.setPosition('topright');
      // map.setZoom(3);
      map.fitBounds(get(this, 'bounds'));
      set(this, '_map', map);
      map.on('click', function(e) {
        console.log("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
      });
      map.setZoom(4);

      // L.rectangle(this.bounds, {color: "#ff7800", weight: 1}).addTo(map);
    },

    paintingLoaded() {
      // get(this, _map).fitBounds(get(this, 'bounds'));
    },

    whatBounds() {
      console.log(get(this, '_map'));
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
      this.activePois.forEach(hs => {
        set(hs, 'active', false);
      });
      set(hotspot, 'active', true);
      console.log(hotspot);
    //  this.set('activeHotspot', hotspot);
      set(this, 'activeHotspot', hotspot);
      console.log(this.panel.isToggled());
      if (this.panel.isToggled() === true) {
        this.send('flyToHotspot')
      } else {
        this.send('flyToHotspot')
        this.panel.show();
      }
    },

    flyToHotspot() {
      console.log('flying')
      this._map.getContainer().style.width = '67vw';
      this._map.flyToBounds(this.activeHotspot.bounds);
    },

    next(next) {
      this.send('highlightHotspot', this.activePois[next]);
    },

    previous(previous) {
      this.send('highlightHotspot', this.activePois[previous]);
    },

    reCenter() {
      console.log('recenter')
      // if (get(this, '_map') && get(this, 'panel').isToggled()) {
        // this.panel.hide();
        set(this, 'activeHotspot', {});
        this.panel.hide();

        this._map.getContainer().style.width = '100%';

        this.activePois.forEach(h => {
          setProperties(h, { active: false });
        });

        this._map.flyToBounds(this.bounds);

      // }
    },

    reSize() {
      // console.log('oh hi');
    }
  }
});
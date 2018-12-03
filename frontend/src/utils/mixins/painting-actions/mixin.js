import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
import { task } from 'ember-concurrency';
/* global L */

const COLORS = {
  people: {
    dot: 'rgba(63,139,171, 1)',
    ring: 'rgba(63,139,171, .6)'
  },
  landmarks: {
    dot: 'rgba(192,47,29, 1)',
    ring: 'rgba(192,47,29, .6)'
  },
  changes: {
    dot: 'rgba(235,201,68, 1)',
    ring: 'rgba(235,201,68, .6)'
  },
};

export default Mixin.create({
  panel: null,
  activePoi: null,
  crs: L.CRS.Simple,
  
  animationFinished() {
    return new Promise((resolve, reject) => {
      this.model.quad.map.once('moveend', resolve());
      // on failure
      reject(false);

      this.send('reCenter');
    });
  },

  setStyle() {
    return {
      color: '#263238',
      fillOpacity: .6,
      fillColor: '#263238'
    }
  },

  miniMap: null,

  addMiniMap(miniPainting) {
    let miniMap = new L.Control.MiniMap(
      miniPainting, {
        width: '15vw',
        height: '10vh',
        aimingRectOptions: {
          weight: 5
        },
        mapOptions: {
          minZoom: -6,
          maxZoom: -6
        }
      }
    );

    this.setProperties({
      miniMap: miniMap
    });
    miniMap.addTo(this.model.quad.map);
    let lCtrlContainer = miniMap.getContainer();
    let newCtrlContainer = document.getElementById('minimap');
    newCtrlContainer.appendChild(lCtrlContainer);
  },

  closePanel: task(function* () {
    yield this.panel.hide();
    this.send('reCenter');
    this.send('clearActive');
  }),

  showPanel: task(function* () {
    yield this.panel.show()
  }),

  enableInteraction() {
    this.model.quad.map.dragging.enable();
    this.model.quad.map.doubleClickZoom.enable();
    this.model.quad.map.scrollWheelZoom.enable();
  },

  disableInteraction() {
    this.model.quad.map.dragging.disable();
    this.model.quad.map.doubleClickZoom.disable();
    this.model.quad.map.scrollWheelZoom.disable();
  },

  suspendInteractions() {
    this.model.quad.map.once('zoomend', () => {
      this.enableInteraction();
    });
    this.disableInteraction();
  },

  actions: {
    setDot(poi, feature, point) {
      let marker = L.marker(
        point, {
          icon: L.divIcon({
            html: `<div class="jesse-dot"><div class="dot" style='background-color: ${COLORS[feature.properties.type].dot}'></div><div class="pulsate-ring" style='background-color: ${COLORS[feature.properties.type].ring}'></div></div>`
          })
        }
      );

      marker.on('dragend', event => {
        this.send('relocatePoi', event.target._latlng, poi)
      });
      return marker;
    },

    initMap(event) {
      let map = event.target;
      this.model.quad.setProperties({
        map
      });
      this.disableInteraction();
      map.once('moveend', () => {
        map.once('moveend', () => {
          if (!this.model.quad.originalCenter) {
            this.model.quad.setProperties({
              originalCenter: map.getCenter(),
              originalZoom: map.getZoom(),
              originalBounds: map.getBounds()
            });
          }
          if (this.miniMap === null) {
            const miniPainting = new L.imageOverlay(
              this.model.quad.painting,
              this.model.quad.paintingBounds
            );
            this.addMiniMap(miniPainting);
          }
          map.setMaxBounds(map.getBounds().pad(.1));
          map.setMinZoom(map.getZoom());
          this.enableInteraction();
        });
        this.model.quad.setProperties({
          bottom: [
            (
              this.model.quad.paintingLayer.getBounds()._southWest.lat -
              map.getBounds()._southWest.lat
            ) +
            map.getCenter().lat -
            ((document.documentElement.clientHeight * 0.85) * 2),
            map.getCenter().lng
          ]
        });
        map.panTo(this.model.quad.bottom);
      });
    },

    setPainting(event) {
      this.model.quad.map.setMinZoom(-5);
      this.model.quad.map.fitBounds(event.target.getBounds());
      this.model.quad.setProperties({
        paintingLayer: event.target
      });
    },

    highlightPoi(poi) {
      this.set('showingTours', false);
      this.model.quad.map.once('zoomend', () => {
        // Panel is opened by the polygon's `onAdd` event.
        poi.set('active', true);
      });
      this.send('clearActive');
      this.set('activePoi', poi);
      poi.setProperties({ active: true });
      this.send('flyToPoi', poi);
    },

    clearActive() {
      if (isPresent(this.activePoi)) {
        this.activePoi.setProperties({ active: false });
        this.set('activePoi', null);
      }
    },

    flyToPoi(poi) {
      this.suspendInteractions();
      this.model.quad.map.flyToBounds(poi.bounds, {
        duration: 1
      });
    },

    reCenter() {
      this.suspendInteractions();
      this.model.quad.map.flyToBounds(this.model.quad.originalBounds, {
        // duration: 1
      });
    },

    reSize() {},

    paintingLoaded() {},

    whatBounds() {},

    zoomend() {},

    moveend() {}
  }
});

import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
import { task, timeout, waitForEvent } from 'ember-concurrency';
/* global L */

const COLORS = {
  people: {
    dot: 'rgba(56,116,143, 1)',
    ring: 'rgba(56,116,143, .6)'
  },
  landmarks: {
    dot: 'rgba(143,46,31, 1)',
    ring: 'rgba(143,46,31, .6)'
  },
  changes: {
    dot: 'rgba(222,192,75, 1)',
    ring: 'rgba(222,192,75, .6)'
  },
};

export default Mixin.create({
  panel: null,
  activePoi: null,
  crs: L.CRS.Simple,

  setStyle() {
    return {
      color: '#263238',
      fillOpacity: .85,
      fillColor: '#263238'
    }
  },

  miniMap: null,

  addMiniMap() {
    if (this.miniMap) return;
    const miniPainting = new L.imageOverlay(
      this.model.quad.painting,
      this.model.quad.paintingBounds
    );
    let miniMap = new L.Control.MiniMap(
      miniPainting, {
        width: '10vw',
        height: '10vh',
        aimingRectOptions: {
          color: '#0d00ff',
          fillOpacity: 0
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
    this.get('reCenter').perform();
    this.send('clearActive');
  }),

  showPanel: task(function* () {
    yield this.panel.show();
  }),

  reSize: task(function* (event) {
    if (this.activePoi) {
      yield this.get('flyToPoi').perform(this.activePoi);
    } else {
      yield timeout(600);
      this.send('setPainting', event);
      this.get('reCenter').perform();
      // this.get('setBottom').perform();
    }
  }).restartable(),

  sizePanControls() {
    let element = document.getElementById('pan-controls');
    if (element === null) return;
    element.style.width = '100%';
    let containerWidth = element.clientWidth;
    let newSize = Math.floor(containerWidth * .85);
    element.style.height = `${newSize}.px`;
    element.style.width = `${newSize}.px`;
    element.style.opacity = 1;
  },

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

  initMap: task(function* (event) {
    let map = event.target;
    this.model.quad.setProperties({
      map
    });
    this.disableInteraction();
    yield waitForEvent(this.model.quad.map, 'moveend');
    if (!this.model.quad.originalCenter) {
      this.model.quad.setProperties({
        originalCenter: map.getCenter(),
        originalZoom: map.getZoom(),
        originalBounds: map.getBounds()
      });
    }
    map.setMaxBounds(map.getBounds().pad(.1));
    map.setMinZoom(map.getZoom());
    this.enableInteraction();
    yield this.get('setBottom').perform();
    if (this.miniMap === null) {
      this.addMiniMap();
    }
  }),

  highlightPoi: task(function* (poi) {
    this.set('showingTours', false);
    this.removeMinMap();
    // this.model.quad.map.once('zoomend', () => {
    //   // Panel is opened by the polygon's `onAdd` event.
    //   poi.set('active', true);
    // });
    this.send('clearActive');
    this.set('activePoi', poi);
    poi.setProperties({ active: true });
    yield this.get('flyToPoi').perform(poi);
    // this.get('flyToPoi').perform(poi);
  }),

  flyToPoi: task(function* (poi) {
    this.suspendInteractions();
    yield this.model.quad.map.flyToBounds(poi.bounds, {
      duration: 1
    });
  }).restartable(),

  reCenter: task(function* () {
    this.suspendInteractions();
    this.model.quad.map.flyToBounds(this.model.quad.originalBounds, {
      // duration: 1
    });
    yield waitForEvent(this.model.quad.map, 'moveend');
    this.addMiniMap();
    yield this.get('panToBottom').perform();
  }),

  setBottom: task(function* () {
    // yield timeout(600);
    this.model.quad.setProperties({
      bottom: [
        (
          this.model.quad.paintingLayer.getBounds()._southWest.lat -
          this.model.quad.map.getBounds()._southWest.lat
        ) +
        this.model.quad.map.getCenter().lat -
        ((document.documentElement.clientHeight * 1) * 2),
        this.model.quad.map.getCenter().lng
      ]
    });
    yield this.get('panToBottom').perform();
    // });
  }).restartable(),
  
  panToBottom: task(function* () {
    this.model.quad.map.panTo(this.model.quad.bottom);
      yield waitForEvent(this.model.quad.map, 'moveend');
  }),

  removeMinMap() {
    if (!this.miniMap) return;
    this.get('miniMap').remove();
    this.setProperties({ miniMap: null });
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

    setPainting(event) {
      this.model.quad.map.setMinZoom(-5);
      this.model.quad.map.fitBounds(event.target.getBounds());
      this.model.quad.setProperties({
        paintingLayer: event.target
      });
      this.sizePanControls();
    },

    clearActive() {
      if (isPresent(this.activePoi)) {
        this.activePoi.setProperties({ active: false });
        this.set('activePoi', null);
      }
    },

    paintingLoaded() {},

    whatBounds() {},

    zoomend() {},

    moveend() {}
  }
});

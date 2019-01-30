import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
import { task, waitForEvent, timeout } from 'ember-concurrency';
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
  alterations: {
    dot: 'rgba(129,97,160, 1)',
    ring: 'rgba(129,97,160, .6)'
  },
};

export default Mixin.create({
  panel: null,
  activePoi: null,
  crs: L.CRS.Simple,
  paintingSet: false,

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
    const miniPainting = new L.tileLayer(
      `https://s3.amazonaws.com/battleofatlanta/tiles/${this.model.quad.title}/{z}/{x}/{y}.png`
    );
    let miniMap = new L.Control.MiniMap(
      miniPainting, {
        width: '10vw',
        height: '10vh',
        aimingRectOptions: {
          color: '#0d00ff',
          fillOpacity: 0,
          weight: 10
        },
        zoomLevelFixed: 1,
        centerFixed: this.model.quad.paintingBounds.getCenter(),
        mapOptions: {
          maxBounds: this.model.quad.paintingBounds.pad(0),
          minZoom: 0,
          maxZoom: 0
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

  reSize: task(function* (/*event*/) {
    this.sizePanControls();
    if (this.activePoi) {
      yield this.get('flyToPoi').perform(this.activePoi);
    } else {
      // yield this.model.quad.map.fitBounds(this.model.quad.paintingBounds);
      yield this.get('offsetCenter').perform();
      yield this.get('reCenter').perform();
    }
  }).restartable(),

  setPainting: task(function* (/* event */) {
    if (this.paintingSet) return;
    this.set('paintingSet', true);
    yield this.get('offsetCenter').perform();
    this.sizePanControls();
    return true
  }),

  sizePanControls() {
    let element = document.getElementById('pan-controls');
    if (element === null) return;
    let containerWidth = window.innerWidth;
    let newSize =  Math.floor(containerWidth * .08);
    element.style.cssText = `width: ${newSize}px; height: ${newSize}px; opacity: 1`
    this.setReCenterButton(newSize);
    this.set('controlsSet', true);
  },

  setReCenterButton(controlsWidth) {
    /*
      - Take half the size from the controls to find the center.
      - Subtract 1% of the view width to account for the size of
        the icon which is 1vw
      - Add 20 to account for the top margin on the controls
    */
    let element = document.getElementById('re-center-button');
    let iconHeight = element.firstElementChild.height.baseVal.value;
    let iconWidth = element.firstElementChild.width.baseVal.value
    let topOffset = (controlsWidth / 2) - iconWidth + (iconWidth / 4);
    let leftOffset = (controlsWidth / 2) - iconHeight + (iconHeight / 4);
    element.style.cssText = `top: ${topOffset}px; left: ${leftOffset}px;`;
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
    this.model.quad.map.once('moveend', () => {
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
    // map.setZoom(0);
    // map.on('click', function(event){console.log(event)});


    yield waitForEvent(this.model.quad.map, 'moveend');
    // this.model.quad.map.off('moveend', noop);
    // TODO: move this to function called after center is offset.
    if (!this.model.quad.originalCenter) {
      this.model.quad.setProperties({
        originalCenter: map.getCenter(),
        originalZoom: map.getZoom(),
        originalBounds: map.getBounds()
      });
    }
    this.enableInteraction();
    if (this.miniMap === null) {
      this.addMiniMap();
    }
    let allSet = yield timeout(300);
    return allSet;
  }),

  highlightPoi: task(function* (poi) {
    this.set('showingTours', false);
    // this.removeMinMap();
    this.send('clearActive');
    this.set('activePoi', poi);
    poi.setProperties({ active: true });
    yield this.get('flyToPoi').perform(poi);
  }),

  flyToPoi: task(function* (poi) {
    this.suspendInteractions();
    yield this.model.quad.map.flyToBounds(poi.bounds, {
      duration: 1.5
    });
  }).restartable(),

  reCenter: task(function* () {
    this.suspendInteractions();
    // this.addMiniMap();
    yield this.get('panToCenter').perform();
  }),

  offsetCenter: task(function* () {
    /*
      Extend the painting's bounds to include the bottom navigation.
      This ensures the painting will always sit right on top of the navigation.
      The bottom navigation is 20vh plus 40px margin
    */
    let { map, paintingBounds } = this.model.quad;
    let fullBounds = L.latLngBounds(paintingBounds.getSouthWest, paintingBounds.getNorthEast());
    let paintingSouthWestPoint = map.options.crs.latLngToPoint(paintingBounds.getSouthWest(), map.getZoom());
    let navSouthWestPoint = L.point(0, paintingSouthWestPoint.y + (window.innerHeight * .2));
    let navSouthwest = map.options.crs.pointToLatLng(navSouthWestPoint, map.getZoom());

    let navBounds = L.latLngBounds(paintingBounds.getSouthEast(), navSouthwest);
    fullBounds.extend(navBounds);
    map.fitBounds(fullBounds.pad(.01), {
      animate: false
    });
    yield timeout(300);
    map.setMaxBounds(fullBounds);
    map.setMinZoom(map.getZoom() - .5);
  }).restartable(),
  
  panToCenter: task(function* () {
    this.model.quad.map.flyToBounds(
      this.model.quad.paintingBounds, {
        animate: false
      }
    );
    yield waitForEvent(this.model.quad.map, 'moveend');
    this.set('atMaxBounds', true);
  }).restartable(),

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

    clearActive() {
      if (isPresent(this.activePoi)) {
        this.activePoi.setProperties({ active: false });
        this.set('activePoi', null);
      }
    }
  }
});

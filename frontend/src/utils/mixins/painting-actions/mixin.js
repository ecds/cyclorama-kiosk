import Mixin from '@ember/object/mixin';
import { isPresent } from '@ember/utils';
import { task, timeout, waitForEvent } from 'ember-concurrency';
import { copy } from '@ember/object/internals';
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

const noop = () => {};

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
          fillOpacity: 0
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

  sizePanControls() {
    let element = document.getElementById('pan-controls');
    if (element === null) return;
    element.style.width = '100%';
    let containerWidth = element.clientWidth;
    // let newSize = Math.floor(containerWidth * .85);
    let newSize = containerWidth + Math.floor(containerWidth * .25);
    element.style.cssText = `width: ${newSize}px; height: ${newSize}px; opacity: 1`
    this.setReCenterButton(newSize);
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
  }),

  highlightPoi: task(function* (poi) {
    this.set('showingTours', false);
    this.removeMinMap();
    this.send('clearActive');
    this.set('activePoi', poi);
    poi.setProperties({ active: true });
    yield this.get('flyToPoi').perform(poi);
  }),

  flyToPoi: task(function* (poi) {
    this.suspendInteractions();
    yield this.model.quad.map.flyToBounds(poi.bounds, {
      duration: 1
    });
  }).restartable(),

  reCenter: task(function* () {
    this.suspendInteractions();
    yield this.get('panToCenter').perform();
    this.addMiniMap();
  }),

  offsetCenter: task(function* () {
    /*
      Extend the painting's bounds to include the bottom navigation.
      This ensures the painting will always sit right on top of the navigation.
      The bottom navigation is 20vh plus 40px margin
    */
   let { map, paintingBounds } = this.model.quad;
    // let navNorthEastPoint = L.point(window.innerWidth, (window.innerHeight + (window.innerHeight * .2) - 40));
    // // let navNorthWestPoint = L.point(0, window.innerHeight - (window.innerHeight * .2));
    let paintingSouthWestPoint = map.options.crs.latLngToPoint(paintingBounds.getSouthWest(), map.getZoom());
    let navSouthWestPoint = L.point(0, paintingSouthWestPoint.y + (window.innerHeight * .2));
    // // let navHeight = navNorthWestPoint.distanceTo(navSouthWestPoint);
    // let paintingNavDistance = paintingSouthEast.y + navNorthEastPoint.y;
    let h = (window.innerHeight * .2)
    let offsetCenterPoint = L.point(window.innerWidth/2, window.innerHeight/2 + h/map.getZoom());

    // let navNortheast = map.options.crs.pointToLatLng(navNorthEastPoint, map.getZoom());
    let navSouthwest = map.options.crs.pointToLatLng(navSouthWestPoint, map.getZoom());

    let navBounds = L.latLngBounds(paintingBounds.getSouthEast(), navSouthwest);
    // // let fullBounds = L.latLngBounds(paintingBounds.getSouthWest(), paintingBounds.getNorthEast());
    paintingBounds.extend(navBounds);
    // fullBounds.extend(navBounds);
    // L.rectangle(navBounds, {color: "deeppink", weight: 1}).addTo(this.model.quad.map);
    // L.rectangle(paintingBounds, {color: "blue", weight: 1}).addTo(this.model.quad.map);
    // this.model.quad.map
    // yield waitForEvent(map, 'moveend');
    // L.marker(paintingBounds.getSouthEast()).addTo(map);
    // L.marker(navSouthwest).addTo(map);
    console.log('panby');
    // map.panTo(fullBounds.getCenter());
    // map.setView(
    //   // fullBounds.getCenter()
    //   map.options.crs.pointToLatLng(offsetCenterPoint, map.getZoom()),
    //   map.getZoom()
    //   );
    map.fitBounds(paintingBounds.pad(.1));
    yield waitForEvent(map, 'moveend');
    console.log('panned');
    this.model.quad.setProperties({ bottom: paintingBounds});
    // map.setMinZoom(Math.ceil(map.getZoom()) - 1);
    // map.setMaxBounds(fullBounds.pad(.1));
  }).restartable(),
  
  panToCenter: task(function* () {
    this.model.quad.map.flyToBounds(this.model.quad.bottom);
    yield waitForEvent(this.model.quad.map, 'moveend');
    this.model.quad.map.panTo(this.model.quad.bottom.getCenter());
    yield waitForEvent(this.model.quad.map, 'moveend');
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

    setPainting(event) {
      if (this.paintingSet) return;
      this.set('paintingSet', true);
      let painting = event.target
      // TODO: Make the dimensions dynamic.
      // Zoom level was determined by the math in that leaflet plugin
      // https://github.com/commenthol/leaflet-rastercoords/blob/master/rastercoords.js#L46-L53
      // let sw = this.model.quad.map.options.crs.pointToLatLng(L.point(0, this.model.quad.height), 8);
      // let ne = this.model.quad.map.options.crs.pointToLatLng(L.point(this.model.quad.width, 0), 8);
      // painting.bounds = L.latLngBounds(sw, ne);
      // this.model.quad.map.fitBounds(painting.bounds);
      this.sizePanControls();
      this.get('offsetCenter').perform();
      return true
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

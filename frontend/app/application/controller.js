import Controller from '@ember/controller';
import { action } from '@ember/object';
import { isPresent } from '@ember/utils';
import { task, waitForEvent, timeout } from 'ember-concurrency';
import ENV from 'frontend/config/environment'
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
    dot: 'rgba(129,97,160, 1)',
    ring: 'rgba(129,97,160, .6)'
  },
};

export default class ApplicationController extends Controller {
  panel = null;
  activePoi = null;
  crs = L.CRS.Simple;
  paintingSet = false;
  miniMap = null;
  panelBounds = {};

  setStyle() {
    return {
      color: '#263238',
      fillOpacity: .85,
      fillColor: '#263238'
    }
  }

  addMiniMap() {
    if (this.miniMap) {
      this.removeMinMap();
    }
    const miniPainting = new L.tileLayer(
      `${ENV.APP.TILE_HOST}${this.activePanel.title}/{z}/{x}/{y}.png`
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
        centerFixed: this. activePanel.paintingBounds.getCenter(),
        mapOptions: {
          maxBounds: this. activePanel.paintingBounds.pad(0),
          minZoom: 1,
          maxZoom: 1
        }
      }
    );
    this.setProperties({
      miniMap: miniMap
    });
    miniMap.addTo(this. activePanel.map);
    let lCtrlContainer = miniMap.getContainer();
    let newCtrlContainer = document.getElementById('minimap');
    newCtrlContainer.appendChild(lCtrlContainer);
  }

  @(task(function* () {
    this.send('clearActive');
    yield this.panel.hide();
    return yield this.reCenter.perform();
  }))
  closePanel;

  @(task(function* () {
    yield this.panel.show();
  }))
  showPanel;

  @(task(function* (/*event*/) {
    yield timeout(1000);
    yield this.offsetCenter.perform();
    if (this.activePoi) {
      yield this.flyToPoi.perform(this.activePoi);
    } else {
      //
    }
  }).restartable())
  reSize;

  @(task(function* (/*event*/) {
    if (this.paintingSet) return;
    this.set('paintingSet', true);
    yield this.offsetCenter.perform();
    this.sizePanControls();
    return true;
  }).drop())
  setPainting;

  @action
  sizePanControls() {
    let element = document.getElementById('pan-controls');
    if (element === null) return;
    let containerWidth = window.innerWidth;
    let newSize =  Math.floor(containerWidth * .08);
    element.style.cssText = `width: ${newSize}px; height: ${newSize}px; opacity: 1`
    this.setReCenterButton(newSize);
    this.set('controlsSet', true);
  }

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
  }

  enableInteraction() {
    if (!this.activePanel) return;
    this.activePanel.map.dragging.enable();
    this.activePanel.map.doubleClickZoom.enable();
    this.activePanel.map.scrollWheelZoom.enable();
  }

  disableInteraction() {
    if (!this.activePanel) return;
    this.activePanel.map.dragging.disable();
    this.activePanel.map.doubleClickZoom.disable();
    this.activePanel.map.scrollWheelZoom.disable();
  }

  suspendInteractions() {
    if (!this.activePanel) return;
    this.activePanel.map.once('moveend', () => {
      this.enableInteraction();
    });
    this.disableInteraction();
  }

  @(task(function* (event) {
    let map = event.target;
    this.model.panels.forEach(panel => {
      panel.setProperties({
        map
      });
    })
    this.disableInteraction();

    // map.on('click', function(event){console.log(event)});

    yield waitForEvent(this. activePanel.map, 'moveend');
    this.enableInteraction();
    if (this.miniMap === null) {
      this.addMiniMap();
    }
    let allSet = yield timeout(300);
    return allSet;
  }))
  initMap;

  @(task(function* (poi, event) {
    if (event.originalEvent.target.classList.contains('pulsate-ring')) return;
    this.set('showingTours', false);
    this.send('clearActive');
    this.set('activePoi', poi);
    poi.setProperties({ active: true });
    yield this.flyToPoi.perform(poi);
  }).drop())
  highlightPoi;

  @(task(function* (poi) {
    this.suspendInteractions();
    yield this. activePanel.map.flyToBounds(poi.bounds, {
      duration: 1.5
    });
  }).restartable())
  flyToPoi;

  @(task(function* () {
    this.suspendInteractions();
    // this.addMiniMap();
    yield this.panToCenter.perform();
  }))
  reCenter;

  @(task(function* (/*e*/) {
    /*
      Extend the painting's bounds to include the bottom navigation.
      This ensures the painting will always sit right on top of the navigation.
      The bottom navigation is 20vh plus 40px margin
    */
    let { map, paintingBounds } = this.activePanel;
    // Draw rectangles of the bounds for debugging.
    // L.rectangle(paintingBounds, {color: 'deeppink'}).addTo(map);
    // Calling `extend` on a `L.latLngBounds` object alters it. So we make a copy.
    let copyPaintingBounds = L.latLngBounds(paintingBounds.getSouthWest(), paintingBounds.getNorthEast());
    if (this.model.panels && this.model.panels.length === 2) {
      this.addPanBounds(copyPaintingBounds);
    }
    let navSouthWestPoint = this.offsetSouthWest();
    let navSouthwest = map.options.crs.pointToLatLng(navSouthWestPoint, map.getZoom());
    
    let navBounds = L.latLngBounds(copyPaintingBounds.getSouthEast(), navSouthwest);
    copyPaintingBounds.extend(navBounds);
    this.set('panelBounds', copyPaintingBounds.pad(.01));
    // yield timeout(300);
    map.fitBounds(copyPaintingBounds.pad(.01), {
      animate: false
    });
    yield timeout(300);
    map.setMaxBounds(copyPaintingBounds.pad(.7));
    map.setMinZoom(map.getZoom() - .5);
  }).restartable())
  offsetCenter;

  addPanBounds(copyPaintingBounds) {
    let { map } = this. activePanel;
    // L.rectangle(copyPaintingBounds).addTo(map);
    if (this.scoot === 'right') {
      let paintingSouthWestPoint = map.options.crs.latLngToPoint(copyPaintingBounds.getSouthWest(), map.getZoom());
      let panSouthWestPoint = L.point(paintingSouthWestPoint.x - (window.innerWidth * .05), 0);
      let panSouthWestLatLng = map.options.crs.pointToLatLng(panSouthWestPoint, map.getZoom());
      let panBounds = L.latLngBounds(panSouthWestLatLng, copyPaintingBounds.getNorthEast());
      return copyPaintingBounds.extend(panBounds);
    } else if (this.scoot === 'left') {
      let paintingNorthEastPoint = map.options.crs.latLngToPoint(copyPaintingBounds.getNorthEast(), map.getZoom());
      let panNorthEastPoint = L.point(paintingNorthEastPoint.x + (window.innerWidth * .05), 0);
      let panNorthEastLatLng = map.options.crs.pointToLatLng(panNorthEastPoint, map.getZoom());
      let panBounds = L.latLngBounds(copyPaintingBounds.getSouthEast(), panNorthEastLatLng);
      return copyPaintingBounds.extend(panBounds);
    }
  }

  offsetSouthWest() {
    let { map, paintingBounds } = this. activePanel;
    let paintingSouthWestPoint = map.options.crs.latLngToPoint(paintingBounds.getSouthWest(), map.getZoom());
    let southWestY = paintingSouthWestPoint.y + (window.innerHeight * .2);
    // if (this.model.panels.length === 2) {
    //   return L.point((0 - (window.innerWidth * .05)), southWestY);
    // } else {
      return L.point(0, southWestY);
    // }
  }

  offsetNorthEast() {
    let { map, paintingBounds } = this. activePanel;
    let paintingNorthEastPoint = map.options.crs.latLngToPoint(paintingBounds.getNorthEast(), map.getZoom());
    let northEastX = paintingNorthEastPoint.x + (window.innerWidth * .1);
    // if (this.model.panels.length === 2) {
    //   return L.point((0 - (window.innerWidth * .1)), northEastX);
    // } else {
      return L.point(0, northEastX);
    // }
  }
  
  @(task(function* () {
    this. activePanel.map.flyToBounds(
      this.panelBounds, {
        animate: false
      }
    );
    yield waitForEvent(this. activePanel.map, 'moveend');
    this.set('atMaxBounds', true);
  }).restartable())
  panToCenter;

  removeMinMap() {
    if (!this.miniMap) return;
    this.miniMap.remove();
    this.setProperties({ miniMap: null });
  }

  @action
  setDot(poi, feature, point) {
    let marker = L.marker(
      point, {
        icon: L.divIcon({
          html: `<div class="jesse-dot"><div class="dot ${feature.properties.type}" style='background-color: ${COLORS[feature.properties.type].dot}'></div><div class="pulsate-ring ${feature.properties.type}" style='background-color: ${COLORS[feature.properties.type].ring}'></div></div>`
        })
      }
    );

    marker.on('dragend', event => {
      this.send('relocatePoi', event.target._latlng, poi)
    });
    return marker;
  }

  @action
  clearActive() {
    if (isPresent(this.activePoi)) {
      this.activePoi.setProperties({ active: false });
      this.set('activePoi', null);
    }
  }
}

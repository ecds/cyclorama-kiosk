import Controller from '@ember/controller';
import { set } from '@ember/object';
import PaintingActionsMixin from "../../../utils/mixins/painting-actions/mixin";
// import UIkit from 'uikit';
/* global L */

export default Controller.extend(PaintingActionsMixin, {
  addMiniMap(miniPainting) {
    let miniMap = new L.Control.MiniMap(
      miniPainting,
      {
        zoomLevelFixed: -6,
        centerFixed: this.model.map.getCenter(),
        width: '10vw',
        height: '10vh',
        aimingRectOptions: {
          weight: 5
        },
        mapOptions: {
          crs: this.crs,
          minZoom: -6,
          maxZoom: -6
        }
      }
    );
  
    this.setProperties({miniMap: miniMap});
    miniMap.addTo(this.model.map);
    let lCtrlContainer = miniMap.getContainer();
    let newCtrlContainer = document.getElementById('minimap');
    newCtrlContainer.appendChild(lCtrlContainer);
  },

  actions: {
    switchPoiType(button) {
      this.model.pois.forEach(poi => {
        if (poi.point.properties.type === button.label){
          poi.setProperties({ show: true });
        } else {
          poi.setProperties({ active: false });
          poi.setProperties({ show: false });
        }
      }),
      this.buttons.forEach(b => {
        set(b, 'active', false);
      });
      set(button, 'active', true);
    },

    showTours() {
      this.set('showingTours', true);
    },

    viewReCenter() {
      this.send('reCenter');
    },

    // backToMap() {
    //   console.log(this.panel)
    //   this.panel.hide();
    //   // UIkit.offcanvas(document.getElementById('poi-detail')).hide()
    // },

    // goTo(poi) {
    //   this.send('highlightPoi', poi);
    // },

    setPaintingView(event) {
      // this.model.map.setMinZoom(-5);
      // this.model.map.fitBounds(event.target.getBounds());
      // this.model.setProperties({ paintingLayer: event.target });
      this.send('setPainting', event);
      if (this.miniMap === null && this.edit !== true) {
        const miniPainting = new L.imageOverlay(
          event.target._url,
          this.bounds
        );
        this.addMiniMap(miniPainting);
      }
    }
  }
});

import Mixin from '@ember/object/mixin';
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
  }
};

export default Mixin.create({
  panel: null,
  crs: L.CRS.Simple,
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
    miniMap.addTo(this.model.map);
    let lCtrlContainer = miniMap.getContainer();
    let newCtrlContainer = document.getElementById('minimap');
    newCtrlContainer.appendChild(lCtrlContainer);
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
      map.once('moveend', () => {
        map.once('moveend', () => {
          if (!this.model.originalCenter) {
            this.model.setProperties({
              originalCenter: map.getCenter(),
              originalZoom: map.getZoom(),
              originalBounds: map.getBounds()
            });
          }
          if (this.miniMap === null) {
            const miniPainting = new L.imageOverlay(
              this.model.painting,
              this.model.paintingBounds
            );
            this.addMiniMap(miniPainting);
          }
        });
        this.model.setProperties({
          bottom: [
            (
              this.model.paintingLayer.getBounds()._southWest.lat -
              map.getBounds()._southWest.lat
            ) +
            map.getCenter().lat,
            map.getCenter().lng
          ]
        });
        map.panTo(this.model.bottom);
      });

      this.model.setProperties({
        map
      });
    },

    setPainting(event) {
      this.model.map.setMinZoom(-5);
      this.model.map.fitBounds(event.target.getBounds());
      this.model.setProperties({
        paintingLayer: event.target
      });
    },

    highlightPoi(poi) {
      this.model.pois.forEach(p => {
        p.set('active', false);
      });

      this.set('activePoi', true);

      this.model.map.once('zoomend', () => {
        poi.set('active', true);
        if (this.panel.isToggled() !== true) {
          this.panel.show();
        }
      });

      this.send('flyToPoi', poi);
      this.model.map.getContainer().style.height = '100vh';
    },

    flyToPoi(poi) {
      this.model.map.flyToBounds(poi.bounds, {
        duration: 1
      });
    },

    clearPoi() {
      this.model.pois.forEach(p => {
        p.set('active', false);
      });
    },

    closePanel() {
      this.model.map.getContainer().style.height = '85vh';
      this.panel.hide().then(() => {
        this.send('clearPoi');
        this.send('reCenter');
        // this.model.map.once('zoomend', () => {
        //   this.model.map.setView(this.model.originalCenter, this.model.originalZoom);
        // });
        // this.set('activePoi', false);
        // this.model.map.flyToBounds(this.model.originalBounds, { duration: 1 });
      });
    },

    reCenter() {
      this.model.map.once('moveend', () => {
        this.set('activePoi', false);
        // this.model.map.setView(this.model.originalCenter, this.model.originalZoom);
      });
      this.model.map.flyToBounds(this.model.originalBounds, {
        duration: 1
      });
    },

    reSize() {},

    paintingLoaded() {},

    whatBounds() {},

    zoomend() {},

    moveend() {}
  }
});

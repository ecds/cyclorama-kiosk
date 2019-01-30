import Component from '@ember/component';
/* global L */

export default Component.extend({
  tagName: '',
  disableZoomIn: false,
  disableZoomOut: false,

  didInsertElement() {
    this.map.on('zoomend', () => {
      this.toggleEnabled();
    })
  },

  // 12.201.78.71

  toggleEnabled() {
    if (this.map.getZoom() === this.map.getMaxZoom()) {
      this.set('disableZoomIn', true);
    } else {
      this.set('disableZoomIn', false);
    }

    if (this.map.getZoom() === this.map.getMinZoom()) {
      this.set('disableZoomOut', true);
    } else {
      this.set('disableZoomOut', false);
    }
  },

  actions: {
    pan(direction) {
      if (direction === 'down') {
        this.map.panBy(L.point(0, 500));
      } else if (direction === 'up') {
        this.map.panBy(L.point(0, -500));
      } else if (direction === 'left') {
        this.map.panBy(L.point(-500, 0));
      } else if (direction === 'right') {
        this.map.panBy(L.point(500, 0));
      }
    },

    zoomIn() {
      this.map.zoomIn(.2);
    },

    zoomOut() {
      this.map.zoomOut(.2);
    }
  }
});

import Component from '@ember/component';
/* global L */

export default Component.extend({
  tagName: '',
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

    zoom(direction) {
      if (direction === 'in') {
        this.map.zoomIn(1);
      } else {
        this.map.zoomOut(1);
      }
    }
  }
});

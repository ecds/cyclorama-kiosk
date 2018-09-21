import Component from '@ember/component';
import EmberObject from '@ember/object';
import { A } from '@ember/array';
/* global L */

// const POI = EmberObject.extend({});

export default Component.extend({
  types: A(['people', 'landmarks', 'alterations']),
  actions: {
    addImage(poi) {
      this.newImage(poi);
    },
    removeImage(poi, image) {
      this.deleteImage(poi, image);
    },

    cancel(poi) {
      poi.quad.reCenter();
    }
  }
});

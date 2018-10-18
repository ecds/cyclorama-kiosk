import Component from '@ember/component';
import { A } from '@ember/array';

// const POI = EmberObject.extend({});

export default Component.extend({
  types: A(['people', 'landmarks', 'changes']),
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

import Component from '@ember/component';
import { A } from '@ember/array';
import fetch from 'fetch';
import { task } from 'ember-concurrency';

// const POI = EmberObject.extend({});

export default Component.extend({
  types: A(['people', 'landmarks', 'changes']),

  uploadImage: task(function* (image, event) {
    const file = event.target.files[0];
    let response = yield fetch(`http://otb.ecdsdev.org:3000/sign-s3?file-name=${file.name}&file-type=${file.type}`);
    let signature = yield response.json();
    yield fetch(signature.signedRequest, {
      method: 'PUT',
      body: file
    });
    image.setProperties({
      url: signature.url,
      name: file.name
    });
    return yield image.save();
  }),

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

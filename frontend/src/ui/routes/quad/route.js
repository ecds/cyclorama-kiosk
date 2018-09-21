import Route from '@ember/routing/route';
import fetch from 'fetch';
/* global L */

export default Route.extend({
  model(params) {
    return this.store.queryRecord('quad', { title: params.quad });
  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    fetch('/buttons.json').then(response => {
      response.json().then(data => {
        this.controllerFor('quad').set('buttons', data);
      });
    });

    // fetch(`http://localhost:3000/quads/${this.paramsFor('quad').quad}`).then(response => {
    //   response.json().then(data => {
    //     this.controllerFor('quad').set('model', data.quad[0]);
    //     this.controllerFor('quad').set('people', data.people);
    //     this.controllerFor('quad').set('landmarks', data.landmarks);
    //     this.controllerFor('quad').set('alterations', data.alterations);
    //   });
    // });
  },

  afterModel(model) {
    model.setProperties({
      paintingBounds: new L.latLngBounds(
        [
          new L.LatLng(0, 0),
          new L.LatLng(5000, 15405)
        ]
      )
    });
    model.pois.forEach(poi => {
      if (poi.point.properties.type == 'people') {
        poi.setProperties({ show: true });
      }
    });
  }
});

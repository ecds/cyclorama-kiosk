import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import fetch from 'fetch';
/* global L */

export default Route.extend({
  model(params) {
    return RSVP.hash({
      quad: this.store.queryRecord('quad', { title: params.quad }),
      tours: this.store.findAll('tour')
    });  },

  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    fetch('/buttons.json').then(response => {
      response.json().then(data => {
        this.controllerFor('quad').set('buttons', data);
      });
    });
  },

  // zoomLevel() {
  //   return Math.ceil(
  //     Math.log(
  //       Math.max(this.width, this.height) /
  //       this.tilesize
  //     ) / Math.log(2)
  //   )
  // }

  afterModel(model) {
    model.quad.pois.forEach(poi => {
      poi.setProperties({ show: true });
    });
    model.quad.pois.forEach(poi => {
      if (poi.point.properties.type == 'people') {
        poi.setProperties({ show: true });
      } else {
        poi.setProperties({ show: false });
      }
    });
  }
});

import Route from '@ember/routing/route';
import RSVP from 'rsvp';
/* global L */

export default Route.extend({
  // model(params) {
  //   return this.store.queryRecord('quad', { title: params.quad });
  // },

  model(params) {
    return RSVP.hash({
      quad: this.store.queryRecord('quad', { title: params.quad }),
      tours: this.store.findAll('tour'),
      pois: this.store.findAll('poi')
    });
  },

  afterModel(model) {
    model.quad.setProperties({
      paintingBounds: new L.latLngBounds(
        [
          new L.LatLng(0, 0),
          new L.LatLng(5000, 15405)
        ]
      )
    });
    model.quad.pois.forEach(poi => {
      poi.setProperties({ show: true });
    });
  }
});

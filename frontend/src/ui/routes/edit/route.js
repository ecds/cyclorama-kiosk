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
    let sw = L.CRS.Simple.pointToLatLng(L.point(0, model.quad.height), 8);
    let ne = L.CRS.Simple.pointToLatLng(L.point(model.quad.width, 0), 8);
    model.quad.setProperties({
      paintingBounds: new L.latLngBounds(
        [
          sw,
          ne
        ]
      )
    });
    model.quad.pois.forEach(poi => {
      poi.setProperties({ show: true });
    });
  }
});

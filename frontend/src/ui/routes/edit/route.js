import Route from '@ember/routing/route';
import RSVP from 'rsvp';
/* global L */

export default Route.extend({
  // model(params) {
  //   return this.store.queryRecord('panel', { title: params.panel });
  // },

  model(params) {
    return RSVP.hash({
      panel: this.store.findRecord('panel', params.panel),
      tours: this.store.findAll('tour'),
      pois: this.store.findAll('poi')
    });
  },

  afterModel(model) {
    let sw = L.CRS.Simple.pointToLatLng(L.point(0, model.panel.height), 8);
    let ne = L.CRS.Simple.pointToLatLng(L.point(model.panel.width, 0), 8);
    model.panel.setProperties({
      paintingBounds: new L.latLngBounds(
        [
          sw,
          ne
        ]
      )
    });
    model.panel.pois.forEach(poi => {
      poi.setProperties({ show: true });
    });
  }
});

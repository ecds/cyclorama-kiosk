import Route from '@ember/routing/route';
/* global L */

export default Route.extend({
  model(params) {
    return this.store.queryRecord('quad', { title: params.quad });
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
      poi.setProperties({ show: true });
    });
  }
});

import DS from 'ember-data';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

/* global L */

const { Model, attr, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  kiosks: hasMany('kiosk'),
  painting: attr('string'),
  pois: hasMany('poi', { async: false }),
  height: attr('number'),
  width: attr('number'),
  opacity: attr('number'),
  direction: attr('string'),
  sortedPois: sort('pois', '_poiPositionSort'),
  _poiPositionSort: computed('pois', function() {
    return ['position:asc']
  }),

  zoomLevel: computed('width', 'height', function() {
    return Math.ceil(
      Math.log(
        Math.max(this.width, this.height) /
        256
      ) / Math.log(2)
    );
  }),

  paintingBounds: computed('width', 'height', function() {
    let sw = L.CRS.Simple.pointToLatLng(L.point(0, this.height), this.zoomLevel);
    let ne = L.CRS.Simple.pointToLatLng(L.point(this.width, 0), this.zoomLevel);
    return new L.latLngBounds([sw, ne])
  })
});
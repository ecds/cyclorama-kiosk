import Model, { attr, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

/* global L */

export default class PanelModel extends Model {
  @attr('string') title;
  @hasMany('kiosk') kiosks;
  @attr('string') painting;
  @hasMany('poi', { async: false }) pois;
  @attr('number') height;
  @attr('number') width;
  @attr('number') opacity;
  @attr('string') direction;
  @sort('pois', '_poiPositionSort') sortedPois;

  @computed('pois')
  get _poiPositionSort() {
    return ['position:asc']
  }

  @computed('height', 'width')
  get zoomLevel() {
    return Math.ceil(
      Math.log(
        Math.max(this.width, this.height) /
        256
      ) / Math.log(2)
    );
  }

  @computed('height', 'width')
  get paintingBounds() {
    let sw = L.CRS.Simple.pointToLatLng(L.point(0, this.height), this.zoomLevel);
    let ne = L.CRS.Simple.pointToLatLng(L.point(this.width, 0), this.zoomLevel);
    return new L.latLngBounds([sw, ne])
  }
}

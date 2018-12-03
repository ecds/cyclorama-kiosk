import DS from 'ember-data';
import { computed } from '@ember/object';
import { sort } from '@ember/object/computed';

const { Model, attr, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  painting: attr('string'),
  pois: hasMany('poi', { async: false }),
  sortedPois: sort('pois', '_poiPositionSort'),
  _poiPositionSort: computed('pois', function() {
    return ['tourPosition:asc']
  })
});
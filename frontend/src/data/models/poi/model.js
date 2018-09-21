import DS from 'ember-data';
import { computed, get } from '@ember/object';

const GROUPS = {
  people: 100,
  landmarks: 200,
  alterations: 300
}

const { Model, attr, belongsTo, hasMany} = DS;

export default Model.extend({
  name: attr('string'),
  description: attr('string'),
  quad: belongsTo('quad'),
  polygon: attr(),
  point: attr(),
  images: hasMany('image', { async: false }),
  bounds: attr(),
  active: attr('boolean'),
  show: attr('boolean'),
  type: attr('string'),
  position: attr('number'),

  previous: computed('quad', function() {
    let previous = this.quad.get('sortedPois')[this.quad.get('sortedPois').indexOf(this) - 1]
    if (!previous || previous.point.properties.type !== this.point.properties.type) {
      return null;
    }
    return previous
  }),

  next: computed('quad', function() {
    let next = this.quad.get('sortedPois')[this.quad.get('sortedPois').indexOf(this) + 1]
    if (!next || next.point.properties.type !== this.point.properties.type) {
      return null;
    }
    return next
  })
});

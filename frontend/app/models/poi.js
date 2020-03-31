import Model, { attr, belongsTo, hasMany } from '@ember-data/model';
import { computed } from '@ember/object';

export default class PoiModel extends Model {
  @attr('string') name;
  @attr('string') description;
  @belongsTo('panel') panel;
  // @belongsTo('quad') quad;
  @attr() polygon;
  @attr() point;
  @hasMany('image', { async: false }) images;
  @attr() bounds;
  @attr('boolean') active;
  @attr('boolean', { defaultValue: false }) show;
  @attr('string') type;
  @attr('number') position;

  @computed('panel')
  get previous() {
    let previous = this.panel.get('sortedPois')[this.panel.get('sortedPois').indexOf(this) - 1]
    if (!previous || previous.point.properties.type !== this.point.properties.type) {
      return null;
    }
    return previous
  };

  @computed('panel')
  get next() {
    let next = this.panel.get('sortedPois')[this.panel.get('sortedPois').indexOf(this) + 1]
    if (!next || next.point.properties.type !== this.point.properties.type) {
      return null;
    }
    return next
  };
}

import Model, { attr, belongsTo } from '@ember-data/model';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

export default class ImageModel extends Model {
  @attr('string') caption;
  @attr('string') name;
  @belongsTo('poi') poi;
  @attr('number') position;
  @attr('string') url;

  @computed('caption')
  get safeCaption() {
    return htmlSafe(this.caption);
  }
}

import Model, { attr, belongsTo } from '@ember-data/model';

export default class ImageModel extends Model {
  @attr('string') caption;
  @attr('string') name;
  @belongsTo('poi') poi;
  @attr('number') position;
  @attr('string') url;
}

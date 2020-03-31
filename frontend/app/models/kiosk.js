import Model, { attr, hasMany } from '@ember-data/model';

export default class KioskModel extends Model {
  @attr('string', { defaultValue: 'none' }) pan;
  @hasMany('panel') panels;
  @attr('string') title;
}

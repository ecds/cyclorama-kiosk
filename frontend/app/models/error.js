import Model, { attr } from '@ember-data/model';

export default class ErrorModel extends Model {
  @attr('string') fileName;
  @attr('string') lineNumber;
  @attr('string') location;
  @attr('string') message;
}

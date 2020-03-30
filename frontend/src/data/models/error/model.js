import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  message: attr('string'),
  fileName: attr('string'),
  location: attr('string'),
  lineNumber: attr('number')
});

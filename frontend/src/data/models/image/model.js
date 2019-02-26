import DS from 'ember-data';
const { Model, attr, belongsTo} = DS;

export default Model.extend({
  url: attr('string'),
  name: attr('string'),
  caption: attr('string'),
  position: attr('number'),
  poi: belongsTo('poi')
});

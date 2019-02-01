import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default Model.extend({
  title: attr('string'),
  panels: hasMany('panel'),
  pan: attr('string', { defaultValue: 'none' })
});

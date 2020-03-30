import DS from 'ember-data';

export default DS.RESTAdapter.extend({
  host: 'http://otb.ecdsdev.org:3000'
});
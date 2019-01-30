import DS from 'ember-data';

export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  // primaryKey: 'title',
  attrs: {
    pois: { embedded: 'always' }
  }
});

import RESTSerializer, { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';

export default RESTSerializer.extend(EmbeddedRecordsMixin, {
  primaryKey: '_id',
  attrs: {
    images: { embedded: 'always' }
  }
});

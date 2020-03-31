import RESTSerializer, { EmbeddedRecordsMixin } from '@ember-data/serializer/rest';
import ENV from 'frontend/config/environment'

let key = '';
if (ENV.environment == 'development') {
  key = '_id';
} else {
  key = 'title';
}
export default RESTSerializer.extend(EmbeddedRecordsMixin, {
  primaryKey: key,
  attrs: {
    panels: { embedded: 'always' }
  }
});

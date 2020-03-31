import DS from 'ember-data';
import ENV from 'frontend/config/environment'

let key = '';
if (ENV.environment == 'development') {
  key = '_id';
} else {
  key = 'title';
}
export default DS.RESTSerializer.extend(DS.EmbeddedRecordsMixin, {
  primaryKey: key,
  attrs: {
    panels: { embedded: 'always' }
  }
});

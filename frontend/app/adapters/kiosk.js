import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'frontend/config/environment'

export default RESTAdapter.extend({
  host: ENV.APP.API_HOST,
  queryRecord: function(store, type, params, snapshot) {
    var url = this.buildURL(type.modelName, params.title, snapshot, 'findRecord');
    return this.ajax(url, 'GET');
  },
  buildURL: function(record, suffix) {
    const endpoint = this._super(record, suffix);
    if (ENV.APP.REQUEST_SUFFIX) {
      return `${endpoint}${ENV.APP.REQUEST_SUFFIX}`
    } else {
      return endpoint;
    }
  }
});

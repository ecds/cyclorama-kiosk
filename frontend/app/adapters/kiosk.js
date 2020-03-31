import DS from 'ember-data';
import ENV from 'frontend/config/environment'

export default DS.RESTAdapter.extend({
  host: ENV.APP.API_HOST,
  queryRecord: function(store, type, params, snapshot) {
  console.log("params", params)
    var url = this.buildURL(type.modelName, params.title, snapshot, 'findRecord');
    return this.ajax(url, 'GET');
  },
  buildURL: function(record, suffix) {
  console.log("record", record)
    const endpoint = this._super(record, suffix);
    console.log("endpoint", endpoint)
    console.log("ENV.APP.REQUEST_SUFFIX", ENV.APP)
    if (ENV.APP.REQUEST_SUFFIX) {
      return `${endpoint}${ENV.APP.REQUEST_SUFFIX}`
    } else {
      return endpoint;
    }
  }
});

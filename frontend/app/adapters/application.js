import RESTAdapter from '@ember-data/adapter/rest';
import ENV from 'frontend/config/environment'

export default RESTAdapter.extend({
  host: ENV.APP.API_HOST
});
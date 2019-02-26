import Ember from 'ember';
import config from '../config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  if (config.environment === 'development') {
    this.route('edit', { path: '/edit/:panel' });
  }
  this.route('kiosk', { path: '/kiosk/:kiosk' });
});

export default Router;

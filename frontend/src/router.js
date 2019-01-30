import Ember from 'ember';
import config from '../config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('edit', { path: '/edit/:quad' });
  this.route('quad', { path: '/quad/:quad' });
  this.route('kiosk', { path: 'kiosk/:kiosk' });
});

export default Router;

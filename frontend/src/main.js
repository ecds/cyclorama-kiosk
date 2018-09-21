import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from '../config/environment';

const App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix + '/src/init');

/*
 * Fallback to support addons looking for `app/` directories
 */
loadInitializers(App, config.modulePrefix);

export default App;

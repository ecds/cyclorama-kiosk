'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
  });

  app.import('node_modules/leaflet-minimap/dist/Control.MiniMap.min.js');
  app.import('node_modules/leaflet.pm/dist/leaflet.pm.min.js');

  return app.toTree();
};

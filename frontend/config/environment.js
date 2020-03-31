'use strict';

const http = require('http');
const fs = require('fs');

module.exports = function(environment) {
  const CMS_SERVER = 'http://readux.ecdsdev.org:3000';
  let ENV = {
    modulePrefix: 'frontend',
    environment,
    rootURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    ENV.APP.API_HOST = CMS_SERVER;
    ENV.APP.TILE_HOST = 'https://s3.amazonaws.com/battleofatlanta/tiles/';
    ENV.APP.IMAGE_ROOT_PATH = 'https://s3.amazonaws.com/battleofatlanta/';
  }

  if (environment === 'kiosk') {
    // When building for the kiosk, we want to get fresh JSON files from the CMS.
    // Add the files as assets.
    const localPath = 'public/assets/kiosks/'
    // This might be silly, but this gives us an array for 1-4
    const kiosks = [...Array(5).keys()];
    kiosks.shift();
    kiosks.forEach(function(k) {
      let file = fs.createWriteStream(`${localPath}${k}.json`);
      http.get(`${CMS_SERVER}/kiosks/${k}`, function(response) {
        response.pipe(file);
      });
    })
    ENV.APP.API_HOST = '/assets';
    ENV.APP.TILE_HOST = 'http://tiles.cycloramakiosk.atlantahistorycenter.com/';
    ENV.APP.REQUEST_SUFFIX = '.json';
    ENV.APP.IMAGE_ROOT_PATH = 'http://tiles.cycloramakiosk.atlantahistorycenter.com/images/';
  }

  return ENV;
};

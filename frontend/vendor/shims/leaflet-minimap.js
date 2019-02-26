(function() {
  function vendorModule() {
    'use strict';

    return {
      'default': self['MiniMap'],
      __esModule: true,
    };
  }

  define('leaflet-minimap', [], vendorModule);
})();

define('cyclorama-kiosk/components/painting-pois', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    tagName: '',

    setDot(feature, point) {
      return L.marker(point, {
        icon: L.divIcon({
          html: '<div class="jesse-dot"><div class="dot"></div><div class="pulsate-ring"></div></div>'
        })
      });
    },

    setStyle() {
      return {
        color: '#263238',
        fillOpacity: .6,
        fillColor: '#263238'
      };
    },

    actions: {
      clickSpot(poi) {
        Ember.get(this, 'highlight')(poi);
      },

      flyToPoi(poi) {
        Ember.get(this, 'flyToPoi')(poi);
      }
    }
  });
});
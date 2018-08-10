import Component from '@ember/component';
import { get } from '@ember/object';

export default Component.extend({
  tagName: '',

  setDot(feature, point) {
    return L.marker(
      point,
      {
        icon: L.divIcon({
          html: '<div class="jesse-dot"><div class="dot"></div><div class="pulsate-ring"></div></div>'
        })
      }
    );
  },

  setStyle() {
    return {
      color: '#263238',
      fillOpacity: .6,
      fillColor: '#263238'
    }
  },

  actions: {
    clickSpot(poi) {
      get(this, 'highlight')(poi);
    }
  }
});

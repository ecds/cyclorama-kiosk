import Component from '@ember/component';
import { action } from '@ember-decorators/object';
/* global L */

// export default Component.extend({
export default class MapControlsComponent extends Component {
  tagName = 'span';
  disableZoomIn = false;
  disableZoomOut = false;

  didInsertElement() {
    this.map.on('zoomend', () => {
      this.toggleEnabled();
    })
  }

  // 12.201.78.71

  toggleEnabled() {
    if (this.map.getZoom() === this.map.getMaxZoom()) {
      this.set('disableZoomIn', true);
    } else {
      this.set('disableZoomIn', false);
    }

    if (this.map.getZoom() === this.map.getMinZoom()) {
      this.set('disableZoomOut', true);
    } else {
      this.set('disableZoomOut', false);
    }
  }

  @action
  pan(direction) {
    if (direction === 'down') {
      this.map.panBy(L.point(0, 500));
    } else if (direction === 'up') {
      this.map.panBy(L.point(0, -500));
    } else if (direction === 'left') {
      this.map.panBy(L.point(-500, 0));
    } else if (direction === 'right') {
      this.map.panBy(L.point(500, 0));
    }
  }

  @action
  zoomIn() {
    this.map.zoomIn(.2);
  }

  @action
  zoomOut() {
    this.map.zoomOut(.2);
  }

  @action
  reload() {
    location.reload(true);
  }
}

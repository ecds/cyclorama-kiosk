import Component from '@ember/component';

export default Component.extend({
  didInsertElement() {
    // Add Leaflet PM controls.
    // this.model.map.pm.addControls({
    //   position: 'topright',
    //   drawMarker: false,
    //   drawPolyline: false,
    //   drawRectangle: false,
    //   drawPolygon: false,
    //   drawCircle: false,
    //   cutPolygon: false,
    //   editMode: false, 
    //   removalMode: false
    // });

    // Event for when marker is added.
    // this.quad.map.on('pm:create', this.newPoi(event));
    this.model.map.on('pm:create', this.newPoi);
    // this.quad.map.on('pm:cut', this.setPolygon(event));
  }
});

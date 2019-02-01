import Controller from '@ember/controller';
import PaintingActionsMixin from "../../../utils/mixins/painting-actions/mixin";
import UIkit from 'uikit';
import { task, timeout } from 'ember-concurrency';
/* global L */

export default Controller.extend(PaintingActionsMixin, {
  newPoi: null,
  tourToEdit: null,
  newPoiType: 'people',
  managePois: false,
  manageTours: false,

  // Function that calculates the fly-to bounds for a POI.
  // This is kind of a long walk, but we first dig out the bounds
  // from the inner-ring drawn around the POI. Then it doubles the
  // width by extending the left ("western") bound. This is to
  // account for the POI detail panel that takes up 50% of screen
  // on the left.
  calcBounds(shape) {
    const bounds = L.latLngBounds(
      shape
      .resultingLayers[0]
      ._layers[
        Object.keys(shape.resultingLayers[0]._layers)[0]
      ]
      ._latlngs[1]
    );
    return [
      [bounds.getNorth(), bounds.getEast()],
      [bounds.getSouth(), (bounds.getWest() - (bounds.getEast() - bounds.getWest()))]
    ]
  },

  initEditMap: task(function* (event) {
    yield this.get('initMap').perform(event);
    // Add listener for when a new poi is dropped on the painting.
    this.model.quad.map.on('pm:create', (shape) => { this.send('newPoi', shape) });
  }),

  savePoi: task(function* (poi) {
    poi.images.forEach(image => {
      // if (image.dirtyType) {
        image.setProperties({
          poi
        });
        image.save().then(() => {
          // Don't really need to do anything here.
        }, error => {
          UIkit.notification(`ERROR SAVING IMAGE ${error.message}`, 'danger');
        });  
      // }
    });

    // A tmpPolygon is set by the onEdit event.
    // The onEdit listener is added when the polygon is added.
    if (poi.tmpPolygon) {
      poi.set('polygon', poi.tmpPolygon);
      poi.set('tmpPolygon', null);
    }

    let newBounds = this.model.quad.map.getBounds();
    
    poi.setProperties({
      bounds: [
        [newBounds.getNorth(), newBounds.getEast()],
        [newBounds.getSouth(), newBounds.getWest()]
      ]
    });

    try {
      yield poi.save()
      UIkit.notification(`${poi.name} SAVED!`, 'success');
    } catch(error) {
      UIkit.notification(`ERROR SAVING POI: ${error.message}`, 'danger');
    }
    
    try {
      this.model.quad.get('pois').pushObject(poi);
      yield this.model.quad.save();
    } catch(error) {
      UIkit.notification(`ERROR SAVING QUAD: ${error.message}`, 'danger');
    } finally {
      //
    }
    
    // For some reason, we need to wait a bit before
    // re-enabling the edit mode.
    yield timeout(500);
    this.model.quad.map.pm.enableGlobalEditMode();
  }),

  editReCenter: task(function* () {
    yield this.get('closePanel').perform();
    this.model.quad.map.pm.disableGlobalEditMode();
  }),

  actions: {
    newTour() {
      this.set('manageTours', false);
      let newTour = this.store.createRecord('tour');
      this.set('tourToEdit', newTour);
    },

    newPoiType(type) {
      this.set('newPoiType', type);
      // Enabling pm.Draw.Marker adds a marker to be dropped.
      this.model.quad.map.pm.Draw.Marker.enable();
    },
    // This is called when a new marker is added to the paining.
    newPoi(shape) {
      if (!shape || shape.shape !== 'Marker') {
        return;
      }
      this.set('managePois', false);
      this.model.quad.map.pm.Draw.Marker.disable();
      this.model.quad.map.pm.Draw.Cut.enable();
      let newPoint = shape.layer.toGeoJSON();
      newPoint.properties.type = this.get('newPoiType');

      let newPoi = this.store.createRecord('poi', {
        point: newPoint,
        quad: this.model.quad,
        type: this.newPoiType
      });

      shape.layer.remove();

      // Add listener for when the POI has been cut out.
      this.model.quad.map.once('pm:cut', shape => {
        const newBounds = this.calcBounds(shape);
        newPoi.setProperties({
          polygon: shape.resultingLayers[0].toGeoJSON().features[0],
          bounds: newBounds
        });

        // When the cut is finished, we fly to the new bounds.
        // This will open the panel with the form when the zoom stops.
        this.model.quad.map.once('zoomend', () => {
          if (!this.panel.isToggled()) {
            this.panel.show();
          }
        });

        this.model.quad.map.flyToBounds(newBounds);

      });

      let b = this.model.quad.paintingBounds;
      let rec = L.rectangle(b);
      rec.addTo(this.model.quad.map);
      this.set('newPoi', newPoi);
    },

    editPoi(poi) {
      this.get('highlightPoi').perform(poi);
      this.model.quad.map.pm.enableGlobalEditMode();
    },

    deletePoi(poi) {
      UIkit.modal.confirm(`Are you sure you want to delete ${poi.name}?`).then(() => {
        this.model.quad.get('pois').removeObject(poi);
        this.model.quad.save().then(() => {
          poi.destroyRecord().then(() => {
            UIkit.notification(`${poi.name} DELETED!`, 'success');
          }, error => {
            UIkit.notification(`ERROR deleting POI: ${error.message}`, 'danger');
          })
        }, error => {
          UIkit.notification(`ERROR saving Quad: ${error.message}`, 'danger');
        })
      }, function () {
        this.panel.show();
      });
    },

    deleteImage(poi, image) {
      UIkit.modal.confirm(`Are you sure you want to delete image?`).then(() => {
        poi.images.removeObject(image);
        poi.save().then(() => {
          image.destroyRecord().then(() => {
            UIkit.notification(`IMAGE DELETED!`, 'success');
            this.panel.show();
          }, error => {
            UIkit.notification(`ERROR deleting IMAGE: ${error.message}`, 'danger');
          })
        }, error => {
          UIkit.notification(`ERROR saving POI: ${error.message}`, 'danger');
        })
      }, function () {
        this.panel.show();
      });
    },

    newImage(poi) {
      let newImage = this.store.createRecord('image', {
        poi: poi
      });
      newImage.save().then(savedImage => {
        poi.images.pushObject(savedImage);
      })
    },

    cancel(poi) {
      if (poi.dirtyType === 'created') {
        this.model.pois.removeObject(poi);
        poi.destroy();
      }
      this.get('editReCenter').perform();
    },

    reorderPois(type, event) {
      const indices = {
        people: 100,
        landmarks: 200,
        changes: 300
      };
      let index = indices[type];
      for (let item of event.target.children) {
        let storeItem = this.store.peekRecord(
          'poi',
          item.attributes['data-id'].value
        );
        storeItem.setProperties({
          position: index
        });
        storeItem.save().then(() => {
          // cool
        }, error => {
          UIkit.notification(`ERROR REORDERING POIs: ${error.message}`, 'danger');
          return;
        });
        index++;
      }

      UIkit.notification('POIs reordered!', 'success');
    },

    relocatePoi(newPosition, poi) {
      poi.point.geometry.coordinates = [newPosition.lng, newPosition.lat];
    },

    polygonAdded(poi, event) {
      let layer = event.target.pm._layers[0];
      layer.off('pm:edit');
      layer.on('pm:edit', editEvent => {
        poi.setProperties({ tmpPolygon: editEvent.target.pm._layer.toGeoJSON() });
      });
      layer.pm.enable();
      this.get('showPanel').perform();
    },

    saveTour(tour) {
      tour.save();
    },

    deleteTour(tour) {
      tour.destroyRecord();
    },

    addPoiToTour(tour, poi) {
      let tourPois = tour.get('pois');
      tourPois.pushObject(poi);
      poi.setProperties({
        tourPosition: tourPois.length + 1
      });
      poi.save();
    }
  }
});

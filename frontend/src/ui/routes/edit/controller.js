import Controller from '@ember/controller';
import PaintingActionsMixin from "../../../utils/mixins/painting-actions/mixin";
import UIkit from 'uikit';
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

  actions: {
    newTour() {
      this.set('manageTours', false);
      let newTour = this.store.createRecord('tour');
      this.set('tourToEdit', newTour);
    },

    newPoiType(type) {
      this.set('newPoiType', type);
      this.model.quad.map.pm.Draw.Marker.enable();
    },
    // This is called when a new marker is added to the paining.
    newPoi(shape) {
      if (shape.shape !== 'Marker') {
        return;
      }
      this.set('managePois', false);
      this.model.quad.map.pm.Draw.Marker.disable();
      this.model.quad.map.pm.Draw.Cut.enable();
      let newPoint = shape.layer.toGeoJSON();
      newPoint.properties.type = this.get('newPoiType');

      let newPoi = this.store.createRecord('poi', {
        point: newPoint,
        quad: this.model
      });

      shape.layer.remove();

      // Add listener for when the POI has been cut out.
      this.model.quad.map.once('pm:cut', shape => {
        const newBounds = this.calcBounds(shape)
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

      let b = this.model.paintingLayer.getBounds();
      let rec = L.rectangle(b);
      rec.addTo(this.model.quad.map);
      this.set('newPoi', newPoi)
    },

    editPoi(poi) {
      this.get('highlightPoi').perform(poi);
      this.model.quad.map.pm.enableGlobalEditMode();
    },

    editReCenter() {
      this.model.quad.map.pm.disableGlobalEditMode();
      this.get('reCenter').perform();
    },

    savePoi(poi) {
      poi.images.forEach(image => {
        if (image.dirtyType) {
          image.save().then(() => {
            // Don't really need to do anything here.
          }, error => {
            UIkit.notification(`ERROR SAVING IMAGE ${error.message}`, 'danger');
          });  
        }
      });

      if (poi.tmpPolygon) {
        poi.set('polygon', poi.tmpPolygon);
        poi.set('tmpPolygon', null);
      }
  
      poi.save().then(() => {
        // This is a little hacky, but setting the POI to inactive removes it from the painting.
        // We add it back later by setting it to active. This will make sure it gets the proper
        // listeners for editing.
        poi.setProperties({ active: false });
        poi.save().then(() => {
          UIkit.notification(`${poi.name} SAVED!`, 'success');
          poi.setProperties({ active: true });
      }, error => {
          UIkit.notification(`ERROR SAVING QUAD: ${error.message}`, 'danger');
        });
      }, error => {
        UIkit.notification(`ERROR SAVING POI: ${error.message}`, 'danger');
      });
    },

    deletePoi(poi) {
      UIkit.modal.confirm(`Are you sure you want to delete ${poi.name}?`).then(() => {
        this.model.get('pois').removeObject(poi);
        this.model.save().then(() => {
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
      this.get('closePanel').perform();
    },

    reorderPois(type, event) {
      const indices = {
        people: 100,
        landmarks: 200,
        alterations: 300
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

    updatePolygon(updated, poi) {
      poi.setProperties({ polygon: updated });
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

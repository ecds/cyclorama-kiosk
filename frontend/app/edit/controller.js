import ApplicationController from '../application/controller';
import UIkit from 'uikit';
import { task, timeout, waitForEvent } from 'ember-concurrency';
import { action } from '@ember/object';
/* global L */

export default class EditController extends ApplicationController {
  newPoi = null;
  tourToEdit = null;
  // newPoiType = 'people';
  managePois = false;
  manageTours = false;

  @(task(function* (event) {
    this.set('activePanel', this.model.panel);
    let map = event.target;
      this.model.panel.setProperties({
        map
      });
    this.disableInteraction();

    // map.on('click', function(event){console.log(event)});

    yield waitForEvent(this. activePanel.map, 'moveend');

    this.enableInteraction();
    let allSet = yield timeout(300);
    return allSet;
  }))
  initMap;

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
  }

  @(task(function* (event) {
    yield this.initMap.perform(event);
    // Add listener for when a new poi is dropped on the painting.
    this.model.panel.map.on('pm:create', (shape) => { this.send('newPoi', shape) });
  }))
  initEditMap;

  @(task(function* (poi) {
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

    let newBounds = this.model.panel.map.getBounds();
    
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
      this.model.panel.get('pois').pushObject(poi);
      yield this.model.panel.save();
    } catch(error) {
      UIkit.notification(`ERROR SAVING QUAD: ${error.message}`, 'danger');
    } finally {
      //
    }
    
    // For some reason, we need to wait a bit before
    // re-enabling the edit mode.
    yield timeout(500);
    this.model.panel.map.pm.enableGlobalEditMode();
  }))
  savePoi;

  @(task(function* () {
    yield this.closePanel.perform();
    this.model.panel.map.pm.disableGlobalEditMode();
  }))
  editReCenter;

  @action  
  newTour() {
    this.set('manageTours', false);
    let newTour = this.store.createRecord('tour');
    this.set('tourToEdit', newTour);
  }

  @action
  newPoiType(type) {
    this.set('newPoiType', type);
    // Enabling pm.Draw.Marker adds a marker to be dropped.
    this.model.panel.map.pm.Draw.Marker.enable();
  }
  // This is called when a new marker is added to the paining.
  @action
  newPoi(shape) {
    if (!shape || shape.shape !== 'Marker') {
      return;
    }
    this.set('managePois', false);
    this.model.panel.map.pm.Draw.Marker.disable();
    this.model.panel.map.pm.Draw.Cut.enable();
    let newPoint = shape.layer.toGeoJSON();
    newPoint.properties.type = this.newPoiType;

    let newPoi = this.store.createRecord('poi', {
      point: newPoint,
      panel: this.model.panel,
      type: this.newPoiType
    });

    shape.layer.remove();

    // Add listener for when the POI has been cut out.
    this.model.panel.map.once('pm:cut', shape => {
      const newBounds = this.calcBounds(shape);
      newPoi.setProperties({
        polygon: shape.resultingLayers[0].toGeoJSON().features[0],
        bounds: newBounds
      });

      // When the cut is finished, we fly to the new bounds.
      // This will open the panel with the form when the zoom stops.
      this.model.panel.map.once('zoomend', () => {
        if (!this.panel.isToggled()) {
          this.panel.show();
        }
      });

      this.model.panel.map.flyToBounds(newBounds);

    });

    let b = this.model.panel.paintingBounds;
    let rec = L.rectangle(b);
    rec.addTo(this.model.panel.map);
    this.set('newPoi', newPoi);
  }

  @action
  editPoi(poi, event) {
    this.highlightPoi.perform(poi, event);
    this.model.panel.map.pm.enableGlobalEditMode();
  }

  @action
  deletePoi(poi) {
    UIkit.modal.confirm(`Are you sure you want to delete ${poi.name}?`).then(() => {
      this.model.panel.get('pois').removeObject(poi);
      this.model.panel.save().then(() => {
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
  }

  @action
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
  }

  @action
  newImage(poi) {
    let newImage = this.store.createRecord('image', {
      poi: poi
    });
    newImage.save().then(savedImage => {
      poi.images.pushObject(savedImage);
    })
  }

  @action
  cancel(poi) {
    if (poi.dirtyType === 'created') {
      this.model.pois.removeObject(poi);
      poi.destroy();
    }
    this.editReCenter.perform();
  }

  @action
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
  }

  @action
  relocatePoi(newPosition, poi) {
    poi.point.geometry.coordinates = [newPosition.lng, newPosition.lat];
  }

  @action
  polygonAdded(poi, event) {
    let layer = event.target.pm._layers[0];
    layer.off('pm:edit');
    layer.on('pm:edit', editEvent => {
      poi.setProperties({ tmpPolygon: editEvent.target.pm._layer.toGeoJSON() });
    });
    layer.pm.enable();
    this.showPanel.perform();
  }

  @action
  saveTour(tour) {
    tour.save();
  }

  @action
  deleteTour(tour) {
    tour.destroyRecord();
  }

  @action
  addPoiToTour(tour, poi) {
    let tourPois = tour.get('pois');
    tourPois.pushObject(poi);
    poi.setProperties({
      tourPosition: tourPois.length + 1
    });
    poi.save();
  }
}

import Route from '@ember/routing/route';
import { task } from 'ember-concurrency';

export default class KioskRoute extends Route {

  model(params) {
   return this.store.queryRecord('kiosk', { title: params.kiosk });
  }

  @(task(function* (data) {

    try {
      let error = this.store.createRecord('error', data);
      yield error.save();
      // yield fetch('http://otb.ecdsdev.org:3000/errors', {
      //   method: 'POST',
      //   headers: {
      //     'Accept': 'application/json',
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(data)
      // });
    } catch(e) {
      console.log(e);
    } finally {
      location.reload(true);
    }
  }))
  logError;
  
  setupController(controller, model) {
    // Call _super for default behavior
    this._super(controller, model);
    this.controllerFor('kiosk').set('model', model);
    fetch('/buttons.json').then(response => {
      response.json().then(data => {
        this.controllerFor('kiosk').set('buttons', data);
      });
    });
    model.panels.forEach(panel => {
      if (panel.opacity === 1) {
        this.controllerFor('kiosk').set('activePanel', panel);
      }
    });
  }

  afterModel(model) {
    const logError = this.get('logError');
    window.addEventListener("touchstart", () => {
      this.controllerFor('kiosk').get('resetTimer').perform()
    }, false);
    window.onerror = function myErrorHandler(message, fileName, lineNumber) {
      let data = {
        message,
        fileName,
        lineNumber,
        location: window.location.pathname
      }
      logError.perform(data).then(() => {
        return false;
      });
    }
    model.panels.forEach(panel => {
      if (panel.opacity === 1) {
        panel.setProperties({
          active: true
        });
        panel.pois.forEach(poi => {
          if (poi.point.properties.type == 'people') {
            poi.setProperties({ show: true });
          } else {
            poi.setProperties({ show: false });
          }
        });
      }
    });
  }
}

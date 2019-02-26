import Route from '@ember/routing/route';

export default class KioskRoute extends Route {
  model(params) {
   return this.store.queryRecord('kiosk', { title: params.kiosk });
  }
  
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
    window.addEventListener("touchstart", () => {
      this.controllerFor('kiosk').get('resetTimer').perform()
    }, false);
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

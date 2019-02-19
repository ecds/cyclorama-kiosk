import ApplicationController from '../application/controller';
import { set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { action, computed } from '@ember-decorators/object';
import UIkit from 'uikit';
import ENV from 'cyclorama-kiosk/config/environment'

export default class KioskController extends ApplicationController {
  tileHost = ENV.APP.TILE_HOST;
  group = null;

  resetTimer = task(function* () {
    this.set('screenSaver', false);
    yield timeout(120000);
    
    if (document.body.contains(document.getElementById('poi-slider'))) {
      document.getElementById('poi-slider').removeEventListener('beforeitemshow', this.get('resetTimer').perform());
    }
    // yield this.get('closePanel').perform();
    location.reload();
  }).restartable()

  watchScroll() {
    let poiContent = document.getElementsByClassName('poi-detail-content')[0];
    poiContent.addEventListener('scroll', () =>{
      this.get('resetTimer').perform()
    });
    // yield waitForEvent(poiContent, 'scroll', reset);
  }

  watchSlider() {
    if (!this.activePoi) return;
    UIkit.util.on('#poi-slider', 'beforeitemshow', event => {
      if (event.srcElement.className === 'uk-first-column') return;
      this.get('resetTimer').perform();
    });
  }

  highlightPoi = task(function* (poi) {
    this.set('showingTours', false);
    this.send('clearActive');
    // TODO: Fix this! Without this 1ms delay, the bottom nav buttons for the POI detail
    // get all messed up :(
    yield timeout(1);
    this.set('activePoi', poi);
    poi.setProperties({ active: true });
    yield this.get('flyToPoi').perform(poi);
    this.watchScroll();
    this.watchSlider();
  })

  reset = task(function* () {
    this.model.panels.forEach(panel => {
      panel.pois.forEach(poi => {
        poi.setProperties({
          active: false,
          show: false
        });
      })
    });
    // yield this.closePanel.perform();
    yield timeout(300);
    this.activePanel.pois.forEach(poi => {
      if (poi.point.properties.type == 'people') {
        poi.setProperties({ show: true });
      } else {
        poi.setProperties({ show: false });
      }
    })
  })

  highlightGroup = task(function* (group) {
    this.set('group', group);
    yield timeout(2400);
    this.set('group', null);
  })

  @action  
  switchPoiType(button) {
    if (button.active) {
      this.activePanel.pois.forEach(poi => {
        if (poi.point.properties.type === button.label){
          poi.setProperties({ show: false });
        }
      });
      set(button, 'active', false);
    } else {
      this.activePanel.pois.forEach(poi => {
        if (poi.point.properties.type === button.label){
          poi.setProperties({ show: true });
        }
      });
      set(button, 'active', true);
    }
  }

  switchPanel = task(function* () {
    this.model.panels.forEach(panel => {
      panel.setProperties({
        active: !panel.active
      });
      if (panel.active) {
        this.set('activePanel', panel);
        panel.setProperties({
          opacity: 1
        });
      } else {
        panel.setProperties({
          opacity: 0
        });
      }
      this.set('paintingSet', false);
      this.get('offsetCenter').perform();
    });

    yield this.get('reset').perform();
    yield this.get('closePanel').perform();
    this.addMiniMap();
  })

  @computed('activePanel')
  get scoot() {
    if ((this.model.title === '4') && (this.activePanel.title === 'p1')) {
      return 'left';
    } else if ((this.model.title === '4') && (this.activePanel.title === 'p5')) {
      return 'right';
    } else if ((this.model.title === '1') && (this.activePanel.title === 'p4')) {
      return 'right';
    } else if ((this.model.title === '1') && (this.activePanel.title === 'p5')) {
      return 'left';
    } else {
      return null;
    }
  }
}

import ApplicationController from '../application/controller';
import { action, set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { computed } from '@ember/object';
import UIkit from 'uikit';
import ENV from 'frontend/config/environment'

export default class KioskController extends ApplicationController {
  tileHost = ENV.APP.TILE_HOST;
  imagePath = ENV.APP.IMAGE_ROOT_PATH;
  group = null;

  @(task(function* () {
    this.set('screenSaver', false);
    yield timeout(120000);
    
    if (document.body.contains(document.getElementById('poi-slider'))) {
      document.getElementById('poi-slider').removeEventListener('beforeitemshow', this.resetTimer.perform());
    }
    // TODO Consider doing a reload. Maybe a separate, longer, timer.
    // location.reload();
    yield this.closePanel.perform();
  }).restartable())
  resetTimer;

  watchScroll() {
    let poiContent = document.getElementsByClassName('poi-detail-content')[0];
    poiContent.addEventListener('scroll', () =>{
      this.resetTimer.perform();
    });
  }

  watchSlider() {
    if (!this.activePoi) return;
    UIkit.util.on('#poi-slider', 'beforeitemshow', event => {
      if (event.srcElement.className === 'uk-first-column') return;
      this.resetTimer.perform();
    });
  }

  @(task(function* (poi) {
    this.set('showingTours', false);
    this.send('clearActive');
    // TODO: Fix this! Without this 1ms delay, the bottom nav buttons for the POI detail
    // get all messed up :(
    yield timeout(1);
    this.set('activePoi', poi);
    poi.setProperties({ active: true });
    yield this.flyToPoi.perform(poi);
    yield timeout(300);
    this.watchScroll();
    this.watchSlider();
  }))
  highlightPoi;

  @(task(function* () {
    this.model.panels.forEach(panel => {
      panel.pois.forEach(poi => {
        poi.setProperties({
          active: false,
          show: false
        });
      })
    });
    yield timeout(300);
    this.activePanel.pois.forEach(poi => {
      if (poi.point.properties.type == 'people') {
        poi.setProperties({ show: true });
      } else {
        poi.setProperties({ show: false });
      }
    })
  }))
  reset;

  @(task(function* (group) {
    this.set('group', group);
    yield timeout(2400);
    this.set('group', null);
  }).restartable())
  highlightGroup;

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

  @(task(function* () {
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
      this.offsetCenter.perform();
    });

    yield this.reset.perform();
    yield this.closePanel.perform();
    this.addMiniMap();
  }))
  switchPanel;

  // FIXME: This is backwards now that the order of the kiosks got flipped.
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

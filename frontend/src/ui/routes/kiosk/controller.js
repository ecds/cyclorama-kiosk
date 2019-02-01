import ApplicationController from '../application/controller';
import { set } from '@ember/object';
import { task, timeout } from 'ember-concurrency';
import { action, computed } from '@ember-decorators/object';
import UIkit from 'uikit';

export default class KioskController extends ApplicationController {
  resetTimer = task(function* () {
    yield timeout(90000);
    if (!this.activePoi) return;
    document.getElementById('poi-slider').removeEventListener('beforeitemshow', this.get('resetTimer').perform());
    return yield this.get('closePanel').perform();
  }).restartable()

  watchScroll() {
    // let reset = yield this.get('resetTimer').perform();
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
    // UIkit.util.off(document.getElementById('poi-slider'), 'itemshown', this.get('resetTimer').perform());
  }

  highlightPoi = task(function* (poi) {
    this.set('showingTours', false);
    // this.removeMinMap();
    this.send('clearActive');
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
    // if (this.model.pan === 'left') {
    //   this.model.setProperties({
    //     pan: 'none'
    //   });
    // } else {
    //   this.model.setProperties({
    //     pan: 'left'
    //   });
    // }
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
    });
    // if (this.activePanel.title == 'p5b') {
    //   if (this.model.pan === 'left') {
    //     this.model.setProperties({
    //       pan: 'right'
    //     });
    //   }
    // }
    yield this.get('reset').perform()
    this.addMiniMap();
  })

  @computed('activePanel')
  get scoot() {
    if ((this.model.title === '4') && (this.activePanel.title === 'p4')) {
      return 'right';
    } else if ((this.model.title === '4') && (this.activePanel.title === 'p5')) {
      return 'left';
    } else if ((this.model.title === '1') && (this.activePanel.title === 'p1')) {
      return 'left';
    } else if ((this.model.title === '1') && (this.activePanel.title === 'p5')) {
      return 'right';
    } else {
      return null;
    }
  }
}
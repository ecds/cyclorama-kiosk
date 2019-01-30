import Controller from '@ember/controller';
import { set } from '@ember/object';
import PaintingActionsMixin from "../../../utils/mixins/painting-actions/mixin";
import { task, timeout } from 'ember-concurrency';
import UIkit from 'uikit';

export default Controller.extend(PaintingActionsMixin, {
  resetTimer: task(function* () {
    yield timeout(90000);
    document.getElementById('poi-slider').removeEventListener('beforeitemshow', this.get('resetTimer').perform());
    return yield this.get('closePanel').perform();
  }).restartable(),

  watchScroll() {
    // let reset = yield this.get('resetTimer').perform();
    let poiContent = document.getElementsByClassName('poi-detail-content')[0];
    poiContent.addEventListener('scroll', () =>{
      this.get('resetTimer').perform()
    });
    // yield waitForEvent(poiContent, 'scroll', reset);
  },

  watchSlider() {
    UIkit.util.on('#poi-slider', 'beforeitemshow', event => {
      if (event.srcElement.className === 'uk-first-column') return;
      this.get('resetTimer').perform();
    });
    // UIkit.util.off(document.getElementById('poi-slider'), 'itemshown', this.get('resetTimer').perform());
  },

  highlightPoi: task(function* (poi) {
    this.set('showingTours', false);
    // this.removeMinMap();
    this.send('clearActive');
    this.set('activePoi', poi);
    poi.setProperties({ active: true });
    yield this.get('flyToPoi').perform(poi);
    this.watchScroll();
    this.watchSlider();
  }),

  actions: {
    switchPoiType(button) {
      if (button.active) {
        this.model.quad.pois.forEach(poi => {
          if (poi.point.properties.type === button.label){
            poi.setProperties({ show: false });
          }
        });
        set(button, 'active', false);
      } else {
        this.model.quad.pois.forEach(poi => {
          if (poi.point.properties.type === button.label){
            poi.setProperties({ show: true });
          }
        });
        set(button, 'active', true);
      }
    },

    showTours() {
      this.set('showingTours', true);
    },

    hideTours() {
      this.set('showingTours', false);
    },

    viewReCenter() {
      this.get('reCenter').perform();
    }
  }
});

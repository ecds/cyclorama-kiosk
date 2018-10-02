import Controller from '@ember/controller';
import { set } from '@ember/object';
import PaintingActionsMixin from "../../../utils/mixins/painting-actions/mixin";
// import UIkit from 'uikit';

export default Controller.extend(PaintingActionsMixin, {
  actions: {
    switchPoiType(button) {
      this.model.pois.forEach(poi => {
        if (poi.point.properties.type === button.label){
          poi.setProperties({ show: true });
        } else {
          poi.setProperties({ active: false });
          poi.setProperties({ show: false });
        }
      }),
      this.buttons.forEach(b => {
        set(b, 'active', false);
      });
      set(button, 'active', true);
    },

    showTours() {
      this.set('showingTours', true);
    },

    hideTours() {
      this.set('showingTours', false);
    },

    viewReCenter() {
      this.send('reCenter');
    },

    setPaintingView(event) {
      this.send('setPainting', event);
    }
  }
});

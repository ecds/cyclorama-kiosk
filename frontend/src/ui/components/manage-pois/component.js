import Component from '@ember/component';
import { set } from '@ember/object';
import UIkit from 'uikit';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),

  didInsertElement() {
    this.model.map.pm.disableGlobalEditMode();
    UIkit.offcanvas(document.getElementById('poi-detail')).show();
    // UIkit.util.on(document.getElementById('poi-detail'), 'hidden', () => { this.set('managePois', false) });
  },

  actions: {
    reorder(type, event) {
      this.reorderPois(type, event);
    },

    newPoi(type) {
      UIkit.offcanvas(document.getElementById('poi-detail')).hide();
      this.new(type)
    },

    editPoi(poi) {
      set(this, 'managePois', false);
      this.highlight(poi);
    },

    deletePoi(poi) {
      this.delete(poi);
    }
  }
});

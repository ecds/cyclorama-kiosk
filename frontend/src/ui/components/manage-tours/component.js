import Component from '@ember/component';
import { set } from '@ember/object';
import UIkit from 'uikit';
import { service } from '@ember-decorators/service';
import { action } from '@ember-decorators/object';

export default class ManageTourComponent extends Component {
  @service store

  didInsertElement() {
    UIkit.offcanvas(document.getElementById('poi-detail')).show();
    // UIkit.util.on(document.getElementById('poi-detail'), 'hidden', () => { this.set('manageTours', false) });
  }

  @action
  reorder(event) {
    this.reorderTours(event);
  }

  @action
  tourToEdit(type) {
    UIkit.offcanvas(document.getElementById('poi-detail')).hide();
    this.new(type)
  }

  @action
  editTour(tour) {
    set(this, 'manageTours', false);
    this.set('tourToEdit', tour);
  }

  @action
  deleteTour(tour) {
    this.delete(tour);
  }
}

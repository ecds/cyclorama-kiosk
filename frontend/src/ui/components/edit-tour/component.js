import Component from '@ember/component';
import { action } from '@ember-decorators/object';

export default class EditTourComponent extends Component {
  @action
  addToTour(tour, poi) {
    this.addPoi(tour, poi);
  }
}

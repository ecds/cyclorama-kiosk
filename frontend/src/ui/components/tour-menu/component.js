import Component from '@ember/component';

export default Component.extend({
  classNames: ['tour-menus', 'uk-modal', 'uk-open'],
  actions: {
    startTour(tour) {
      this.set('showingTours', false);
      this.start(tour.sortedPois.firstObject);
    }
  }
});

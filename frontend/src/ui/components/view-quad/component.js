import Component from '@ember/component';

export default Component.extend({
  actions: {
    goTo(poi) {
      this.highlightPoi(poi);
    }
  }
});

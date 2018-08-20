import Component from '@ember/component';
import UIkit from 'uikit';

const noop = () => {};

export default Component.extend({
  attributeBindings: ['id', 'ukOffcanvas:uk-offcanvas', 'mode', 'bgClose:bg-close'],
  id: 'poi-detail',
  ukOffcanvas: true,
  mode: 'push',
  bgClose: 'false',

  setEvents() {
    let events = {
      beforeshow: this.getWithDefault("on-beforeshow", noop),
      show: this.getWithDefault("on-show", noop),
      shown: this.getWithDefault("on-shown", noop),
      beforehide: this.getWithDefault("on-beforehide", noop),
      hide: this.getWithDefault("on-hide", noop),
      hidden: this.getWithDefault("on-hidden", noop)
    };

    for (let event in events) {
      UIkit.util.on(this.element, event, events[event]);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.setEvents();
  }
});

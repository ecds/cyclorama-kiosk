import Component from '@ember/component';
import UIkit from 'uikit';

const noop = () => {};

export default Component.extend({
  classNames: ['uk-offcanvas-slide', 'uk-grid', 'uk-child-width-1-1', 'uk-margin-remove'],
  attributeBindings: ['id', 'ukOffcanvas:uk-offcanvas', 'mode', 'bgClose:bg-close'],
  id: 'poi-detail',
  ukOffcanvas: true,
  mode: 'slide',
  bgClose: 'false',

  /* eslint-disable ember/no-get */
  setEvents() {
    let events = {
      beforeshow: (this.get("on-beforeshow") === undefined ? noop : this.get("on-beforeshow")),
      show: (this.get("on-show") === undefined ? noop : this.get("on-show")),
      shown: (this.get("on-shown") === undefined ? noop : this.get("on-shown")),
      beforehide: (this.get("on-beforehide") === undefined ? noop : this.get("on-beforehide")),
      hide: (this.get("on-hide") === undefined ? noop : this.get("on-hide")),
      hidden: (this.get("on-hidden") === undefined ? noop : this.get("on-hidden"))
    };

    for (let event in events) {
      UIkit.util.on(this.element, event, events[event]);
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.setEvents();
    this.set('panel', UIkit.offcanvas(this.element));
  }
});

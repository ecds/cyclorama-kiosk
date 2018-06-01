define('ember-uikit/components/uk-sortable', ['exports', 'uikit'], function (exports, _uikit) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  // empty function as default event handler
  const noop = () => {};

  exports.default = Ember.Component.extend({
    classNames: ['uk-sortable'],
    attributeBindings: ['group', 'animationDuration:animation', 'threshold', 'clsItem:cls-item', 'clsPlaceholder:cls-placeholder', 'clsDrag:cls-drag', 'clsDragState:cls-drag-state', 'clsBase:cls-base', 'clsNoDrag:cls-no-drag', 'clsEmpty:cls-empty', 'clsCustom:cls-custom', 'handle', 'ukSortable:uk-sortable'],

    // Component Options
    group: null,
    animationDuration: null,
    threshold: null,
    clsItem: null,
    clsPlaceholder: null,
    clsDrag: null,
    clsDragState: null,
    clsBase: null,
    clsNoDrag: null,
    clsEmpty: null,
    clsCustom: null,
    handle: null,

    ukSortable: '',

    setEvents() {
      let events = {
        start: this.getWithDefault('on-start', noop),
        stop: this.getWithDefault('on-stop', noop),
        moved: this.getWithDefault('on-moved', noop),
        added: this.getWithDefault('on-added', noop),
        removed: this.getWithDefault('on-removed', noop)
      };

      for (let event in events) {
        _uikit.default.util.on(this.element, event, events[event]);
      }
    },

    didInsertElement() {
      this._super(...arguments);
      this.setEvents();
    }
  });
});
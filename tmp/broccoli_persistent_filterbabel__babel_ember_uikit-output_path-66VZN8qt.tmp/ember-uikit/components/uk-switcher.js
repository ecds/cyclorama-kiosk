define('ember-uikit/components/uk-switcher', ['exports', 'ember-uikit/templates/components/uk-switcher'], function (exports, _ukSwitcher) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _ukSwitcher.default,

    animation: '',

    contentId: Ember.computed('elementId', function () {
      return `uk-switcher-content-${this.get('elementId')}`;
    })
  });
});
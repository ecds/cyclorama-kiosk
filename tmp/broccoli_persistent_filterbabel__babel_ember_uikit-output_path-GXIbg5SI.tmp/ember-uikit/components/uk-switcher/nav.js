define('ember-uikit/components/uk-switcher/nav', ['exports', 'ember-uikit/templates/components/uk-switcher/nav'], function (exports, _nav) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.TYPES = undefined;
  const TYPES = exports.TYPES = {
    TAB: { name: 'tab', componentName: 'uk-tab' },
    SUBNAV: { name: 'subnav', componentName: 'uk-subnav' }
  };

  exports.default = Ember.Component.extend({
    layout: _nav.default,

    type: TYPES.TAB,

    tagName: '',

    componentName: Ember.computed('type', function () {
      return TYPES[Object.keys(TYPES).find(k => TYPES[k].name === this.get('type'))].componentName;
    })
  });
});
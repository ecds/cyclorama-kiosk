define('ember-uikit/components/uk-tab', ['exports', 'ember-uikit/templates/components/uk-tab', 'ember-uikit/mixins/switcher', 'ember-uikit/mixins/flex'], function (exports, _ukTab, _switcher, _flex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_switcher.default, _flex.default, {
    layout: _ukTab.default,

    init() {
      this._super(...arguments);

      this.set('attributeBindings', this.get('attributeBindings').filter(i => i !== 'ukSwitcher:uk-switcher'));
    },

    tagName: 'ul',

    attributeBindings: ['ukSwitcher:uk-tab'],

    classNames: ['uk-tab'],

    classNameBindings: ['left:uk-tab-left', 'right:uk-tab-right', 'bottom:uk-tab-bottom'],

    left: false,
    right: false,
    bottom: false
  });
});
define('ember-uikit/components/uk-subnav/item', ['exports', 'ember-uikit/templates/components/uk-subnav/item', 'ember-uikit/mixins/evented'], function (exports, _item, _evented) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_evented.default, {
    layout: _item.default,

    tagName: 'li',

    classNameBindings: ['active:uk-active', 'disabled:uk-disabled'],

    active: false,

    disabled: false
  });
});
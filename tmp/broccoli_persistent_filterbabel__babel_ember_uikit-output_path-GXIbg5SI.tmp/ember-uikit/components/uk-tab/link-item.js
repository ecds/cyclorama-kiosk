define('ember-uikit/components/uk-tab/link-item', ['exports', 'ember-uikit/templates/components/uk-tab/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.LinkComponent.extend({
    layout: _item.default,

    tagName: 'li',

    activeClass: 'uk-active',

    classNameBindings: ['disabled:uk-disabled'],

    disabled: false
  });
});
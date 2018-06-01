define('ember-uikit/components/uk-list/item', ['exports', 'ember-uikit/templates/components/uk-list/item'], function (exports, _item) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _item.default,

    tagName: 'li'
  });
});
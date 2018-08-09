define('ember-uikit/components/uk-badge', ['exports', 'ember-uikit/templates/components/uk-badge'], function (exports, _ukBadge) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _ukBadge.default,

    tagName: 'span',

    classNames: ['uk-badge']
  });
});
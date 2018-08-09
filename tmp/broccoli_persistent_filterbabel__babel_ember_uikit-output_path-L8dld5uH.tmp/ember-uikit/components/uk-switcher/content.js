define('ember-uikit/components/uk-switcher/content', ['exports', 'ember-uikit/templates/components/uk-switcher/content'], function (exports, _content) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _content.default,

    tagName: 'ul',

    classNames: ['uk-switcher']
  });
});
define('ember-uikit/components/uk-card/title', ['exports', 'ember-uikit/templates/components/uk-card/title'], function (exports, _title) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _title.default,

    tagName: 'h1',

    classNames: ['uk-card-title']
  });
});
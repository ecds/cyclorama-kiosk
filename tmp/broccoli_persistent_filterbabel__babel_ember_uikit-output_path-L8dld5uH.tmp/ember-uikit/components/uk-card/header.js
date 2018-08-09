define('ember-uikit/components/uk-card/header', ['exports', 'ember-uikit/templates/components/uk-card/header'], function (exports, _header) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _header.default,

    classNames: ['uk-card-header']
  });
});
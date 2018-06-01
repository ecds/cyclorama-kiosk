define('ember-uikit/components/uk-card/body', ['exports', 'ember-uikit/templates/components/uk-card/body'], function (exports, _body) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _body.default,

    classNames: ['uk-card-body']
  });
});
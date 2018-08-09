define('ember-uikit/components/uk-spinner', ['exports', 'ember-uikit/templates/components/uk-spinner'], function (exports, _ukSpinner) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _ukSpinner.default,

    tagName: 'div',

    attributeBindings: ['spinner:uk-spinner', 'ratio'],

    spinner: '',

    ratio: 1
  });
});
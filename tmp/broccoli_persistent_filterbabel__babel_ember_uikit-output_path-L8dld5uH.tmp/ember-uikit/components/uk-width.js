define('ember-uikit/components/uk-width', ['exports', 'ember-uikit/templates/components/uk-width', 'ember-uikit/mixins/width'], function (exports, _ukWidth, _width) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const UkWidthComponent = Ember.Component.extend(_width.default, {
    layout: _ukWidth.default
  });

  UkWidthComponent.reopenClass({
    positionalParams: ['width']
  });

  exports.default = UkWidthComponent;
});
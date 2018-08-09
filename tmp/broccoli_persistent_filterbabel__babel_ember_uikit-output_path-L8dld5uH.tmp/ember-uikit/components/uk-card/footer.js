define('ember-uikit/components/uk-card/footer', ['exports', 'ember-uikit/templates/components/uk-card/footer'], function (exports, _footer) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend({
    layout: _footer.default,

    classNames: ['uk-card-footer']
  });
});
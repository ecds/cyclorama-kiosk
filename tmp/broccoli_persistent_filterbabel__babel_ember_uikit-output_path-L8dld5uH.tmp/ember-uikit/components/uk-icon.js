define('ember-uikit/components/uk-icon', ['exports', 'ember-uikit/templates/components/uk-icon'], function (exports, _ukIcon) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const UkIconComponent = Ember.Component.extend({
    layout: _ukIcon.default,

    tagName: 'span',

    attributeBindings: ['ukIcon:uk-icon', 'icon', 'ratio'],

    icon: '',

    ratio: 1,

    ukIcon: ''
  });

  UkIconComponent.reopenClass({
    positionalParams: ['icon']
  });

  exports.default = UkIconComponent;
});
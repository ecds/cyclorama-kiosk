define('ember-uikit/mixins/switcher', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Mixin.create({
    attributeBindings: ['ukSwitcher:uk-switcher', 'connect', 'animation', 'animationDuration:duration', 'swiping'],

    contentId: '',
    animation: '',
    animationDuration: 200,
    swiping: false,
    ukSwitcher: '',

    connect: Ember.computed('contentId', function () {
      let id = this.get('contentId');

      return Ember.isEmpty(id) ? '' : `#${id}`;
    })
  });
});
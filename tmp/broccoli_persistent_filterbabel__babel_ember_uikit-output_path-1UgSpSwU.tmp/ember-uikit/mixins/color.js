define('ember-uikit/mixins/color', ['exports', 'ember-uikit/-private/validated-computed-property'], function (exports, _validatedComputedProperty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.COLOR_OPTIONS = undefined;
  const COLOR_OPTIONS = exports.COLOR_OPTIONS = {
    NONE: '',
    DEFAULT: 'default',
    MUTED: 'muted',
    PRIMARY: 'primary',
    SECONDARY: 'secondary',
    SUCCESS: 'success',
    WARNING: 'warning',
    DANGER: 'danger',
    LINK: 'link',
    TEXT: 'text'
  };

  exports.default = Ember.Mixin.create({
    COLOR_OPTIONS: Object.values(COLOR_OPTIONS),

    classNameBindings: ['colorClass'],

    colorTemplate: 'uk-$color$-background',

    color: (0, _validatedComputedProperty.default)('_color', 'color', 'COLOR_OPTIONS'),

    colorClass: Ember.computed('color', function () {
      return this.get('color') && this.get('colorTemplate').replace(/\$color\$/, this.get('color'));
    })
  });
});
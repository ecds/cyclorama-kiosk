define('ember-uikit/mixins/size', ['exports', 'ember-uikit/-private/validated-computed-property'], function (exports, _validatedComputedProperty) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.SIZE_OPTIONS = undefined;
  const SIZE_OPTIONS = exports.SIZE_OPTIONS = {
    DEFAULT: '',
    SMALL: 'small',
    LARGE: 'large'
  };

  exports.default = Ember.Mixin.create({
    SIZE_OPTIONS: Object.values(SIZE_OPTIONS),

    classNameBindings: ['sizeClass'],

    sizeTemplate: 'uk-size-$size$',

    size: (0, _validatedComputedProperty.default)('_size', 'size', 'SIZE_OPTIONS'),

    sizeClass: Ember.computed('_size', function () {
      return this.get('size') && this.get('sizeTemplate').replace(/\$size\$/, this.get('size'));
    })
  });
});
define('ember-uikit/mixins/flex', ['exports', 'ember-uikit/-private/validated-computed-property', 'ember-uikit/-private/media'], function (exports, _validatedComputedProperty, _media) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.FLEX_WRAP_ALIGNMENT_OPTIONS = exports.FLEX_WRAP_OPTIONS = exports.FLEX_DIRECTION_OPTIONS = exports.FLEX_VERTICAL_OPTIONS = exports.FLEX_HORIZONTAL_OPTIONS = undefined;
  const FLEX_HORIZONTAL_OPTIONS = exports.FLEX_HORIZONTAL_OPTIONS = {
    LEFT: 'left',
    CENTER: 'center',
    RIGHT: 'right',
    BETWEEN: 'between',
    AROUND: 'around'
  };

  const FLEX_VERTICAL_OPTIONS = exports.FLEX_VERTICAL_OPTIONS = {
    STRETCH: 'stretch',
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom'
  };

  const FLEX_DIRECTION_OPTIONS = exports.FLEX_DIRECTION_OPTIONS = {
    ROW: 'row',
    ROW_REVERSE: 'row-reverse',
    COLUMN: 'column',
    COLUMN_REVERSE: 'column-reverse'
  };

  const FLEX_WRAP_OPTIONS = exports.FLEX_WRAP_OPTIONS = {
    WRAP: 'wrap',
    WRAP_REVERSE: 'wrap-reverse',
    NOWRAP: 'nowrap'
  };

  const FLEX_WRAP_ALIGNMENT_OPTIONS = exports.FLEX_WRAP_ALIGNMENT_OPTIONS = {
    STRETCH: 'stretch',
    BETWEEN: 'between',
    AROUND: 'around',
    TOP: 'top',
    MIDDLE: 'middle',
    BOTTOM: 'bottom'
  };

  exports.default = Ember.Mixin.create({
    MEDIA_OPTIONS: Object.values(_media.default),
    FLEX_HORIZONTAL_OPTIONS: Object.values(FLEX_HORIZONTAL_OPTIONS),
    FLEX_VERTICAL_OPTIONS: Object.values(FLEX_VERTICAL_OPTIONS),
    FLEX_DIRECTION_OPTIONS: Object.values(FLEX_DIRECTION_OPTIONS),
    FLEX_WRAP_OPTIONS: Object.values(FLEX_WRAP_OPTIONS),
    FLEX_WRAP_ALIGNMENT_OPTIONS: Object.values(FLEX_WRAP_ALIGNMENT_OPTIONS),

    classNameBindings: ['flex:uk-flex', 'flexInline:uk-flex-inline', 'flexVerticalClass', 'flexHorizontalClass', 'flexDirectionClass', 'flexWrapClass', 'flexWrapAlignmentClass'],

    flex: false,
    flexInline: false,

    flexHorizontal: (0, _validatedComputedProperty.default)('_flexHorizontal', 'flexHorizontal', 'FLEX_HORIZONTAL_OPTIONS'),
    flexVertical: (0, _validatedComputedProperty.default)('_flexVertical', 'flexVertical', 'FLEX_VERTICAL_OPTIONS'),
    flexDirection: (0, _validatedComputedProperty.default)('_flexDirection', 'flexDirection', 'FLEX_DIRECTION_OPTIONS'),
    flexWrap: (0, _validatedComputedProperty.default)('_flexWrap', 'flexWrap', 'FLEX_WRAP_OPTIONS'),
    flexWrapAlignment: (0, _validatedComputedProperty.default)('_flexWrapAlignment', 'flexWrapAlignment', 'FLEX_WRAP_ALIGNMENT_OPTIONS'),

    flexHorizontalClass: Ember.computed('flexHorizontal', function () {
      return this.get('flexHorizontal') && `uk-flex-${this.get('flexHorizontal')}`;
    }),
    flexVerticalClass: Ember.computed('flexVertical', function () {
      return this.get('flexVertical') && `uk-flex-${this.get('flexVertical')}`;
    }),
    flexDirectionClass: Ember.computed('flexDirection', function () {
      return this.get('flexDirection') && `uk-flex-${this.get('flexDirection')}`;
    }),
    flexWrapClass: Ember.computed('flexWrap', function () {
      return this.get('flexWrap') && `uk-flex-${this.get('flexWrap')}`;
    }),
    flexWrapAlignmentClass: Ember.computed('flexWrapAlignment', function () {
      return this.get('flexWrapAlignment') && `uk-flex-wrap-${this.get('flexWrapAlignment')}`;
    })
  });
});
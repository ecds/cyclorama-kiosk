define('ember-uikit/mixins/width', ['exports', 'ember-uikit/-private/validated-computed-property', 'ember-uikit/-private/media'], function (exports, _validatedComputedProperty, _media) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.WIDTH_OPTIONS = exports.SPECIAL_OPTIONS = exports.FIXED_OPTIONS = exports.GRID_OPTIONS = exports.GRID_NUMBERS = exports.MAX_GRID = exports.gcd = undefined;
  const gcd = exports.gcd = (a, b) => a % b === 0 ? b : gcd(b, a % b);

  const MAX_GRID = exports.MAX_GRID = 6;

  const GRID_NUMBERS = exports.GRID_NUMBERS = [...new Array(MAX_GRID).keys()].map(n => n + 1);

  const GRID_OPTIONS = exports.GRID_OPTIONS = Array.from(new Set(GRID_NUMBERS.reduce((all, of) => {
    return [...all, ...GRID_NUMBERS.filter(n => of >= n).map(n => {
      return `${n / gcd(n, of)}-${of / gcd(n, of)}`;
    })];
  }, []))).reduce((obj, val) => Object.assign(obj, { [val.replace(/-/, '_OF_')]: val }), {});

  const FIXED_OPTIONS = exports.FIXED_OPTIONS = {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large',
    XLARGE: 'xlarge',
    XXLARGE: 'xxlarge'
  };

  const SPECIAL_OPTIONS = exports.SPECIAL_OPTIONS = {
    AUTO: 'auto',
    EXPAND: 'expand'
  };

  const WIDTH_OPTIONS = exports.WIDTH_OPTIONS = Object.assign({}, GRID_OPTIONS, FIXED_OPTIONS, SPECIAL_OPTIONS);

  exports.default = Ember.Mixin.create({
    WIDTH_OPTIONS: Object.values(WIDTH_OPTIONS),
    MEDIA_OPTIONS: Object.values(_media.default),

    classNameBindings: ['widthClass'],

    _widthTemplate: 'uk-width-$width$',

    width: (0, _validatedComputedProperty.validatedArrayComputedProperty)('_width', 'width', 'WIDTH_OPTIONS', 'MEDIA_OPTIONS', ' '),

    widthClass: Ember.computed('width', function () {
      return this.get('width') && this.get('width').split(' ').map(w => this.get('_widthTemplate').replace(/\$width\$/, w)).join(' ');
    })
  });
});
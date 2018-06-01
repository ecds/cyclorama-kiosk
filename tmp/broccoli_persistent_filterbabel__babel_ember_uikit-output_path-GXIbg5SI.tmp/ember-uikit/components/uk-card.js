define('ember-uikit/components/uk-card', ['exports', 'ember-uikit/templates/components/uk-card', 'ember-uikit/mixins/color', 'ember-uikit/mixins/size', 'ember-uikit/mixins/width'], function (exports, _ukCard, _color, _size, _width) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.CARD_COLOR_OPTIONS = undefined;
  const CARD_COLOR_OPTIONS = exports.CARD_COLOR_OPTIONS = [_color.COLOR_OPTIONS.DEFAULT, _color.COLOR_OPTIONS.PRIMARY, _color.COLOR_OPTIONS.SECONDARY];

  exports.default = Ember.Component.extend(_color.default, _size.default, _width.default, {
    COLOR_OPTIONS: CARD_COLOR_OPTIONS,

    _color: _color.COLOR_OPTIONS.DEFAULT,

    layout: _ukCard.default,

    colorTemplate: 'uk-card-$color$',

    sizeTemplate: 'uk-card-$size$',

    classNames: ['uk-card'],

    classNameBindings: ['hover:uk-card-hover'],

    hover: false
  });
});
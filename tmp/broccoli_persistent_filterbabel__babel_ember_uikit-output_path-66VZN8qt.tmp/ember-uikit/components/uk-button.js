define('ember-uikit/components/uk-button', ['exports', 'ember-uikit/templates/components/uk-button', 'ember-uikit/mixins/width', 'ember-uikit/mixins/size', 'ember-uikit/mixins/color', 'ember-uikit/mixins/evented'], function (exports, _ukButton, _width, _size, _color, _evented) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.BUTTON_COLOR_OPTIONS = undefined;
  const BUTTON_COLOR_OPTIONS = exports.BUTTON_COLOR_OPTIONS = [_color.COLOR_OPTIONS.DEFAULT, _color.COLOR_OPTIONS.PRIMARY, _color.COLOR_OPTIONS.SECONDARY, _color.COLOR_OPTIONS.LINK, _color.COLOR_OPTIONS.TEXT];

  exports.default = Ember.Component.extend(_color.default, _width.default, _size.default, _evented.default, {
    COLOR_OPTIONS: BUTTON_COLOR_OPTIONS,

    _color: _color.COLOR_OPTIONS.DEFAULT,

    layout: _ukButton.default,

    tagName: 'button',

    colorTemplate: 'uk-button-$color$',

    sizeTemplate: 'uk-button-$size$',

    classNames: ['uk-button'],

    classNameBindings: ['active:uk-active'],

    attributeBindings: ['disabled', 'type'],

    label: '',

    type: 'button',

    disabled: false,

    active: false,

    loading: false
  });
});
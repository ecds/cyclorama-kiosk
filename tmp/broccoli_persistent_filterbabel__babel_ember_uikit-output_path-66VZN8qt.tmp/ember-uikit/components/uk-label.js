define('ember-uikit/components/uk-label', ['exports', 'ember-uikit/templates/components/uk-label', 'ember-uikit/mixins/color', 'ember-uikit/mixins/width'], function (exports, _ukLabel, _color, _width) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.LABEL_COLOR_OPTIONS = undefined;
  const LABEL_COLOR_OPTIONS = exports.LABEL_COLOR_OPTIONS = ['', _color.COLOR_OPTIONS.SUCCESS, _color.COLOR_OPTIONS.WARNING, _color.COLOR_OPTIONS.DANGER];

  exports.default = Ember.Component.extend(_color.default, _width.default, {
    COLOR_OPTIONS: LABEL_COLOR_OPTIONS,

    layout: _ukLabel.default,

    tagName: 'span',

    classNames: ['uk-label'],

    colorTemplate: 'uk-label-$color$'
  });
});
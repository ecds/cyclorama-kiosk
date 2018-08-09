define('ember-uikit/components/uk-list', ['exports', 'ember-uikit/templates/components/uk-list', 'ember-uikit/mixins/width'], function (exports, _ukList, _width) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_width.default, {
    layout: _ukList.default,

    tagName: 'ul',

    classNames: ['uk-list'],

    classNameBindings: ['divider:uk-list-divider', 'striped:uk-list-striped', 'bullet:uk-list-bullet', 'large:uk-list-large'],

    divider: false,

    striped: false,

    bullet: false,

    large: false
  });
});
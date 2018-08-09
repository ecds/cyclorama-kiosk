define('ember-uikit/components/uk-subnav', ['exports', 'ember-uikit/templates/components/uk-subnav', 'ember-uikit/mixins/flex'], function (exports, _ukSubnav, _flex) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = Ember.Component.extend(_flex.default, {
    layout: _ukSubnav.default,

    tagName: 'ul',

    classNames: ['uk-subnav'],

    classNameBindings: ['divider:uk-subnav-divider', 'pill:uk-subnav-pill'],

    divider: false,

    pill: false
  });
});
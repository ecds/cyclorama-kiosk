define('ember-font-awesome/components/fa-icon/component', ['exports', '@ember-decorators/argument/-debug/validated-component', '@ember-decorators/argument', '@ember-decorators/argument/type', '@ember-decorators/argument/types', 'ember-font-awesome/components/fa-icon/template'], function (exports, _validatedComponent, _argument, _type, _types, _template) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  function _initDefineProp(target, property, descriptor, context) {
    if (!descriptor) return;
    Object.defineProperty(target, property, {
      enumerable: descriptor.enumerable,
      configurable: descriptor.configurable,
      writable: descriptor.writable,
      value: descriptor.initializer ? descriptor.initializer.call(context) : void 0
    });
  }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
    var desc = {};
    Object['ke' + 'ys'](descriptor).forEach(function (key) {
      desc[key] = descriptor[key];
    });
    desc.enumerable = !!desc.enumerable;
    desc.configurable = !!desc.configurable;

    if ('value' in desc || desc.initializer) {
      desc.writable = true;
    }

    desc = decorators.slice().reverse().reduce(function (desc, decorator) {
      return decorator(target, property, desc) || desc;
    }, desc);

    if (context && desc.initializer !== void 0) {
      desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
      desc.initializer = undefined;
    }

    if (desc.initializer === void 0) {
      Object['define' + 'Property'](target, property, desc);
      desc = null;
    }

    return desc;
  }

  function _initializerWarningHelper(descriptor, context) {
    throw new Error('Decorating class property failed. Please ensure that transform-class-properties is enabled.');
  }

  var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _dec16, _dec17, _dec18, _dec19, _desc, _value, _class, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13, _descriptor14, _descriptor15, _descriptor16, _descriptor17, _descriptor18, _descriptor19, _class2, _temp2;

  let FaIconComponent = (_dec = (0, _type.type)('string'), _dec2 = (0, _type.type)((0, _type.optional)('string')), _dec3 = (0, _type.type)((0, _type.optional)('string')), _dec4 = (0, _type.type)((0, _type.optional)('string')), _dec5 = (0, _type.type)((0, _type.optional)('string')), _dec6 = (0, _type.type)('boolean'), _dec7 = (0, _type.type)((0, _type.optional)('string')), _dec8 = (0, _type.type)((0, _type.optional)(_types.ClosureAction)), _dec9 = (0, _type.type)((0, _type.optional)((0, _type.unionOf)('number', 'string'))), _dec10 = (0, _type.type)((0, _type.optional)('string')), _dec11 = (0, _type.type)((0, _type.optional)('number')), _dec12 = (0, _type.type)((0, _type.optional)('string')), _dec13 = (0, _type.type)((0, _type.optional)('number')), _dec14 = (0, _type.type)('boolean'), _dec15 = (0, _type.type)('boolean'), _dec16 = (0, _type.type)('boolean'), _dec17 = (0, _type.type)('boolean'), _dec18 = (0, _type.type)('boolean'), _dec19 = (0, _type.type)('boolean'), (_class = (_temp2 = _class2 = class FaIconComponent extends _validatedComponent.default.extend({
    layout: _template.default,
    tagName: ''
  }) {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), _initDefineProp(this, 'icon', _descriptor, this), _initDefineProp(this, 'id', _descriptor2, this), _initDefineProp(this, 'class', _descriptor3, this), _initDefineProp(this, 'title', _descriptor4, this), _initDefineProp(this, 'ariaLabel', _descriptor5, this), _initDefineProp(this, 'ariaHidden', _descriptor6, this), _initDefineProp(this, 'color', _descriptor7, this), _initDefineProp(this, 'click', _descriptor8, this), _initDefineProp(this, 'size', _descriptor9, this), _initDefineProp(this, 'pull', _descriptor10, this), _initDefineProp(this, 'rotate', _descriptor11, this), _initDefineProp(this, 'flip', _descriptor12, this), _initDefineProp(this, 'stack', _descriptor13, this), _initDefineProp(this, 'fixedWidth', _descriptor14, this), _initDefineProp(this, 'pulse', _descriptor15, this), _initDefineProp(this, 'inverse', _descriptor16, this), _initDefineProp(this, 'border', _descriptor17, this), _initDefineProp(this, 'spin', _descriptor18, this), _initDefineProp(this, 'listItem', _descriptor19, this), _temp;
    }

  }, _class2.positionalParams = ['icon'], _temp2), (_descriptor = _applyDecoratedDescriptor(_class.prototype, 'icon', [_argument.argument, _dec], {
    enumerable: true,
    initializer: null
  }), _descriptor2 = _applyDecoratedDescriptor(_class.prototype, 'id', [_argument.argument, _dec2], {
    enumerable: true,
    initializer: null
  }), _descriptor3 = _applyDecoratedDescriptor(_class.prototype, 'class', [_argument.argument, _dec3], {
    enumerable: true,
    initializer: null
  }), _descriptor4 = _applyDecoratedDescriptor(_class.prototype, 'title', [_argument.argument, _dec4], {
    enumerable: true,
    initializer: null
  }), _descriptor5 = _applyDecoratedDescriptor(_class.prototype, 'ariaLabel', [_argument.argument, _dec5], {
    enumerable: true,
    initializer: null
  }), _descriptor6 = _applyDecoratedDescriptor(_class.prototype, 'ariaHidden', [_argument.argument, _dec6], {
    enumerable: true,
    initializer: function () {
      return true;
    }
  }), _descriptor7 = _applyDecoratedDescriptor(_class.prototype, 'color', [_argument.argument, _dec7], {
    enumerable: true,
    initializer: null
  }), _descriptor8 = _applyDecoratedDescriptor(_class.prototype, 'click', [_argument.argument, _dec8], {
    enumerable: true,
    initializer: null
  }), _descriptor9 = _applyDecoratedDescriptor(_class.prototype, 'size', [_argument.argument, _dec9], {
    enumerable: true,
    initializer: null
  }), _descriptor10 = _applyDecoratedDescriptor(_class.prototype, 'pull', [_argument.argument, _dec10], {
    enumerable: true,
    initializer: null
  }), _descriptor11 = _applyDecoratedDescriptor(_class.prototype, 'rotate', [_argument.argument, _dec11], {
    enumerable: true,
    initializer: null
  }), _descriptor12 = _applyDecoratedDescriptor(_class.prototype, 'flip', [_argument.argument, _dec12], {
    enumerable: true,
    initializer: null
  }), _descriptor13 = _applyDecoratedDescriptor(_class.prototype, 'stack', [_argument.argument, _dec13], {
    enumerable: true,
    initializer: null
  }), _descriptor14 = _applyDecoratedDescriptor(_class.prototype, 'fixedWidth', [_argument.argument, _dec14], {
    enumerable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor15 = _applyDecoratedDescriptor(_class.prototype, 'pulse', [_argument.argument, _dec15], {
    enumerable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor16 = _applyDecoratedDescriptor(_class.prototype, 'inverse', [_argument.argument, _dec16], {
    enumerable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor17 = _applyDecoratedDescriptor(_class.prototype, 'border', [_argument.argument, _dec17], {
    enumerable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor18 = _applyDecoratedDescriptor(_class.prototype, 'spin', [_argument.argument, _dec18], {
    enumerable: true,
    initializer: function () {
      return false;
    }
  }), _descriptor19 = _applyDecoratedDescriptor(_class.prototype, 'listItem', [_argument.argument, _dec19], {
    enumerable: true,
    initializer: function () {
      return false;
    }
  })), _class));
  exports.default = FaIconComponent;
});
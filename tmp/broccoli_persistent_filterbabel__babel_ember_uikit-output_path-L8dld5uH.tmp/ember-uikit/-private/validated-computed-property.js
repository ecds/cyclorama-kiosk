define('ember-uikit/-private/validated-computed-property', ['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });


  const { testing } = Ember;

  const validateValue = exports.validateValue = (value, name, options, mediaOptions) => {
    if (value && !options.filter(v => {
      let re = new RegExp(`^${v}(${mediaOptions.join('|')})?$`);

      return re.test(value);
    }).length) {
      (true && Ember.warn(`\`${name}\` must be one of ${options.map(v => `'${v}'`).join(', ')}. Passed was '${value}', which will therefore be ignored.`, testing, {
        id: 'ember-uikit.invalid-property'
      }));


      return null;
    }

    return value;
  };

  const validatedComputedProperty = exports.validatedComputedProperty = (key, name, optionsKey, mediaOptionsKey = 'MEDIA_OPTIONS', sanitize = val => val || '') => {
    return Ember.computed(key, `${optionsKey}.[]`, `${mediaOptionsKey}.[]`, {
      get() {
        return this.get(key);
      },
      set(_, value) {
        let validated = sanitize(validateValue(value, name, this.getWithDefault(optionsKey, []), this.getWithDefault(mediaOptionsKey, [])));

        this.set(key, validated);

        return validated;
      }
    });
  };

  const validatedArrayComputedProperty = exports.validatedArrayComputedProperty = (key, name, optionsKey, mediaOptionsKey = 'MEDIA_OPTIONS', separator = ' ', sanitize = val => val || '') => {
    return Ember.computed(key, `${optionsKey}.[]`, `${mediaOptionsKey}.[]`, {
      get() {
        return this.get(key);
      },
      set(_, value) {
        let validated = value && value.split(separator).map(v => sanitize(validateValue(v, name, this.getWithDefault(optionsKey, []), this.getWithDefault(mediaOptionsKey, [])))).join(separator).trim();

        this.set(key, validated);

        return validated;
      }
    });
  };

  exports.default = validatedComputedProperty;
});
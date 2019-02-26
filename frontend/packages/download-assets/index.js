/* eslint-env node */
'use strict';

module.exports = {
  name: require('./package').name,

  isDevelopingAddon() {
    return true;
  },

  postBuild: function(r) {
    console.log('post build', this);
  }
};

var EmberHtmlbars = require('ember-cli-htmlbars/lib/ember-addon-main');
EmberHtmlbars._shouldColocateTemplates = function() {
  return false;
};
EmberHtmlbars._cachedShouldColocateTemplates = false;
console.log(EmberHtmlbars);

module.exports = {
  /**
    Ember CLI sends analytics information by default. The data is completely
    anonymous, but there are times when you might want to disable this behavior.

    Setting `disableAnalytics` to true will prevent any data from being sent.
  */
  "disableAnalytics": false
};

import Resolver from 'ember-resolver';
import Ember from 'ember';

export default Resolver.extend({
  //why do i need to do this?

  addonComponents(parsedName) {
    var fullNameWithoutType = parsedName.fullNameWithoutType;

    if (parsedName.type === 'template') {
      fullNameWithoutType = fullNameWithoutType.replace(/^components\//, '');
    }

    return this.namespace.modulePrefix + '/components/' + fullNameWithoutType + '/' + parsedName.type;
  },

  raw(parsedName){
    return parsedName.fullNameWithoutType + '/' + parsedName.type;
  },

  moduleNameLookupPatterns: Ember.computed(function () {
    var a = this._super();
    a.push(this.addonComponents);
    a.push(this.raw);
    return a;
  })
});

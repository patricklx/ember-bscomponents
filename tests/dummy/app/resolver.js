import Resolver from 'ember-resolver';

export default Resolver.extend({
  resolveComponent(parsedName) {
    let path = parsedName.fullNameWithoutType;
    let path2 = path;
    function checkInstance(instance) {
      return instance instanceof Ember.Component;
    }
    const registry = this._moduleRegistry;
    if (registry.has(path2) && checkInstance(registry.get(path2).default.prototype)) {
      return registry.get(path2).default;
    }
    path2 = `${path}/component`;
    if (registry.has(path2) && checkInstance(registry.get(path2).default.prototype)) {
      return registry.get(path2).default;
    }

    return this.resolveOther(parsedName);
  },

  resolveTemplate(parsedName) {
    let path = parsedName.fullNameWithoutType.replace('components/', '');
    path = `${path}/template`;
    if (this._moduleRegistry.has(path)) {
      return this._moduleRegistry.get(path).default;
    }
    const prefix = this.namespace.modulePrefix;
    path = `${prefix}/ui/routes/${parsedName.fullNameWithoutType}/template`;
    if (this._moduleRegistry.has(path)) {
      return this._moduleRegistry.get(path).default;
    }
    return this.resolveOther(parsedName);
  }
});

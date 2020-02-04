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

    const res = this.resolveOther(parsedName);
    if (res) {
      return res;
    }
    return Ember.Component.extend({});
  }
});

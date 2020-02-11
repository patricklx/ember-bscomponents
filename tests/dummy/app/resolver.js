import Resolver from 'ember-resolver';
import GlimmerComponent from '@glimmer/component';
import EmberComponent from '@ember/component';

export default Resolver.extend({
  resolveTemplate(parsedName) {
    let path = parsedName.fullNameWithoutType.replace('components/', '');
    let path2 = `${path}/template`;
    if (this._moduleRegistry.has(path2)) {
      return this._moduleRegistry.get(path2).default;
    }
    const prefix = this.namespace.modulePrefix;
    path2 = `${prefix}/ui/routes/${parsedName.fullNameWithoutType}/template`;
    if (this._moduleRegistry.has(path2)) {
      return this._moduleRegistry.get(path2).default;
    }

    path2 = `${prefix}/ui/${path}/template`;
    if (this._moduleRegistry.has(path2)) {
      return this._moduleRegistry.get(path2).default;
    }

    path2 = `${prefix}/ui/components/${path}/template`;
    if (this._moduleRegistry.has(path2)) {
      return this._moduleRegistry.get(path2).default;
    }

    path2 = `ember-bscomponents/components/${path}/template`;
    if (this._moduleRegistry.has(path2)) {
      return this._moduleRegistry.get(path2).default;
    }

    return this.resolveOther(parsedName);
  },

  resolveComponent(parsedName) {
    let path = parsedName.fullNameWithoutType;
    let path2 = path;
    function checkInstance(instance) {
      return instance instanceof GlimmerComponent || instance instanceof EmberComponent;
    }
    if (this._moduleRegistry.has(path2) && checkInstance(this._moduleRegistry.get(path2).default.prototype)) {
      return this._moduleRegistry.get(path2).default;
    }
    path2 = `${path}/component`;
    if (this._moduleRegistry.has(path2) && checkInstance(this._moduleRegistry.get(path2).default.prototype)) {
      return this._moduleRegistry.get(path2).default;
    }

    let prefix = this.namespace.modulePrefix;
    path2 = `${prefix}/ui${path}/component`;
    if (this._moduleRegistry.has(path2) && checkInstance(this._moduleRegistry.get(path2).default.prototype)) {
      return this._moduleRegistry.get(path2).default;
    }

    path2 = `${prefix}/ui/${path}/component`;
    if (this._moduleRegistry.has(path2) && checkInstance(this._moduleRegistry.get(path2).default.prototype)) {
      return this._moduleRegistry.get(path2).default;
    }

    path2 = `${prefix}/ui/components/${path}/component`;
    if (this._moduleRegistry.has(path2) && checkInstance(this._moduleRegistry.get(path2).default.prototype)) {
      return this._moduleRegistry.get(path2).default;
    }

    path2 = `${prefix}/${path}/component`;
    if (this._moduleRegistry.has(path2) && checkInstance(this._moduleRegistry.get(path2).default.prototype)) {
      return this._moduleRegistry.get(path2).default;
    }

    path2 = `ember-bscomponents/components/${path}/component`;
    if (this._moduleRegistry.has(path2) && checkInstance(this._moduleRegistry.get(path2).default.prototype)) {
      return this._moduleRegistry.get(path2).default;
    }

    return this.resolveOther(parsedName);
  },

  resolveService(parsedName) {
    let classicPath;
    if (parsedName.fullNameWithoutType.includes('@')) {
      let [pkg, name] = parsedName.fullNameWithoutType.split('@');
      const muPath = `${pkg}/services/${name}/service`;
      if (this._moduleRegistry.has(muPath)) {
        return this._moduleRegistry.get(muPath).default;
      }
      [pkg, name] = parsedName.fullNameWithoutType.split('@');
      classicPath = `${pkg}/services/${name}`;
      if (this._moduleRegistry.has(classicPath)) {
        return this._moduleRegistry.get(classicPath).default;
      }
    }
    const prefix = this.namespace.modulePrefix;
    classicPath = `${prefix}/services/${parsedName.fullNameWithoutType}/service`;
    if (this._moduleRegistry.has(classicPath)) {
      return this._moduleRegistry.get(classicPath).default;
    }
    classicPath = `${prefix}/services/${parsedName.fullNameWithoutType}`;
    if (this._moduleRegistry.has(classicPath)) {
      return this._moduleRegistry.get(classicPath).default;
    }
    return this.resolveOther(parsedName);
  }

});

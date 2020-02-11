

export function defaultArgs(target, name, descriptor) {
  const init = descriptor.initializer;
  descriptor.initializer = function() {
    const args = init(this);
    const context = this;
    const origArgs = context.args;
    Object.keys(args).forEach((k) => {
      const v = args[k];
      Object.defineProperty(args, k, {
        get() {
          return (k in origArgs) ? origArgs[k] : v;
        }
      })
    });
    return args;
  };

  return descriptor;
}

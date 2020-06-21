import { helper } from "@ember/component/helper";

function sizeSupport([prefix, args]) {
  function size() {
    if (args.sm) return 'small';
    if (args.large) return 'lg';
    if (args.xs) return 'xs';
    if (args.small) return 'sm';
  }

  return `${prefix}-${size()}`;
}

export default helper(sizeSupport);

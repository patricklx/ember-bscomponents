import { helper } from "@ember/component/helper";

function noop() {
  return function () {};
}

export default helper(noop);

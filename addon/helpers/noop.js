import { helper } from "@ember/component/helper";

function noop() {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return function() {};
}

export default helper(noop);

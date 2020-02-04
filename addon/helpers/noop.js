import { helper } from "@ember/component/helper";

function noop() {
  console.log('noop');
  return function () {};
}

export default helper(noop);

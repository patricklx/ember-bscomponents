import { helper } from "@ember/component/helper";

function didUpdate([fn, ...args]) {
  fn();
}

export default helper(didUpdate);

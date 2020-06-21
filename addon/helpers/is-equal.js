import { helper } from "@ember/component/helper";

function isEqual([leftSide, rightSide]) {
  return leftSide === rightSide;
}

export default helper(isEqual);

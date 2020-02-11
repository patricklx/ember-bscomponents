import { helper } from "@ember/component/helper";

function isIn([leftSide, rightSide]) {
  return leftSide in rightSide;
}

export default helper(isIn);

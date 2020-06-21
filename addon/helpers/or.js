import { helper } from "@ember/component/helper";

function or([...args]) {
  return args.find(i => !!i);
}

export default helper(or);

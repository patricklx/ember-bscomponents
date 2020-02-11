import { helper } from "@ember/component/helper";

function classBind([classNameBindings, context]) {
  const bindings = classNameBindings.split(' ');
  bindings.map((b) => {
    const [key, className] = b.split(':');
    return context[key] ? className : '';
  }).join(' ');
}

export default helper(classBind);

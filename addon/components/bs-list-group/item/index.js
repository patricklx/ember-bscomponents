import Component from '@glimmer/component';
import { defaultArgs } from "../../../decorators";


export default class BsListGroupItemComponent extends Component {

  @defaultArgs
  args = {
    withLinks: true,
    content: [],
  };

  get tag() {
    return this.args.withLinks ? 'a' : 'div';
  }

  get href() {
    return this.args.withLinks ? '#' : undefined;
  }
}

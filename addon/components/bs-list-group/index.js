import Component from '@glimmer/component';
import { action } from '@ember/object';
import { defaultArgs } from "../../decorators";


export default class BsListGroupComponent extends Component {

  @defaultArgs
  args = {
    withLinks: true,
    content: [],
    selected: null,
    isSelectable: true,
    onItemSelected: function() {}
  };

  get tag() {
    return this.args.withLinks ? 'div' : 'ul';
  }

  get items() {
    if (typeof this.args.content === 'string') {
      return this.args.content.split(',');
    }
    return this.args.content;
  }

  @action
  onItemSelected(item) {
    this.args.onItemSelected(item);
  }
}

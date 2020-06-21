import Component from '@glimmer/component';
import { action } from '@ember/object';
import layout from './template';
import { defaultArgs } from '../../decorators';

export default class BsPanelComponent extends Component {
  layout = layout;

  @defaultArgs
  args = {
    collapsible: true,
    open: true,
    withTitle: false,
    onCollapse: function() {},
    onOpen: function() {},
    onToggleCollapse: function() {}
  };

  @action
  toggleCollapsed() {
    this.args.onToggleCollapse(!this.args.open);
    if (this.args.open) {
      this.args.onCollapse()
    } else {
      this.args.onOpen()
    }
  }
}

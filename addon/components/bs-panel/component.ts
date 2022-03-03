import Component from '@glimmer/component';
import { action } from '@ember/object';


type Args = {
  type: "primary" | "success" | "info" | "warning" | "danger"
  collapsible: boolean;
  open: boolean;
  withTitle: boolean;
  onCollapse(): void;
  onOpen(): void;
  onToggleCollapse(isClosed: boolean): void;
}

export default class BsPanelComponent extends Component<Args> {

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

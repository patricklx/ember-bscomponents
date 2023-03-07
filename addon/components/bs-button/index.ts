import Component from '@glimmer/component';
import { action } from "@ember/object";
import { tracked } from "@glimmer/tracking";

type Args = {
  type: 'primary'|'default'|'warning'|'danger'|'info'|'success'|'link';
  size: 'sm'|'lg'|'md'|'xs';
  onClick(): Promise<any>|null
}

// eslint-disable-next-line ember/no-empty-glimmer-component-classes
export default class BsButtonComponent extends Component<Args> {

  @tracked isLoading = false;

  @action
  onClick() {
    const p = this.args.onClick();
    if (p && p.then) {
      this.isLoading = true;
      p.finally(() => {
        this.isLoading = false;
      })
    }
  }
}

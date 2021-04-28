import Component from '@glimmer/component';
import { later } from '@ember/runloop';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

type Args = {
  dismissAfter: number;
  dismissible: boolean;
  message: string;
  show: boolean;
  type: 'info'|'warn'|'error'|'success';
  onDismiss: () => null|Promise<any>;
  onAutoDismiss: () => null;
}

class BsAlertComponent extends Component<Args> {
  @tracked internalShow;

  get show() {
    const s = this.internalShow ?? this.args.show;
    if (s === undefined) {
      return true;
    }
    return s;
  }

  set show(v) {
    this.internalShow = v
  }

  @action
  setupDismiss() {
    if (this.args.dismissAfter > 0) {
      const autoDismiss = () => {
        if (this.isDestroyed) {
          return;
        }
        if (this.args.onAutoDismiss) {
          this.args.onAutoDismiss();
        }
        this.show = false;
      };
      later(this, autoDismiss, this.args.dismissAfter * 1000);
    }
  }

  @action
  dismiss(event) {
    event.preventDefault();
    const p = this.args?.onDismiss();
    return Promise.resolve(p).finally(() => {
      this.show = false
    });
  }
}

export default BsAlertComponent;

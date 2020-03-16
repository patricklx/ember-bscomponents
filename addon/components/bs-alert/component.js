import Component from '@ember/component';
import { later } from '@ember/runloop';
import { action } from '@ember/object';
import layout from './template';

class BsAlertComponent extends Component {
  layout = layout;
  dismissAfter = 0;
  dismissible = true;
  show = true;
  type = 'info';

  didInsertElement() {
    var autoDismiss;
    if (this.dismissAfter > 0) {
      autoDismiss = function() {
        let base;
        if (this.isDestroyed) {
          return;
        }
        if (typeof (base = this.attrs).onAutoDismiss === "function") {
          base.onAutoDismiss();
        }
        this.set('show', false);
      };
      later(this, autoDismiss, this.dismissAfter * 1000);
    }
  }

  @action
  dismiss(event) {
    event.preventDefault();
    const p = typeof this.attrs.onDismiss === "function" && this.attrs.onDismiss();
    return Ember.RSVP.resolve(p).finally(() => {
      this.set('show', false);
    });
  }
}

export default BsAlertComponent;

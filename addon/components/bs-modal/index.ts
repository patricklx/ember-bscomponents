import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { scheduleOnce } from "@ember/runloop";
import { action } from "@ember/object";
import { htmlSafe } from '@ember/template';
import ModalManager from "../../services/modal-manager";

type Args = {
  backdrop: boolean;
  fade: boolean;
  action: () => null;
  onClose: (event?: Event) => null;
  allowClose: boolean;
  animation: boolean;
  size?: 'lg'|'sm'
}

export default class BsModalComponent extends Component<Args> {
  @service('ember-bscomponents@modal-manager') declare modalManager: ModalManager;

  @tracked role = 'dialog';
  //--Defaults--
  @tracked _isVis = false;
  @tracked _isVisible = true;

  modalBackdrop = '<div class="modal-backdrop fade in"></div>';
  private _backdrop: Element;
  private _keyUpHandler: (event: Event) => any;

  get styles() {
    if (this.visible) {
      return htmlSafe('display: block;');
    }
    return htmlSafe('');
  }

  get isAriaHidden() {
    return !this.visible;
  }

  get isVis() {
    if (!this.args.animation) {
      return this.visible;
    }
    return this._isVis;
  }
  set isVis(val) {
      this._isVis = val;
  }

  get visible() {
    return this._isVisible;
  }
  set visible(val) {
    if (val === void 0) {
      this._isVisible = true;
    }
    if (val === this._isVisible) {
      return;
    }
    if (val) {
      scheduleOnce('afterRender', this, this.becameVisible);
    } else {
      scheduleOnce('afterRender', this, this.becameHidden);
    }
    return;
  }

  @action
  didInsert() {
    if (this.visible) {
      scheduleOnce('afterRender', this, this.becameVisible);
    }
  }

  becameVisible() {
    window.document.getElementsByTagName('body').item(0).classList.add('modal-open')
    if (this.args.backdrop) {
      this.appendBackdrop();
    }
    this.setupBinders();
    this.show();
  }

  @action
  becameHidden() {
    window.document.getElementsByTagName('body').item(0).classList.remove('modal-open')
    this.removeHandlers();
    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = null;
    }
  }

  appendBackdrop() {
    if (!this._backdrop) {
        const parentElement = this.element.parentElement;
        const div = document.createElement('div');
        div.innerHTML = this.modalBackdrop;
        parentElement.appendChild(div.firstChild);
        this._backdrop = parentElement.lastElementChild
    }
  }

  show() {
    return new Promise((resolve) => {
      if (!this.args.animation) {
        this.isVis = true;
        resolve(null);
      }
    });
  }

  hide() {
    return new Promise((resolve) => {
      this.isVis = true;
      if (!this.args.animation) {
        this.visible = false;
        resolve(null);
        return;
      }
      // eslint-disable-next-line ember/no-jquery
            return this.element.addEventListener('webkitTransitionEnd', (e) => {
        this.visible = false;
        return resolve(null);
            }, { once: true });
    });
  }

  handleEscape(event) {
    //Handle ESC
    if (event.keyCode === 27) {
      this.args?.onClose(event);
    }
  }

  @action
  doClose() {
    this.hide().then(() => {
      this.args?.onClose();
      this.modalManager.close();
    });
  }

  removeHandlers() {
    //Remove key press
    // eslint-disable-next-line ember/no-jquery
        document.removeEventListener('keyup', this._keyUpHandler);
    this._keyUpHandler = null;
  }

  setupBinders() {
    //Key press
    if (this._keyUpHandler) {
      return;
    }
    const handler = (event) => {
      this.handleEscape(event);
    };
    // eslint-disable-next-line ember/no-jquery
        document.addEventListener('keyup', handler);
    this._keyUpHandler = handler;
  }
}

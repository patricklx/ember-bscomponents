import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import jQuery from 'jquery';
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
  private _backdrop: JQuery;
  private _keyUpHandler: (event: JQuery.KeyUpEvent) => any;

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
      // eslint-disable-next-line ember/no-jquery
      const parentElement = jQuery(this.element).parent();
      // eslint-disable-next-line ember/no-jquery
      this._backdrop = jQuery(this.modalBackdrop).appendTo(parentElement);
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
      return jQuery(this.element).one('webkitTransitionEnd', (e) => {
        this.visible = false;
        return resolve(null);
      });
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
    jQuery(window.document).off('keyup', this._keyUpHandler);
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
    jQuery(window.document).on('keyup', handler);
    this._keyUpHandler = handler;
  }
}

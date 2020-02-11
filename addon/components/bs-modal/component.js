import Component from '@ember/component';
import { inject as service } from '@ember/service';
import jQuery from 'jquery';
import {tracked} from "@glimmer/tracking";
import {scheduleOnce} from "@ember/runloop";
import {action} from "@ember/object";

export default class BsModalComponent extends Component {
  @service('ember-bscomponents@modal-manager') modalManager;

  @tracked role = 'dialog';
  //--Defaults--
  @tracked backdrop = true;
  @tracked fade = true;
  @tracked action = null;
  @tracked allowClose = true;
  @tracked animation = false;
  @tracked _isVis = false;
  @tracked _isVisible = true;

  modalBackdrop = '<div class="modal-backdrop fade in"></div>';

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
    if (!this.animation) {
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
      return val;
    }
    if (val) {
      scheduleOnce('afterRender', this, this.becameVisible);
    } else {
      scheduleOnce('afterRender', this, this.becameHidden);
    }
    return val;
  }

  @action
  didInsert() {
    if (this.visible) {
      scheduleOnce('afterRender', this, this.becameVisible);
    }
  }

  becameVisible() {
    jQuery('body').addClass('modal-open');
    if (this.backdrop) {
      this.appendBackdrop();
    }
    this.setupBinders();
    this.show();
  }

  becameHidden() {
    jQuery('body').removeClass('modal-open');
    this.removeHandlers();
    if (this._backdrop) {
      this._backdrop.remove();
      this._backdrop = null;
    }
  }

  appendBackdrop() {
    if (!this._backdrop) {
      const parentElement = jQuery(this.element).parent();
      this._backdrop = jQuery(this.modalBackdrop).appendTo(parentElement);
    }
  }

  show() {
    return new Promise((resolve) => {
      if (!this.animation) {
        this.isVis = true;
        resolve();
      }
    });
  }

  hide() {
    return new Promise((resolve) => {
      this.isVis = true;
      if (!this.animation) {
        this.visible = false;
        resolve();
        return;
      }
      return jQuery(this.element).one('webkitTransitionEnd', (e) => {
        this.visible = false;
        return resolve();
      });
    });
  }

  handleEscape(event) {
    //Handle ESC
    if (event.keyCode === 27) {
      this.close(event);
    }
  }

  @action
  doClose() {
    this.hide().then(() => {
      if (this.attrs.onClose === "function") {
        this.attrs.onClose();
      }
      this.get('modalManager').close();
    });
  }

  //Invoked automatically by ember when the view is destroyed, giving us a chance to perform cleanups
  willDestroy() {
    this.becameHidden();
  }

  removeHandlers() {
    //Remove key press
    jQuery(window.document).unbind('keyup', this._keyUpHandler);
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
    jQuery(window.document).bind('keyup', handler);
    this._keyUpHandler = handler;
  }
}

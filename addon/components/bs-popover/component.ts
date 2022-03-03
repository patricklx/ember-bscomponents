import EmberObject, { action, setProperties } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { registerDestructor } from '@ember/destroyable';

export type Args = {
  targetId?: string,
  title?: string,
  content?: string,
  triggerOn?: 'click',
  sticky?: boolean,
  placement?: 'top'|'bottom'|'right'|'left',
  targetSibling?: 'up'|'down',
  targetElement?: Element,
  show?: boolean
}

class BsPopoverComponent<T extends Args> extends Component<T> {
  @service('ember-bscomponents@tooltip-box-manager') tooltipBoxManager;
  @tracked wormholeId = null;
  @tracked parentElement: Element = null;
  type = 'popover';

  _options = EmberObject.create({});
  private currentTarget: Element;
  private popoverId: any;
  siblingUpElement: Element;
  siblingDownElement: Element;

  constructor(...args: [any, any]) {
    super(...args);
    registerDestructor(this, () => this.doDestroy);
  }

  @action
  setParent(elem: Element) {
    this.siblingUpElement = elem.previousElementSibling;
    this.siblingDownElement = elem.nextElementSibling;
    this.parentElement = elem.parentElement;
    elem.remove();
    this.addTooltip();
  }

  getTargetElement() {
    if (this.args.targetSibling) {
      if (this.args.targetSibling === 'up') {
        return this.siblingUpElement;
      }
      if (this.args.targetSibling === 'down') {
        return this.siblingDownElement;
      }
    }
    if (this.args.targetId) {
      return document.getElementById(this.args.targetId);
    }
    if (this.args.targetElement) {
      return this.args.targetElement;
    }
    return this.parentElement;
  }

  @action
  updateOptions() {
    setProperties(this._options, {
      trigger: this.args.triggerOn,
      sticky: this.args.sticky,
      title: this.args.title,
      show: this.args.show,
      content: this.args.content,
      placement: this.args.placement
    });
  }

  @action
  addTooltip() {
    if (this.currentTarget === this.getTargetElement()) {
      return;
    }
    if (this.popoverId) {
      this.tooltipBoxManager.unregisterTip(this.popoverId);
      this.popoverId = null;
    }
    if (!this.getTargetElement()) return;
    this.currentTarget = this.getTargetElement();
    this.popoverId = this.tooltipBoxManager.registerTip(this.type, this._options, this.getTargetElement(), this);
  }

  doDestroy() {
    this.wormholeId = null;
    this.tooltipBoxManager.unregisterTip(this.popoverId);
  }
}

export default BsPopoverComponent;

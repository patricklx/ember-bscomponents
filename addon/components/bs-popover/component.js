import EmberObject, { action, setProperties } from '@ember/object';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import template from './template';
import {defaultArgs} from "../../decorators";


class BsPopoverComponent extends Component {
  @service('ember-bscomponents@tooltip-box-manager') tooltipBoxManager;
  @tracked wormholeId = null;
  @tracked parentElement = null;
  tagName = '';
  layout = template;
  type = 'popover';

  _options = EmberObject.create({});

  @defaultArgs
  args = {
    popoverId: null,
    targetId: null,
    triggerOn: null,
    sticky: null,
    placement: null,
    targetSibling: null,
    show: null
  }

  @action
  setParent(elem) {
    this.parentElement = elem.parentElement;
    elem.remove();
    this.addTooltip();
  }

  getTargetElement() {
    if (this.args.targetSibling) {
      if (this.args.targetSibling === 'up') {
        return this.parentElement.previousElementSibling;
      }
      if (this.args.targetSibling === 'down') {
        return this.parentElement.nextElementSibling;
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

  willDestroyElement(...args) {
    this.wormholeId = null;
    super.willDestroyElement(...args);
    this.tooltipBoxManager.unregisterTip(this.popoverId);
  }
}

export default BsPopoverComponent;

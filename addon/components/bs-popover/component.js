import { action } from '@ember/object';
import { addObserver } from "@ember/object/observers";
import Component from '@ember/component';
import { inject as service } from '@ember/service';
import template from './template';


const BsPopoverComponent = Component.extend({
  tooltipBoxManager: service('tooltip-box-manager'),
  tagName: '',
  layout: template,
  type: 'popover',
  popoverId: null,
  wormholeId: null,
  targetId: null,
  triggerOn: null,
  sticky: null,
  parentElement: null,
  placement: null,

  get options() {
    return {
      trigger: this.triggerOn,
      sticky: this.sticky,
      title: this.title,
      show: this.show,
      content: this.content,
      placement: this.placement
    }
  },

  init(...args) {
    this._super(...args);
    addObserver(this, 'targetElement', this.addTooltip);
    addObserver(this, 'targetId', this.addTooltip);
    addObserver(this, 'targetSibling', this.addTooltip);
    addObserver(this, 'show', this.addTooltip);
    addObserver(this, 'triggerOn', this.addTooltip);
    addObserver(this, 'sticky', this.addTooltip);
    addObserver(this, 'title', this.addTooltip);
    addObserver(this, 'content', this.addTooltip);
    addObserver(this, 'placement', this.addTooltip);
    addObserver(this, 'parentElement', this.addTooltip);
  },

  didInsertElement(...args) {
    this._super(...args);
    this.addTooltip();
  },

  @action
  setParent(elem) {
    this.set('parentElement', elem.parentElement);
    elem.remove();
  },

  getTargetElement() {
    if (this.targetSibling) {
      if (this.targetSibling) {
        if (this.targetSibling === 'up') {
          return this._findParent.previousElementSibling;
        }
        if (this.targetSibling === 'down') {
          return this._findParent.nextElementSibling;
        }
      }
    }
    if (this.targetId) {
      return document.getElementById(this.targetId);
    }
    if (this.targetElement) {
      return this.targetElement;
    }
    return this.parentElement;
  },

  addTooltip: function () {
    if (this.options.show === false && this.popoverId) {
      if (this.popoverId) {
        this.tooltipBoxManager.unregisterTip(this.popoverId);
        this.popoverId = null;
        this.currentTarget = null;
        this.set('wormholeId', null);
      }
      return;
    }

    if (this.currentTarget === this.getTargetElement()) {
      return;
    }

    if (!this.getTargetElement()) return;
    this.currentTarget = this.getTargetElement();
    this.popoverId = this.tooltipBoxManager.registerTip(this.type, this.options, this.getTargetElement(), this);
  },

  willDestroyElement: function (...args) {
    this._super(...args);
    this.set('wormholeId', null);
    this.tooltipBoxManager.unregisterTip(this.popoverId);
  }
});

export default BsPopoverComponent;

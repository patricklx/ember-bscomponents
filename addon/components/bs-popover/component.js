import Ember from 'ember';


const BsPopoverComponent = Ember.Component.extend({
  tooltipBoxManager: Ember.inject.service('tooltip-box-manager'),
  tagName: '',
  type: 'popover',
  popoverId: null,
  wormholeId: null,
  targetId: null,
  triggerOn: null,
  sticky: null,

  get options() {
    return {
      trigger: this.triggerOn,
      sticky: this.sticky,
      title: this.title,
      show: this.show,
      content: this.content
    }
  },

  init(...args) {
    this._super(...args);
    this._findParent = document.createTextNode('');
    Ember.addObserver(this, 'targetElement', this.addTooltip);
    Ember.addObserver(this, 'targetId', this.addTooltip);
    Ember.addObserver(this, 'targetSibling', this.addTooltip);
    Ember.addObserver(this, 'options', this.addTooltip);
  },

  didInsertElement(...args) {
    this._super(...args);
    this.addTooltip();
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
    return this._findParent.parentElement;
  },

  addTooltip: function () {
    if (this.currentTarget === this.getTargetElement()) {
      return;
    }
    if (this.popoverId) {
      this.tooltipBoxManager.unregisterTip(this.popoverId);
      this.popoverId = null;
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

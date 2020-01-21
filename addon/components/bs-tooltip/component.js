import Ember from 'ember';


const BsTooltipComponent = Ember.Component.extend({
  tooltipBoxManager: Ember.inject.service('tooltip-box-manager'),
  tagName: '',
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
      if (this.targetSibling === 'up') {
        return this._findParent.previousElementSibling;
      }
      if (this.targetSibling === 'down') {
        return this._findParent.nextElementSibling;
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
    if (this.popoverId) {
      this.tooltipBoxManager.removeTip(this.popoverId);
    }
    if (!this.getTargetElement()) return;
    this.popoverId = this.tooltipBoxManager.registerTip('tooltip', this.options, this.getTargetElement(), this);
  },

  willDestroyElement: function () {
    this.set('wormholeId', null);
    this.tooltipBoxManager.removeTip(this.popoverId);
  }
});

export default BsTooltipComponent;

import Ember from 'ember';


const BsPopoverComponent = Ember.Component.extend({
  tooltipBoxManager: Ember.inject.service('tooltip-box-manager'),

  get isReady() {

  },

  didInsertElement: function () {
    this.popoverId = this.tooltipBoxManager.registerTip('popover', this.options, this.target, this);
    this.tooltipBoxManager.onShowTip()
  }
});

export default BsPopoverComponent;

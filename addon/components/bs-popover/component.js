import Ember from 'ember';


const BsPopoverComponent = Ember.Component.extend({
  tooltipBoxManager: Ember.inject.service('tooltip-box-manager'),

  isReady: false,

  didInsertElement: function () {
    this.popoverId = this.tooltipBoxManager.registerTip('popover', this.options, this.target, this);
  },

  willDestroyElement: function () {
    this.set('isReady', false);
    this.tooltipBoxManager.removeTip(this.popoverId);
  }
});

export default BsPopoverComponent;

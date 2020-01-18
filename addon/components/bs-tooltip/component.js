import Ember from 'ember';


const BsTooltipComponent = Ember.Component.extend({
  tooltipBoxManager: Ember.inject.service('tooltip-box-manager'),

  isReady: false,

  didInsertElement: function () {
    this.popoverId = this.tooltipBoxManager.registerTip('tooltip', this.options, this.target, this);
  },

  willDestroyElement: function () {
    this.set('isReady', false);
    this.tooltipBoxManager.removeTip(this.popoverId);
  }
});

export default BsTooltipComponent;

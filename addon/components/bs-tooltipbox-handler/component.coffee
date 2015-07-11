`import Ember from 'ember'`
`import layout from './template'`

BsTooltipBoxComponent = Ember.Component.extend({
  manager: Ember.inject.service('tooltip-box-manager')
  layout: layout
  popovers: Ember.computed.alias('manager.popovers')
  tooltips: Ember.computed.alias('manager.tooltips')
})

`export default BsTooltipBoxComponent`

`import Ember from 'ember'`
`import TooltipBoxManager from 'ember-bscomponents/services/tooltip-box-manager'`

BsTooltipViewMixin = Ember.Mixin.create({
  attributeBindings: [TooltipBoxManager::attribute]
  didInsertElement: () ->
    data = this.get('bsTooltipData')
    type = this.get('bsTooltipType')
    manager = Ember.getOwner(this).lookup('service:tooltip-box-manager')
    manager.addFromView(this, type, data)
    return
})

`export default BsTooltipViewMixin`

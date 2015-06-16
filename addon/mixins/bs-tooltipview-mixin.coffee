`import Ember from 'ember'`

BsTooltipViewMixin = Ember.Mixin.create
  attributeBindings: (() ->
    manager = @container.lookup('service:tooltip-box-manager')
    return [manager.attribute]
  ).property()
  didInsertElement: () ->
    data = this.get("bsTooltipData")
    type = this.get("bsTooltipType")
    manager = @container.lookup('service:tooltip-box-manager')
    manager.addFromView(this, type, data)


`export default BsTooltipViewMixin`

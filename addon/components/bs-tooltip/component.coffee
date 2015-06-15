`import Ember from 'ember'`
`import layout from './template'`
`import BsPopoverComponent from '../bs-popover/component'`

BsTooltipComponent = BsPopoverComponent.extend
  classNames: "tooltip"
  layout: layout
  init: () ->
    @_super()
    @classNames.removeObject("popover")
    @set("content", @get("content") or @get("title"))

`export default BsTooltipComponent`

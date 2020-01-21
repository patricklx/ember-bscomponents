`import Ember from 'ember'`
`import layout from './template'`
`import BsPopoverComponent from '../-bs-popover/component'`

BsTooltipComponent = BsPopoverComponent.extend({
  tagName: ''
  layout: layout
  init: () ->
    @_super()
    @set('content', @get('content') or @get('title'))
    return
})
`export default BsTooltipComponent`

`import Ember from 'ember'`
`import layout from './template'`

BsDropdownMenuComponent = Ember.Component.extend({
  layout: layout
  tagName: 'ul'
  classNames: ['dropdown-menu']
  isVisible: false
  autoclose: true

  becameVisible: () ->
    id = @get('elementId')
    $(document).bind('click.dropdown' + id, (e) =>
      container = @$()
      if @isDestroyed
        return
      # if the target of the click isn't the container nor a descendant of the container
      if (!container.is(e.target) and container.has(e.target).length == 0)
        @set('isVisible', false)
      return
    )
    @$().parent().addClass('open')
    return

  becameHidden: () ->
    id = @get('elementId')
    $(document).unbind('click.dropdown' + id)
    @$().parent().removeClass('open')
    return

  willDestroy: () ->
    @_super()
    id = @get('elementId')
    $(document).unbind('click.dropdown' + id)
    @$()?.parent().removeClass('open')

  click: () ->
    if autoclose
      @attrs.onClose?()
    return
})

`export default BsDropdownMenuComponent`

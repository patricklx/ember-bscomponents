`import Ember from 'ember'`
`import layout from './template'`

BsDropdownMenuComponent = Ember.Component.extend({
  layout: layout
  tagName: 'ul'
  classNames: ['dropdown-menu']
  isVisible: false

  becameVisible: () ->
    id = @get('elementId')
    $(document).bind('click.dropdown' + id, (e) =>
      container = @$()
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
})

`export default BsDropdownMenuComponent`

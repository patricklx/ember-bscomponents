`import Ember from 'ember'`
`import layout from './template'`

BsDropdownMenuComponent = Ember.Component.extend({
  layout: layout
  tagName: 'ul'
  classNames: ['dropdown-menu']
  autoclose: true
  isVisible: Ember.computed({
    get: () -> return false
    set: (key, val, cache) ->
      if val == undefined
        val = false
      if val == cache
        return val
      if val
        Ember.run.scheduleOnce('afterRender', this, @becameVisible)
      else
        Ember.run.scheduleOnce('afterRender', this, @becameHidden)
      return val
  })

  becameVisible: () ->
    id = @get('elementId')
    Ember.run.next(() =>
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
    )
    return

  becameHidden: () ->
    id = @get('elementId')
    $(document).unbind('click.dropdown' + id)
    @$().parent().removeClass('open')
    return

  didInsertElement: () ->
    if @isVisible
      @$().parent().addClass('open')

  willDestroy: () ->
    @_super()
    id = @get('elementId')
    $(document).unbind('click.dropdown' + id)
    @$()?.parent().removeClass('open')

  click: () ->
    if @autoclose
      @attrs.onClose?()
    return

    actions: {
      onClose: (evt) ->

    }
})

`export default BsDropdownMenuComponent`

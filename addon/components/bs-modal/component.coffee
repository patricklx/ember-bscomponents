`import Ember from 'ember'`
`import layout from './template'`

###
Modal component.
###
BsModalComponent = Ember.Component.extend({
  modalManager: Ember.inject.service()
  layout: layout
  classNames: ['modal']
  classNameBindings: ['fade', 'isVis:in']
  attributeBindings: ['role', 'aria-labelledby', 'isAriaHidden:aria-hidden', 'ariaLabelledBy:aria-labelledby', 'style']
  style: (() ->
    return Ember.String.htmlSafe('display: block')
  ).property('isVisible')
  isAriaHidden: (() ->
    return "#{!@get('isVisible')}"
  ).property('isVisible')
  modalBackdrop: '<div class="modal-backdrop fade in"></div>'
  role: 'dialog'

  header: 'bs-modal/header',
  body: 'bs-modal/body',
  footer: 'bs-modal/footer'

#--Defaults--
  backdrop: true
  fade: true
  action: null
  allowClose: true
  isVis: true
  isVisible: Ember.computed({
    get: () -> return true
    set: (key, val, cache) ->
      if val == cache
        return val
      if val
        Ember.run.scheduleOnce('afterRender', this, @becameVisible)
      else
        Ember.run.scheduleOnce('afterRender', this, @becameHidden)
      return val
  })

  didInsertElement: ->
    @._super()
    @setupBinders()
    if @get('isVisible')
      @becameVisible()
    return

  becameVisible: ->
    Em.$('body').addClass('modal-open')
    @appendBackdrop() if @get('backdrop')
    return

  becameHidden: ->
    Em.$('body').removeClass('modal-open')
    @_backdrop.remove() if @_backdrop
    return

  appendBackdrop: ->
    parentElement = @$().parent()
    @_backdrop = Em.$(@modalBackdrop).appendTo(parentElement)
    return

  hide: ->
    @set('isVis', false)
    current = this
    @$().one('webkitTransitionEnd', (e) ->
      current.set('isVisible', false)
      return
    )
    return false

  keyPressed: (event) ->
#Handle ESC
    if event.keyCode is 27
      @close(event)
    return

  close: (event) ->
    @attrs.onClose?()
    @get('modalManager').close()
    return

  actions: {
    onClose: (event) ->
      @close(event)
      return
  }


#Invoked automatically by ember when the view is destroyed, giving us a chance to perform cleanups
  willDestroyElement: () ->
    Em.$('body').removeClass('modal-open')
    @removeHandlers()
    @_backdrop.remove() if @_backdrop
    return

  removeHandlers: ->
#Remove key press
    jQuery(window.document).unbind('keyup', @_keyUpHandler)
    return

  setupBinders: ->
#Key press
    handler = (event) =>
      @keyPressed(event)
      return
    jQuery(window.document).bind('keyup', handler)
    @_keyUpHandler = handler
    return

})

`export default BsModalComponent`

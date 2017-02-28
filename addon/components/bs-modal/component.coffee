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
    if this.get('isVisible')
      return Ember.String.htmlSafe('display: block;')
    return
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
  animation: false
  isVis: Ember.computed('isVisible', 'animation', {
    get: () ->
      if not @get('animation')
        return @get('isVisible')
      meta = Ember.meta(this);
      cache = meta.readableCache();
      return cache[key] || false
    set: (key, val) ->
      return val
  })
  isVisible: Ember.computed({
    get: () -> return true
    set: (key, val, cache) ->
      if val == undefined
        val = true
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
    if @get('isVisible')
      Ember.run.scheduleOnce('afterRender', this, @becameVisible)
    return

  becameVisible: ->
    Em.$('body').addClass('modal-open')
    @appendBackdrop() if @get('backdrop')
    @setupBinders()
    @show()
    return

  becameHidden: ->
    Em.$('body').removeClass('modal-open')
    @removeHandlers()
    if @_backdrop
      @_backdrop.remove()
      @_backdrop = null
    return

  appendBackdrop: ->
    if not @_backdrop
      parentElement = @$().parent()
      @_backdrop = Em.$(@modalBackdrop).appendTo(parentElement)
    return

  show: () ->
    return new Ember.RSVP.Promise((resolve) =>
      if not @get('animation')
        @set('isVis', true)
        resolve()
        return
    )

  hide: () ->
    return new Ember.RSVP.Promise((resolve) =>
      @set('isVis', false)
      if not @get('animation')
        @set('isVisible', false)
        resolve()
        return

      @$().one('webkitTransitionEnd', (e) =>
        @set('isVisible', false)
        resolve()
      )
    )

  keyPressed: (event) ->
#Handle ESC
    if event.keyCode is 27
      @close(event)
    return

  close: (event) ->
    @hide().then(() =>
      @attrs.onClose?()
      @get('modalManager').close()
      return
    )
    return

  actions: {
    onClose: (event) ->
      @close(event)
      return
  }

#Invoked automatically by ember when the view is destroyed, giving us a chance to perform cleanups
  willDestroyElement: () ->
    @_super(arguments...)
    @becameHidden()
    return

  removeHandlers: ->
#Remove key press
    jQuery(window.document).unbind('keyup', @_keyUpHandler)
    @_keyUpHandler = null
    return

  setupBinders: ->
#Key press
    if @_keyUpHandler
      return
    handler = (event) =>
      @keyPressed(event)
      return
    jQuery(window.document).bind('keyup', handler)
    @_keyUpHandler = handler
    return

})

`export default BsModalComponent`

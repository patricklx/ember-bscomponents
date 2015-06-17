`import Ember from 'ember'`
`import layout from './template'`
###
Modal component.
###
BsModalComponent = Ember.Component.extend(Ember.Evented,
  layout: layout
  classNames: ['modal']
  classNameBindings: ['fade', 'isVis:in']
  attributeBindings: ['role', 'aria-labelledby', 'isAriaHidden:aria-hidden', "ariaLabelledBy:aria-labelledby"]
  isAriaHidden: (->
    "#{@get('isVisible')}"
  ).property('isVisible')
  modalBackdrop: '<div class="modal-backdrop fade in"></div>'
  role: 'dialog'
  footerViews: []

#--Defaults--
  backdrop: true
  title: null
  isVisible: false
  manual: true
  isVis: false
  fullSizeButtons: false
  fade: true
  action: null
  allowClose: true

  didInsertElement: ->
    @._super()
    @setupBinders()
    if @manual
      @show()

  becameVisible: ->
    Em.$('body').addClass('modal-open')
    @appendBackdrop() if @get("backdrop")

  becameHidden: ->
    Em.$('body').removeClass('modal-open')
    @_backdrop.remove() if @_backdrop

  appendBackdrop: ->
    parentElement = @$().parent()
    @_backdrop = Em.$(@modalBackdrop).appendTo(parentElement)

  show: ->
    @set 'isVisible', true
    current = this
    setTimeout (->
      current.set 'isVis', true
      return
    ), 15
    return

  hide: ->
    @set 'isVis', false
    current = this
    @$().one 'webkitTransitionEnd', (e) ->
      current.set 'isVisible', false
      return
    false

  toggle: ->
    @toggleProperty 'isVisible'

  click: (event) ->
    target = event.target
    targetDismiss = target.getAttribute("data-dismiss")
    if targetDismiss is 'modal'
      @close()

  keyPressed: (event) ->
    #Handle ESC
    if event.keyCode is 27
      @close event

  close: (event) ->
    if @get('action')
      @sendAction()

    if @get('manual')
      @remove()
    else
      @hide()
    return @trigger('closed')


#Invoked automatically by ember when the view is destroyed, giving us a chance to perform cleanups
  willDestroyElement: ->
    Em.$('body').removeClass('modal-open')
    @removeHandlers()
    name = @get('name')
    name?= @get('elementId')
    @_backdrop.remove() if @_backdrop

  removeHandlers: ->
    #Remove key press
    jQuery(window.document).unbind "keyup", @_keyUpHandler

  setupBinders: ->
    #Key press
    handler = (event) =>
      @keyPressed event
    jQuery(window.document).bind "keyup", handler
    @_keyUpHandler = handler


)

`export default BsModalComponent`

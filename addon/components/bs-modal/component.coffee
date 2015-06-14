`import Ember from 'ember'`
###
Modal component.
###
BsModalComponent = Ember.Component.extend(Ember.Evented,
  layoutName: 'components/bs-modal'
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
  manual: false
  isVis: false
  fullSizeButtons: false
  fade: true

  didInsertElement: ->
    @._super()
    @setupBinders()
    #Register modal in the modal manager
    name = @get('name')
    Ember.assert("Modal name is required for modal view #{@get('elementId')}", @get('name'))
    name?= @get('elementId')
    ModalManager.add(name, @)

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
    @set 'isVis', false
    current = this
    @$().one 'webkitTransitionEnd', (e) ->
      if current.get('manual') then current.destroy() else current.hide()
      return
      @trigger 'closed'


#Invoked automatically by ember when the view is destroyed, giving us a chance to perform cleanups
  willDestroyElement: ->
    Em.$('body').removeClass('modal-open')
    @removeHandlers()
    name = @get('name')
    name?= @get('elementId')
    ModalManager.remove(name, @)
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

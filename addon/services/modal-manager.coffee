`import Ember from 'ember'`

ModalManager = Ember.Service.extend({
  modal: null,
  context: null
  properties: null

  open: (modal, target, properties) ->
    Ember.run.next(this, () ->
      @set('modalTarget', target)
      @set('properties', properties)
      @set('modal', modal)
      return
    )
    return

  close: () ->
    @set('modal', null)
    @set('modalTarget', null)
    @set('properties', null)
    return

  actions: {
    open: (modal, target, properties) ->
      @open(modal, target, properties)
      return
    close: () ->
      @close()
      return
  }
})

`export default ModalManager`

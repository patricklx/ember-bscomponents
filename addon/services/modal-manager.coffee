`import Ember from 'ember'`

ModalManager = Ember.Object.extend({
  modal: null,
  context: null
  properties: null

  open: (modal, context, properties) ->
    Ember.run.next(this, () ->
      @set('context', context)
      @set('properties', properties)
      @set('modal', modal)
      return
    )
    return

  close: () ->
    @set('modal', null)
    @set('context', null)
    @set('properties', null)
    Ember.run.sync()
    return
})

`export default ModalManager`

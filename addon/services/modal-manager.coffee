`import Ember from 'ember'`

ModalManager = Ember.Object.extend
  modal: null,
  context: null
  properties: null

  open: (modal, context, properties) ->
    @set('context', context)
    @set('properties', properties)
    @set('modal', modal)
    return

  close: () ->
    @set('modal', null)
    @set('context', null)
    @set('properties', null)
    return

`export default ModalManager`

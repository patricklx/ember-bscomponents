`import Ember from 'ember'`

ModalManager = Ember.Object.extend
  modal: null,
  context: null
  properties: null

  open: (modal, context, properties) ->
    @set('modal', modal)
    @set('context', context)
    @set('properties', properties)
    return

  close: () ->
    @set('modal', null)
    @set('context', null)
    @set('properties', null)
    return

`export default ModalManager`

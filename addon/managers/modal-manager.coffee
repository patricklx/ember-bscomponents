`import Ember from 'ember'`

ModalManager = Ember.Object.extend
  container: null

  open: (modal, context, callback) ->
    r = @container.lookup('route:application')
    r.send('openModal', modal, context, callback)
    return

  close: () ->
    r = @container.lookup('route:application')
    r.send('closeModal')
    return

`export default ModalManager`

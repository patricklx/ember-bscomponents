`import Ember from 'ember'`
`import layout from './template'`

BsModalHandlerComponent = Ember.Component.extend
  _controller: null
  layout: layout
  modalManager: Ember.inject.service('modal-manager')
  currentModal: Ember.computed.alias('modalManager.modal')

  isComponent: (() ->
    return not @get('currentController')?
  ).property('currentController')

  currentController: (() ->
    modal = @get('modalManager.modal')
    if modal
      controller = @container.lookup('controller:'+modal)
      if not controller
        return @_controller
      controller.setProperties(@get('modalManager.properties'))
      controller.set('target', @get('modalManager.context'))
      @_controller = controller
    return @_controller
  ).property('modalManager.modal')



`export default BsModalHandlerComponent`

`import Ember from 'ember'`
`import layout from './template'`

BsModalHandlerComponent = Ember.Component.extend({
  layout: layout
  modalManager: Ember.inject.service('modal-manager')
  currentModal: Ember.computed.alias('modalManager.modal')

  isComponent: (() ->
    return true
  ).property('currentController')

  currentController: (() ->
    return null
  ).property('modalManager.modal')
})


`export default BsModalHandlerComponent`

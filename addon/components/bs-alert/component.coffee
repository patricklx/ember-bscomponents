`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`
`import layout from './template'`

BsAlertComponent = Ember.Component.extend(TypeSupport,{
  classNames: ['alert'],
  classNameBindings: ['fade', 'fade:in']
  classTypePrefix: 'alert',
  layout: layout
  attributeBindings: ['data-timeout']
  dismissAfter: 0
  closedParam: null
  dismiss: true

  didInsertElement: () ->
    if @dismissAfter > 0
      send = () -> @send('dismiss')
      Ember.run.later(this, send, @dismissAfter * 1000)
    return

  actions: {
    dismiss: () ->
      @sendAction('close', @get('closedParam'))
      @remove()
      return
  }
})

`export default BsAlertComponent`

`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`
`import layout from './template'`

BsAlertComponent = Ember.Component.extend(TypeSupport,{
  classNames: ['alert'],
  classNameBindings: ['fade', 'fade:in']
  classTypePrefix: 'alert',
  layout: layout
  dismissAfter: 0
  dismiss: true
  type: 'info'

  didInsertElement: () ->
    if @dismissAfter > 0
      autoDismiss = () ->
        if @isDestroyed then return
        @attrs.onAutoDismiss?()
        @remove()
      Ember.run.later(this, autoDismiss, @dismissAfter * 1000)
    return

  actions: {
    dismiss: () ->
      p = @attrs.onDismiss?();
      Ember.RSVP.resolve(p).then(() =>
        @remove()
      )
      return
  }
})

`export default BsAlertComponent`

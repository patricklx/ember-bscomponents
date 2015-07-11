`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`
`import layout from './template'`

BsPanelComponent = Ember.Component.extend(TypeSupport, {
  layout: layout
  classNames: ['panel']
  classTypePrefix: ['panel']
  classNameBindings: ['fade', 'fade:in']
  clicked: null
  onClose: null
  fade: true
  collapsible: false
  open: true

  actions: {
    close: (event) ->
      @sendAction('onClose')
      @$().removeClass('in')
      #TODO: Causes ' Object #<HTMLDivElement> has no method 'destroyElement' '
      #@$().one($.support.transition.end, @destroy).emulateTransitionEnd(150)
      #Workaround
      setTimeout((() ->
        @destroy()
        return
      ).bind(this), 250)
      return
  }

  click: (event) ->
    @sendAction('clicked', event)
    return

  collapsibleBodyId: (->
    return "#{@get('elementId')}_body"
  ).property('collapsible')

  collapsibleBodyLink: (->
    return "##{@get('elementId')}_body"
  ).property('collapsibleBodyId')
})

`export default BsPanelComponent`

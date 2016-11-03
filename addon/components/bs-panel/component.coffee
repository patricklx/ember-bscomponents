`import Ember from 'ember'`
`import TypeSupport from 'ember-bscomponents/mixins/type'`
`import layout from './template'`

BsPanelComponent = Ember.Component.extend(TypeSupport, {
  layout: layout
  classNames: ['panel']
  classTypePrefix: ['panel']
  collapsible: false
  open: true

  header: 'bs-panel/header',
  body: 'bs-panel/body',
  footer: 'bs-panel/footer'

  actions: {

    toggleCollapsed: () ->
      @attrs.onToggleCollapse?(@get('open'))
      if @get('open')
        @attrs.onCollapse?()
      else
        @attrs.onOpen?()
      @toggleProperty('open')
      return
  }

})

`export default BsPanelComponent`

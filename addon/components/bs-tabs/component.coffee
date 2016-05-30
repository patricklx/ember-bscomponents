`import Ember from 'ember'`
`import template from './template'`

BsTabs = Ember.Component.extend({
  layout: template
  tagName: ''
  content: []
  tabs: 'bs-tabs/tabs'
  pane: 'bs-tabs/pane'

  actions: {
    onItemSelected: (item) ->
      @set('selected', item)
      @attrs.onItemSelected?(item)
  }
})

`export default BsTabs`

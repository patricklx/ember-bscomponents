`import ItemSelection from 'ember-bscomponents/mixins/item-selection'`
`import template from './template'`
`import Ember from 'ember'`


BsPaginationItem = Ember.Component.extend(ItemSelection, {
  tagName: 'li'
  layout: template
  content: null
})


`export default BsPaginationItem`

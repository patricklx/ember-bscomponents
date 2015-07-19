`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`
`import template from './template'`
`import Ember from 'ember'`


BsPaginationItem = Ember.Component.extend(ItemSelection, {
  tagName: 'li'
  template: template
  content: null
})


`export default BsPaginationItem`

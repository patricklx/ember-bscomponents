`import template from './template'`
`import ItemSelection from 'ember-bscomponents/mixins/item-selection'`

BsBreadcrumbsItem = Ember.Component.extend(ItemSelection, {
  tagName: ['li']
  classNameBindings: ['isActive:active']
  layout: template
})


`export default BsBreadcrumbsItem`

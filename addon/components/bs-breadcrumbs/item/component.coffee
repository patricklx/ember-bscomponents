`import template from './template'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`

BsBreadcrumbsItem = Ember.Component.extend(ItemSelection, {
  tagName: ['li']
  classNameBindings: ['isActive:active']
  template: template
})


`export default BsBreadcrumbsItem`

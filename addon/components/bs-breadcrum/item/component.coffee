`import template from './template'`
`import ItemView from 'ember-cli-bscomponents/helpers/item'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`

BsBreadcrumbsItem = ItemView.extend ItemSelection,
  tagName: ['li']
  classNameBindings: ["isActive:active"]
  template: template


`export default BsBreadcrumbsItem`

`import ItemView from 'ember-cli-bscomponents/helpers/item'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`
`import template from './template'`


BsPaginationItem = ItemView.extend(ItemSelection, {
  #tagName: 'li',
  template: template
})


`export default BsPaginationItem`

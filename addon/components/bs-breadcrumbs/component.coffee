`import Ember from 'ember'`
`import SelectableItems from '../../mixins/selectable-items'`
`import template from '../bs-common/itemlist/template'`

BsBreadcrumbs = Ember.Component.extend(SelectableItems, {
  layout: template
  tagName: ['ol']
  classNames: ['breadcrumb']
  itemComponent: 'bs-breadcrumbs/item'
})

`export default BsBreadcrumbs`

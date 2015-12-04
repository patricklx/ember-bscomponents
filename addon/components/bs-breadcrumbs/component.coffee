`import Ember from 'ember'`
`import SelectableItems from '../../mixins/selectable-items'`
`import template from '../bs-common/template'`

BsBreadcrumbs = Ember.Component.extend(SelectableItems, {
  template: template
  tagName: ['ol']
  classNames: ['breadcrumb']
  itemComponent: 'bs-breadcrumbs/item'
})

`export default BsBreadcrumbs`

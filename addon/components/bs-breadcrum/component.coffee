`import Ember from 'ember'`
`import ItemsView from 'ember-cli-bscomponents/helpers/items-view'`
`import BsBreadcrumbsItem from './item/component'`

BsBreadcrumbs = ItemsView.extend
  tagName: ['ol']
  classNames: ['breadcrumb']
  itemViewClass: BsBreadcrumbsItem


`export default BsBreadcrumbs`

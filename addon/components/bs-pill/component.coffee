`import NavItem from 'ember-cli-bscomponents/mixins/nav-item'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`
`import template from './template'`
`import Ember from 'ember'`

BsPill = Ember.Component.extend(NavItem, ItemSelection, {
  layout: template
  content: null
})

`export default BsPill`

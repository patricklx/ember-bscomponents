`import NavItem from 'ember-cli-bscomponents/mixins/nav-item'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`
`import ItemView from 'ember-cli-bscomponents/helpers/item'`
`import template from './template'`
`import LinkView from './link/component'`

BsPill = ItemView.extend(NavItem, ItemSelection, {
  template: template

  pillAsLinkView: LinkView
})

`export default BsPill`

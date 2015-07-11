`import Nav from 'ember-cli-bscomponents/mixins/nav'`
`import BsPill from 'ember-cli-bscomponents/components/bs-pill/component'`
`import ItemsView from 'ember-cli-bscomponents/helpers/items'`

BsTabs = ItemsView.extend(Nav, {
  navType: 'tabs'
  classNameBindings: ['justified:nav-justified']
  attributeBindings: ['style']

  itemViewClass: BsPill
})

`export default BsTabs`

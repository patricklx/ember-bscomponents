`import BsPill from '../bs-pill/component'`
`import ItemsView from 'ember-cli-bscomponents/helpers/items'`
`import Nav from 'ember-cli-bscomponents/mixins/nav'`

BsPills = ItemsView.extend(Nav,
  navType: 'pills'
  classNameBindings: ['stacked:nav-stacked', 'justified:nav-justified']
  attributeBindings: ['style']

  itemViewClass: BsPill
)

`export default BsPills`

`import Nav from 'ember-cli-bscomponents/mixins/nav'`
`import BsPill from 'ember-cli-bscomponents/mixins/nav'`

BsTabs = ItemsView.extend(Nav,
    navType: 'tabs'
    classNameBindings: ['justified:nav-justified']
    attributeBindings: ['style']

    itemViewClass: BsPill
)

`export default BsTabs`

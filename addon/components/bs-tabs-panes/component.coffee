`import ItemsPanesView from 'ember-cli-bscomponents/helpers/items-panes'`
`import BsTabPane from 'ember-cli-bscomponents/components/bs-tab-pane/component'`

BsTabsPanes = ItemsPanesView.extend({
  classNames: ['tab-content']
  itemViewClass: BsTabPane
})

`export default BsTabsPanes`

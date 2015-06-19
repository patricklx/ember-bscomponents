`import Ember from 'ember'`
`import ItemsSelection from 'ember-cli-bscomponents/mixins/items-selection'`

BsBreadcrumbs = Ember.Component.extend ItemsSelection
  tagName: 'ol'
  classNames: 'breadcrumbs'



`export default BsBreadcrumbs`

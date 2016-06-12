`import Nav from 'ember-bscomponents/mixins/nav'`
`import Ember from 'ember'`
`import template from './template'`
`import SelectableItems from '../../../mixins/selectable-items'`

BsTabs = Ember.Component.extend(Nav, SelectableItems, {
  layout: template
  navType: 'tabs'
  classNameBindings: ['justified:nav-justified']
  attributeBindings: ['style']
  content: []
})

`export default BsTabs`

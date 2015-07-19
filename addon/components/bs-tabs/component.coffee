`import Nav from 'ember-cli-bscomponents/mixins/nav'`
`import Ember from 'ember'`
`import template from './template'`
`import SelectableItems from '../../mixins/selectable-items'`

BsTabs = Ember.Component.extend(Nav, SelectableItems, {
  template: template
  navType: 'tabs'
  classNameBindings: ['justified:nav-justified']
  attributeBindings: ['style']
  content: []
})

`export default BsTabs`

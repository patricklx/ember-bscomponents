`import Ember from 'ember'`
`import SelectableItems from '../../mixins/selectable-items'`
`import template from './template'`

BsListGroupComponent = Ember.Component.extend(SelectableItems, {
  template: template
  withLinks: true
  tagName: (() -> if @get('withLinks') then 'div' else 'ul').property()
  classNames: ['list-group']

  content: []
})

`export default BsListGroupComponent`

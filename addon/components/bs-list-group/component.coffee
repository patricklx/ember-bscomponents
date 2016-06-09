`import Ember from 'ember'`
`import SelectableItems from '../../mixins/selectable-items'`
`import template from './template'`

BsListGroupComponent = Ember.Component.extend(SelectableItems, {
  layout: template
  withLinks: true
  classNames: ['list-group']
  itemComponent: 'bs-list-group/item'

  init: () ->
    @_super()
    @tagName = if @get('withLinks') then 'div' else 'ul'
    return
})

`export default BsListGroupComponent`

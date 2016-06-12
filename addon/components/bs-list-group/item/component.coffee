`import Ember from 'ember'`
`import ItemSelection from 'ember-bscomponents/mixins/item-selection'`
`import template from './template'`

Item = Ember.Component.extend(ItemSelection, {
  layout: template
  withLinks: false
  classNames: ['list-group-item']
  classNameBindings: ['isActive:active', 'disabled:disabled']
  attributeBindings: ['href']
  href: (() ->
    return if @get('withLinks') then '#' else undefined
  ).property('withLinks')

  heading: 'bs-list-group/item/text'
  text: 'bs-list-group/item/text'

  content: null

  init: () ->
    @_super()
    @tagName = if @get('withLinks') then 'a' else 'div'
    return
})

`export default Item`

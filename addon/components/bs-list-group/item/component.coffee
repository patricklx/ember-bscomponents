`import Ember from 'ember'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`
`import template from './template'`

Item = Ember.Component.extend(ItemSelection, {
  template: template
  withLinks: false
  classNames: ['list-group-item']
  tagName: (() -> if @get('withLinks') then 'a' else 'div').property()
  attributeBindings: ['href']
  href: (() ->
    return if @get('withLinks') then '#' else undefined
  ).property('withLinks')

  content: null
})

`export default Item`

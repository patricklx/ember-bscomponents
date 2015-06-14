`import Ember from 'ember'`
`import ItemsView from 'ember-cli-bscomponents/helpers/items-view'`
`import ItemView from 'ember-cli-bscomponents/helpers/item'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`
`import template from './template'`

BsListGroupComponent = ItemsView.extend(
  withLinks: true
  tagName: (() -> if @get('withLinks') then 'div' else 'ul').property('withLinks')
  classNames: ['list-group']
  itemViewClass: ItemView.extend(ItemSelection,
    classNames: ['list-group-item']
    template: template
    tagName: (() -> if @get('withLinks') then 'a' else undefined).property('withLinks')
    attributeBindings: (() -> if @get('withLinks') then ['href'] else []).property('withLinks')
    href: '#'

    badge: (->
      #TODO: Consolidate with ItemView
      content = @get('content')
      return null unless Ember.typeOf(content) is 'instance' or Ember.canInvoke(content, 'get')
      content.get 'badge'
    ).property('content')

    sub: (->
      #TODO: Consolidate with ItemView
      content = @get('content')
      return null unless Ember.typeOf(content) is 'instance' or Ember.canInvoke(content, 'get')
      content.get 'sub'
    ).property('content')
  )
)

`export default BsListGroupComponent`

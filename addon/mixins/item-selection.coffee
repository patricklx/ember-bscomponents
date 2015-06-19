`import Ember from 'ember'`

###
A Mixin to enhance items enhanced with the 'IsItem' Mixin with selection capability.

When a click event is received the current item will be stored in the parent view 'selected' property,
An extra 'active' css class will be assigned to the Item (this) if this is a selected item.
###
ItemSelection = Ember.Mixin.create
  content: []
  selectedItem: null
  titlePath: null

  setItems: (() ->
    path = @get('titlePath')
    if path
      oberserve = 'content.@each.' + path
      computed = Ember.computed.map(oberserve, (item) -> item.get(path))
      @set('items', computed)
    return
  ).on('init')

  items: Ember.computed.alias('content')

  actions:
    change: (item) ->
      @set('selectedItem', item)
      @sendAction('action', item)

`export default ItemSelection`

`import Ember from 'ember'`
###
A Mixin to enhance items enhanced with the 'IsItem' Mixin with selection capability.

When a click event is received the current item will be stored in the parent view 'selected' property,
An extra 'active' css class will be assigned to the Item (this) if this is a selected item.
###
ItemSelection = Ember.Mixin.create({
  classNameBindings: ['isActive:active']
  isActive: false

  ###
  Handle selection by click event.
  ###
  click: (event) ->
    #event.stopPropagation()
    event.preventDefault()
    if @get('disabled') then return
    @attrs.onItemSelected?()
    return
})

`export default ItemSelection`

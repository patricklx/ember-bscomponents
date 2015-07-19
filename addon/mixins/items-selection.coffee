`import Ember from 'ember'`
###
A Mixin to enhance views that extends from 'ItemsView' with selection capability.
###
ItemsSelection = Ember.Mixin.create({
  ###
  If true, multiple selection is supported
  ###
  multiSelection: false

  ###
  An array of selected item(s), can be also bound to a controller property via 'selectedBinding'
  ###
  selected: []

  actions: {
    itemSelected: (item) ->
      if item in @selected
        @selected.removeObject(item)
      else
        @selected.push(item)
      return
  }
})

`export default ItemsSelection`

`import Ember from 'ember'`
###
A Mixin to enhance views that extends from 'ItemsView' with selection capability.
###
ItemsSelection = Ember.Mixin.create({
  ###
  If true, multiple selection is supported
  ###
  multiSelection: false
  isSelectable: true

  ###
  An array of selected item(s), can be also bound to a controller property via 'selectedBinding'
  ###
  selected: null

  init: () ->
    @_super()
    @set('selected', [])

  actions: {
    onItemSelected: (item) ->
      @attrs.onItemSelected?(item)
      if @get('isSelectable')
        if @get('multiSelection')
          if item in @selected
            @get('selected').removeObject(item)
          else
            @get('selected').pushObject(item)
          @set('selected', @get('selected').slice())
        else
          @set('selected', [item])
      return
  }
})

`export default ItemsSelection`

`import Ember from 'ember'`

SelectableItems = Ember.Mixin.create({
  selected: null
  isSelectable: true

  actions: {
    onItemSelected: (item) ->
      if @get('isSelectable')
        @set('selected', item)
      @attrs.onItemSelected?(item)
      return
  }
})

`export default SelectableItems`

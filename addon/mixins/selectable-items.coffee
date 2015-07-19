`import Ember from 'ember'`

SelectableItems = Ember.Mixin.create({
  selected: null

  actions: {
    itemSelected: (item) ->
      @set('selected', item.get('content'))
      return
  }
})

`export default SelectableItems`

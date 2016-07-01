`import Ember from 'ember'`

SelectableItems = Ember.Mixin.create({
  selected: null
  isSelectable: true

  init: () ->
    @_super()
    content = @get('content')
    if typeof content == 'string'
      @set('content', content.split(','))
    return

  actions: {
    onItemSelected: (item) ->
      if @get('isSelectable')
        @set('selected', item)
      @attrs.onItemSelected?(item)
      return
  }
})

`export default SelectableItems`

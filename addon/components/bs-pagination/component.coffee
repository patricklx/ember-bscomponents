`import Ember from 'ember'`
`import SelectableItems from '../../mixins/selectable-items'`
`import template from '../bs-common/itemlist/template'`
`import SizeSupport from 'ember-bscomponents/mixins/size'`

BsPagination = Ember.Component.extend(SelectableItems, SizeSupport, {
  layout: template
  itemComponent: 'bs-pagination/item'

  tagName: 'ul'
  classNames: ['pagination']
  classTypePrefix: 'pagination'

  totalLength: Ember.computed(
    get: () ->
      return 0
    set: (key, val) ->
      if @selected > val
        @send('onItemSelected', val)
      return val
  )
  itemsPerPage: Ember.computed(
    get: () ->
      return 10
    set: (key, val) ->
      if @selected > val
        @send('onItemSelected', val)
      return val
  )
  itemsPerGroup: Ember.computed(
    get: () ->
      return 10
    set: (key, val) ->
      if @selected > val
        @send('onItemSelected', val)
      return val
  )

  selected: 1
  currentPageGroup: 0
  content: (() ->
    nItems = Math.ceil(@get('totalLength') / @get('itemsPerPage'))
    start = @get('itemsPerGroup') * @get('currentPageGroup')
    items = []
    if start > 0
      items.push('«')
    i = 0
    while i < @get('itemsPerGroup') and (start + i < nItems)
      items.push(start + i + 1)
      i++
    if start < nItems - @get('itemsPerGroup')
      items.push('»')

    return items
  ).property('totalLength', 'currentPageGroup')

  actions: {
    onItemSelected: (item) ->
      item = @changeCurrentGroup(item)
      if not @get('rendered')
        return
      @_super(item)
      return
  }

  changeCurrentGroup: (item) ->
    sp = item
    items = @get('content')
    if sp == '»'
      @incrementProperty('currentPageGroup')
      return items[items.length - 2] + 1
    if sp == '«'
      @decrementProperty('currentPageGroup')
      return items[1] - 1
    return item

  didInsertElement: () ->
    Ember.run.next(() =>
      @set('rendered', true)
      return
    )
    return @_super(arguments...)
})

`export default BsPagination`

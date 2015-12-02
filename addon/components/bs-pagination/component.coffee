`import Ember from 'ember'`
`import SelectableItems from '../../mixins/selectable-items'`
`import template from '../bs-common/itemslist.template'`

BsPagination = Ember.Component.extend(SelectableItems, {
  template: template
  init: () ->
    @_super()
    @get('selected')
    @get('itemsPerPage')
    @get('totalLength')
    return

  itemComponent: 'bs-pagination/item'

  tagName: 'ul'
  classNames: ['pagination']
  totalLength: 0
  itemsPerPage: 10
  selected: 1
  currentPageGroup: 0
  pageGroupItems: 10
  content: (() ->
    nItems = Math.ceil(@get('totalLength') / @get('itemsPerPage'))
    start = @get('pageGroupItems') * @get('currentPageGroup')
    items = []
    if start > 0
      items.push('«')
    i = 0
    while i < @get('pageGroupItems') and (start + i < nItems)
      items.push(start + i + 1)
      i++
    if start < nItems - @get('pageGroupItems')
      items.push('»')

    return items
  ).property('totalLength', 'currentPageGroup')

  selectedPageObserver: (() ->
    sp = @get('selected')
    items = @get('content')
    if sp == '»'
      Ember.run.next(this, () ->
        @selected = items[items.length - 2] + 1
        @incrementProperty('currentPageGroup')
        return
      )
    if sp == '«'
      Ember.run.next(this, () ->
        @selected = items[1] - 1
        @decrementProperty('currentPageGroup')
        return
      )
    return
  ).observes('selected')
})

`export default BsPagination`

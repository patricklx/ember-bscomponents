`import Ember from 'ember'`
`import template from './template'`

ItemsActionBar = Ember.Component.extend({
  classNames: 'btn-toolbar'
  classNameBindings: 'rtl:pull-right'
  role: 'toolbar'
  selectedItems: []
  rtl: false

  selection: (() ->
    items = @get('selectedItems')
    return [] if not items?

    if Array.isArray(items)
      return items
    else
      return [items]
  ).property('selectedItems')

})

`export default ItemsActionBar`

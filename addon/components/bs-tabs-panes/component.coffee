`import Ember from 'ember'`
`import template from './template'`

BsTabsPanes = Ember.Component.extend({
  template: template
  classNames: ['tab-content']
  viewsInserted: false
  selected: Ember.computed.alias('corrItemsView.selected')

  corrItemsView: (() ->
    views = @get('container').lookup('-view-registry:main') || Ember.View.views
    itemsView = views[@get('items-id')]
    return itemsView
  ).property('viewsInserted')

  didInsertElement: () ->
    @._super()
    Ember.run.next(this, () ->
      @set('viewsInserted', true)
      return
    )
    return
})

`export default BsTabsPanes`

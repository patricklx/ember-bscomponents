`import Ember from 'ember'`

ItemsPanesView = Ember.CollectionView.extend({
  viewsInserted: false

  corrItemsView: (() ->
    views = @get('container').lookup('-view-registry:main') || Ember.View.views
    itemsView = views[@get('items-id')]
    return itemsView
  ).property('viewsInserted')

  didInsertElement: () ->
    @._super()
    @set('viewsInserted', true)
    return
})

`export default ItemsPanesView`

`import Ember from 'ember'`

ItemsPanesView = Ember.CollectionView.extend(
  viewsInserted: false

  corrItemsView: (->
    views = @get('container').lookup('-view-registry:main') || Ember.View.views;
    itemsView = views[@get('items-id')]
    itemsView
  ).property('viewsInserted')

  didInsertElement: () ->
    @._super()
    @set('viewsInserted', true)
)

`export default ItemsPanesView`

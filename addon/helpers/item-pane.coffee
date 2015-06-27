`import Ember from 'ember'`
`import template from '../views/item-pane/template'`

ItemPaneView = Ember.View.extend(
  template: template

  corrItem: (->
    if @get('parentView.corrItemsView')?
      corrview = @get('parentView.corrItemsView')
      childviews = corrview._childViews || corrview.childViews
      for view in childviews
        return view if view.content is @get('content')
  ).property('parentView.corrItemsView')

  isVisible: (->
    @get('corrItem')?.get('isActive')
  ).property('corrItem.isActive')

  controller: (->
    controller = @get('parentView.controller')
    if @get('content.controller')
      itemController = @get('container').lookup("controller:#{@get('content.controller')}")
      controller = itemController if itemController
    return controller
  ).property('content')

  contextBinding: 'controller'
)


`export default ItemPaneView`

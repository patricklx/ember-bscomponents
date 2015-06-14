`import Ember from 'ember'`
`import template from '../views/item-pane/template'`

ItemPaneView = Ember.View.extend(
    template: template

    corrItem: (->
        if @get('parentView.corrItemsView')?
            for view in @get('parentView.corrItemsView')._childViews
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

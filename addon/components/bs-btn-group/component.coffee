`import Ember from 'ember'`
###
Button Group.

In its simple form, each item in the button group is a Button component,
In case this is a Radio, each item is rendered as a label.
###
BsBtnGroup = ItemsView.extend(SizeSupport, ItemsSelection,
    classTypePrefix: ['btn-group']
    classNames: ['btn-group']
    classNameBindings: ['vertical:btn-group-vertical']
    itemViewClass: BsButtonComponent.extend(ItemValue, ItemSelection,
        init: ->
            @_super()
            @set('icon_active', @get('parentView.icon_active'))
            @set('icon_inactive', @get('parentView.icon_inactive'))
    )
)

`export default BsBtnGroup`

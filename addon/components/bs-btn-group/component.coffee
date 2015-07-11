`import Ember from 'ember'`
`import ItemsView from 'ember-cli-bscomponents/helpers/items'`
`import SizeSupport from 'ember-cli-bscomponents/mixins/size'`
`import ItemSelection from 'ember-cli-bscomponents/mixins/item-selection'`
`import ItemsSelection from 'ember-cli-bscomponents/mixins/items-selection'`
`import ItemValue from 'ember-cli-bscomponents/mixins/item-value'`
`import BsButtonComponent from 'ember-cli-bscomponents/components/bs-button/component'`

###
Button Group.

In its simple form, each item in the button group is a Button component,
In case this is a Radio, each item is rendered as a label.
###
BsBtnGroup = ItemsView.extend(SizeSupport, ItemsSelection, {
  classTypePrefix: ['btn-group']
  classNames: ['btn-group']
  classNameBindings: ['vertical:btn-group-vertical']
  itemViewClass: BsButtonComponent.extend(ItemValue, ItemSelection, {
    init: () ->
      @_super()
      @set('icon_active', @get('parentView.icon_active'))
      @set('icon_inactive', @get('parentView.icon_inactive'))
      return
  })
})

`export default BsBtnGroup`

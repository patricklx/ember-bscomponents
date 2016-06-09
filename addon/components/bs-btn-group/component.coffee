`import Ember from 'ember'`
`import SizeSupport from 'ember-cli-bscomponents/mixins/size'`
`import ItemsSelection from 'ember-cli-bscomponents/mixins/items-selection'`
`import template from './template'`


###
Button Group.

In its simple form, each item in the button group is a Button component,
In case this is a Radio, each item is rendered as a label.
###
BsBtnGroup = Ember.Component.extend(SizeSupport, ItemsSelection, {
  layout: template
  classTypePrefix: ['btn-group']
  classNames: ['btn-group']
  classNameBindings: ['vertical:btn-group-vertical']
  itemComponent: 'bs-button'
})

`export default BsBtnGroup`

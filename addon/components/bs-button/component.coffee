`import Ember from 'ember'`
`import TypeSupport from 'ember-cli-bscomponents/mixins/type'`
`import SizeSupport from 'ember-cli-bscomponents/mixins/size'`
`import layout from './template'`

BsButtonComponent = Ember.Component.extend(TypeSupport, SizeSupport, {
  layout: layout
  tagName: 'button'
  classNames: ['btn']
  classNameBindings: ['blockClass', 'isActive:active']
  classTypePrefix: 'btn'
  block: null
  attributeBindings: ['disabled', '_type:type', 'style']
  _type: 'button'
  bubbles: true
  isActive: false

  blockClass: (() ->
    return if @block then "#{@classTypePrefix}-block" else null
  ).property('block')

  click: (evt) ->
    evt.stopPropagation() unless @get('bubbles')
    @attrs.onClick?()
    return
})

`export default BsButtonComponent`

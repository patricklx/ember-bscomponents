`import Ember from 'ember'`
`import template from './template'`

Item = Ember.Component.extend({
  tagName: ['div']
  classNames: ['btn-group']
  itemViewClass: Ember.View.extend({
    tagName: 'button'
    classNames: ['btn', 'btn-default']
    attributeBindings: ['disabled']
    #FIXME: if transitionTo exist we render the link-to as an inner div coz we need some tag but this will cause
    #only the internal div to be clickable, not the outer 'button' tag so part of the button area wont be clickable
    template: template

    disabled: (->
      return @get('content.disabled')?(@get('parentView.parentView.selection'))
    ).property('parentView.parentView.selection.@each', 'parentView.parentView.selection')

    click: ->
      if @get('content.clickActionName')?
        @get('controller').send(@get('content.clickActionName'), @get('parentView.parentView.selection'))
      else if @get('content.click')
        @get('content.click')(@get('parentView.parentView.selection'))
      return
  })
})

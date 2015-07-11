`import Ember from 'ember'`
`import layout from './template'`

BsWellComponent = Ember.Component.extend({
  layout: layout
  classNameBindings: ['small:well-sm', 'large:well-lg']
  classNames: ['well']

  click: () ->
    @sendAction('clicked')
    return
})


`export default BsWellComponent`

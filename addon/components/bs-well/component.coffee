`import Ember from 'ember'`

BsWellComponent = Ember.Component.extend(
  layoutName: 'components/bs-well'
  classNameBindings: ['small:well-sm', 'large:well-lg']
  classNames: ['well']

  click: ->
    @sendAction('clicked')
)


`export default BsWellComponent`

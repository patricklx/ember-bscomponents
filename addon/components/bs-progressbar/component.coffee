`import Ember from 'ember'`
`import TypeSupport from 'ember-bscomponents/mixins/type'`
`import layout from './template'`

BsProgressbarComponent = Ember.Component.extend(TypeSupport, {
  layout: layout
  classNames: ['progress-bar']
  attributeBindings: ['style', 'role', 'aria-valuemin', 'ariaValueNow:aria-valuenow', 'aria-valuemax']
  classTypePrefix: 'progress-bar'
  role: 'progressbar'
  'aria-valuemin': 0
  'aria-valuemax': 100

  style: (() ->
    return "width:#{@get('progress')}%;".htmlSafe()
  ).property('progress')

  ariaValueNow: (() ->
    return @get('progress')
  ).property('progress')
})

`export default BsProgressbarComponent`

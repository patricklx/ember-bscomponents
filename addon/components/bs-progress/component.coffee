`import Ember from 'ember'`
`import layout from './template'`
###
Parent component of a progressbar component
###
BsProgressComponent = Ember.Component.extend(
  layout: layout
  classNames: ['progress']
  classNameBindings: ['animated:active', 'stripped:progress-striped']

#If specified, a default progressbar is rendered, otherwise the user requires to supply a bs-progressbar sub component
  progress: null
  stripped: false
  animated: false

  default: (->
    @progress
  ).property('progress')
)

`export default BsProgressComponent`

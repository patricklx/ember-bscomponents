`import Ember from 'ember'`


TypeSupport = Ember.Mixin.create(
  classTypePrefix: null
  classNameBindings: ['typeClass']
  type: 'default'

  typeClass: (() ->
    type = @get 'type'
    type = 'default' if not type?

    pref = @get 'classTypePrefix'
    "#{pref}-#{type}"
  ).property('type')
)

`export default TypeSupport`

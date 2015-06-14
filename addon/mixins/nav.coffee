`import Ember from 'ember'`
###
A Mixin that provides the basic configuration for rendering a Bootstrap navigation such as tabs and pills
###
Nav = Ember.Mixin.create(
  classNames: ['nav']
  classNameBindings: ['navTypeClass']
  tagName: 'ul'
  navType: null

  navTypeClass: ( ->
    if @navType? then "nav-#{@navType}" else null
  ).property('navType')
)


`export default Nav`

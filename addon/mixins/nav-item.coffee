`import Ember from 'ember'`
SelectableView = undefined
###
A Mixin that provides the basic configuration for rendering and interacting with Bootstrap navigation item such a pill or a tab.
###
NavItem = Ember.Mixin.create(SelectableView
  #unncessary as Ember magically matches this according to the parent collectionView tag
  #tagName: 'li'
)

`export default NavItem`

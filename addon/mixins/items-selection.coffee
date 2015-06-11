`import Ember from 'ember'`
###
A Mixin to enhance views that extends from 'ItemsView' with selection capability.
###
ItemsSelection = Ember.Mixin.create
    ###
    If true, multiple selection is supported
    ###
    multiSelection: false

    ###
    An array of selected item(s), can be also bound to a controller property via 'selectedBinding'
    ###
    selected: []

`export default ItemsSelection`

import Ember from 'ember'

export default Ember.Component.extend({
  tabs: ['a', 'b', 'c'],
  tabComponents: {
    0: 'docs/bs-tabs/test'
  },

  currentTabContent: Ember.computed('currentTab', function() {
    return this.tabComponents[this.get('currentTab')]
  })
})

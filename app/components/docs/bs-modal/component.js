import Ember from 'ember'

export default Ember.Component.extend({
  currentType: 'info',
  modalManager: Ember.inject.service(),

  actions: {
    showModal() {
      this.get('modalManager').open('docs/bs-modal/test', this, {
        callback() {

        }
      });
    }
  }
})

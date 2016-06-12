import Ember from 'ember'

export default Ember.Component.extend({
  currentProgress: 0,
  didInsertElement() {
    var f = () => {
      this.incrementProperty('currentProgress');
      if( this.get('currentProgress') >= 100 ) {
        this.set('currentProgress', 0)
      }
      setTimeout(f, 50)
    };
    f();
  }
})

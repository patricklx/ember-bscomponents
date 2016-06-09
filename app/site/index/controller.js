/**
 * Created by Patrick on 01/06/2016.
 */
import Ember from 'ember';

export default Ember.Controller.extend({
  docs: ['alert', 'button', 'list-group', 'breadcrumbs',
    'btn-group', 'modal', 'tabs', 'tooltip', 'popover', 'pagination', 'progress'],
  selectedDoc: null,

  currentDoc: Ember.computed('selectedDoc', function () {
    if (!this.get('selectedDoc')) {
      return null;
    }
    return 'docs/bs-' + this.get('selectedDoc');
  })
});

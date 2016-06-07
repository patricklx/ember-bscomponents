/**
 * Created by Patrick on 02/06/2016.
 */
import Ember from 'ember';

export function not([param]) {
  return !param;
}

export default Ember.Helper.helper(not);

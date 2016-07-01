/**
 * Created by Patrick on 02/06/2016.
 */
import Ember from 'ember';

export function eq([param1, param2]) {
  return param1 === param2;
}

export default Ember.Helper.helper(eq);

import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('TooltipBoxManagerService', function(hooks) {
  setupTest(hooks);

  test('exists', function(assert) {
    let service = this.owner.lookup('service:ember-bscomponents@tooltip-box-manager');
    assert.ok(service);
  });
});

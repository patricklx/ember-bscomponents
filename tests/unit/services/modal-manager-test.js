import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('ModalManagerService', function(hooks) {
  setupTest(hooks);

  test('exists', function(assert) {
    let service = this.owner.lookup('service:ember-bscomponents@modal-manager');
    assert.ok(service);
  });
});

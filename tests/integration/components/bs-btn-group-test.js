import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';

module('Integration | Component | bs-btn-group', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    await render(hbs`<BsBtnGroup/>`);
    assert.equal(this.element.children.length, 1);
  });
});

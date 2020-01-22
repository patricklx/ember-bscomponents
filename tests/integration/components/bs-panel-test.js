import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';

module('Integration | Component | bs-panel', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    await render(hbs`<BsPanel/>`);
    assert.equal(this.element.children.length, 1);
  });
});

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render } from '@ember/test-helpers';

module('Integration | Component | bs-progress', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    await render(hbs`<BsProgress/>`);
    assert.equal(this.element.children.length, 1);
  });
});

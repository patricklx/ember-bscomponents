import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, waitUntil } from '@ember/test-helpers';

module('Integration | Component | bs-popover', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    this.set('show', true);
    await render(hbs`<Bs::TooltipboxHandler /> <div><Bs::Popover @triggerOn="manual" @show={{this.show}}>Test</Bs::Popover></div>`);

    assert.equal($('.popover').length, 1);
    assert.ok(this.element.querySelector('.popover') !== null , 'should display popover');

    this.set('show', false);
    await waitUntil(() => $('.popover').length === 0, { timeout: 1000 });
    assert.equal($('.popover').length, 0);

  });
});

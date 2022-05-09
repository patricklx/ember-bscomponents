import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, waitUntil, settled } from '@ember/test-helpers';

module('Integration | Component | bs-popover', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    await render(hbs`<Bs::TooltipboxHandler /> <div><Bs::Popover @triggerOn="manual" @show={{this.show}}>Test</Bs::Popover></div>`);
    this.set('show', true);
    await settled();

    assert.ok(this.element.querySelector('.popover') !== null , 'should display popover');
    assert.equal(this.element.querySelectorAll('.popover').length, 1);
    this.set('show', false);

    await waitUntil(() => this.element.querySelectorAll('.popover').length === 0, { timeout: 1000 , timeoutMessage: 'should hide popover'});
    assert.equal(this.element.querySelectorAll('.popover').length, 0);

  });
});

import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';

module('Integration | Component | bs-popover', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    this.set('show', true);
    await render(hbs`<BsTooltipboxHandler /> <div><BsPopover @triggerOn="manual" @show={{this.show}}>Test</BsPopover></div>`);
    await settled();
    assert.equal($('.popover').length, 1);
    assert.ok(this.element.querySelector('.popover') !== null , 'should display popover');

    this.set('show', false);
    await settled();
    assert.equal($('.popover').length, 0);

  });
});

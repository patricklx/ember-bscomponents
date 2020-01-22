import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';

module('Integration | Component | bs-popover', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    await render(hbs`<BsTooltipboxHandler /> <div><BsPopover @triggerOn="manual" @show={{true}}>Test</BsPopover></div>`);
    await settled();
    assert.ok(this.element.querySelector('.popover') !== null , 'should display popover');
    assert.equal(this.element.children.length, 2);
  });
});

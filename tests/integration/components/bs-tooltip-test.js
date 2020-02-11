import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';

module('Integration | Component | bs-tooltip', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    await render(hbs`<BsTooltipboxHandler /> <div><BsTooltip @triggerOn="manual" @show={{true}}>Test</BsTooltip></div>`);
    await settled();
    assert.ok($('.tooltip') !== null , 'should display tooltip');
    assert.equal(this.element.children.length, 2);
  });
});

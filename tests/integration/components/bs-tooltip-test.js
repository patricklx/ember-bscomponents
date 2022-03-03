import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';

module('Integration | Component | bs-tooltip', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    await render(hbs`<Bs::TooltipboxHandler /> <div><Bs::Tooltip @triggerOn="manual" @show={{true}}>Test</Bs::Tooltip></div>`);
    assert.ok($('.tooltip') !== null , 'should display tooltip');
  });
});

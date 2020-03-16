import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { render, settled } from '@ember/test-helpers';

module('Integration | Component | bs-tooltip', (hooks) => {
  setupRenderingTest(hooks);

  test('render', async function(assert) {
    this.set('show', true);
    await render(hbs`<div><BsTooltipboxHandler /> <div><BsTooltip @triggerOn="manual" @show={{this.show}}>Test</BsTooltip></div></div>`);
    await settled();

    assert.ok(this.element.querySelector('.tooltip') !== null , 'should display tooltip');
    assert.equal(this.element.children.length, 1);
  });
});

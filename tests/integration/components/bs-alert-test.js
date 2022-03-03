import { setupRenderingTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { hbs } from 'ember-cli-htmlbars';
import { click, render } from '@ember/test-helpers';

module('Integration | Component | bs-alert', (hooks) => {
  setupRenderingTest(hooks);

  test('check has button', async function(assert) {
    this.set('dismissible', true);

    await render(hbs`<Bs::Alert @dismissible={{this.dismissible}}/>`);
    assert.equal(this.element.querySelector('a') !== null, true, 'no close button');
    assert.equal(this.element.querySelector('div.alert.in') !== null, true, 'alert is showing');

    this.set('dismissible', false);
    assert.equal(this.element.querySelector('a') , null, 'dismiss is false and close button is not displayed');
  });

  test('trigger close action', async function(assert) {
    this.set('dismissed', (actual) => {
      assert.ok(true, 'external Action was called!');
    });

    await render(hbs`<Bs::Alert @dismissible={{true}} @onDismiss={{fn this.dismissed}} />`);
    await click('a.close');

    assert.equal(this.element.querySelector('div.alert.in'), null, 'alert should not show');
  });

  test('auto dismiss', async function(assert) {

    await render(hbs`<Bs::Alert @dismissAfter={{0.1}} />`);


    assert.ok(this.element.querySelector('div.alert.in') === null, 'alert should not show');
  });
});

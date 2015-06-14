`import { bsBindTooltip } from '../../../helpers/bs-bind-tooltip'`
`import { module, test } from 'qunit'`

module 'BsBindTooltipHelper'

# Replace this with your real tests.
test('it works', (assert) ->
  assert.expect(2)
  params = null
  hash = {a: 'b'}
  options = {
    element: {}
  }
  env = {dom: {
    setAttribute: (element, attribute, value) ->
      assert.ok(true)
  }, data: {
    view: {
      on: (what, fn) ->
        assert.ok(true)
    }
  }}
  Ember.run(() ->
    bsBindTooltip(params, hash, options, env)
  )
)

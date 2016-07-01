`import { bsBindTooltip } from '../../../helpers/bs-bind-tooltip'`
`import { module, test } from 'qunit'`

module('BsBindTooltipHelper')

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
      return
  }, data: {
    view: {
      container: {
        lookup: () ->
          return {
          attribute: 'an-attribute'
          registerTip: (type, hash, options, env) ->
            assert.ok(true)
            return
          }
      }
    }
  }}
  Ember.run(() ->
    bsBindTooltip(params, hash, options, env)
    return
  )
  return
)

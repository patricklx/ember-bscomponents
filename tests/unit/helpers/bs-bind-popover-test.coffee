`import { bsBindPopover } from '../../../helpers/bs-bind-popover'`
`import { module, test } from 'qunit'`

module('BsBindPopoverHelper')

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
      container: {
        lookup: () ->
          return {
            attribute: 'an-attribute'
            registerTip: (type, hash, options, env) ->
              assert.ok(true)
          }
      }
    }
  }}
  Ember.run(() ->
    bsBindPopover(params, hash, options, env)
  )
)

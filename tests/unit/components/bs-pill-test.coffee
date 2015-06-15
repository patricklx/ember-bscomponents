`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`


moduleForComponent('bs-pill',
  needs: ['component:bs-pill']
)


test('is it there?', (assert) ->
  component = @subject
  this.$()
  assert.ok(component?)
)

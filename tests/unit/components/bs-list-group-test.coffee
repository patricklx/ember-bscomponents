`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`


moduleForComponent('bs-list-group',
  needs: ['component:bs-list-group']
)


test('is it there?', (assert) ->
  component = @subject
  this.$()
  assert.ok(component?)
)

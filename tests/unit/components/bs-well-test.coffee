`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`


moduleForComponent('bs-well',
  needs: ['component:bs-well']
)


test('is it there?', (assert) ->
  component = @subject
  assert.ok(component?)
)
`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`


moduleForComponent('bs-btn-toolbar',
  needs: ['component:bs-btn-toolbar']
)


test('is it there?', (assert) ->
  component = @subject
  assert.ok(component?)
)

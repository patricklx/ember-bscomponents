`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`


moduleForComponent('bs-tabs-panes',
  needs: ['component:bs-tabs-panes']
)


test('is it there?', (assert) ->
  component = @subject
  assert.ok(component?)
)
`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`


moduleForComponent('bs-tooltipbox-handler',
  needs: ['component:bs-tooltipbox-handler']
)


test('is it there?', (assert) ->
  component = @subject
  this.$()
  assert.ok(component?)
)

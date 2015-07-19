`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`


moduleForComponent('bs-tabs', {
  needs: ['component:bs-tabs', 'helper:is-equal', 'component:bs-pill', 'component:bs-pill-link']
})


test('is it there?', (assert) ->
  component = @subject({
    content: ['a', 'b', 'c']
  })
  this.$()
  assert.ok(component?)
  Ember.run(() ->
    component.remove()
  )
)

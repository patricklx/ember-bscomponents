`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`

app = startApp()

moduleForComponent('bs-popover', {
  needs: ['component:bs-popover']
})


test('is it there?', (assert) ->
  service = app.__container__.lookup('service:tooltip-box-manager')
  $(app.rootElement).attr(service.attribute, 1)
  component = @subject({
    tip_id: 1
    tooltipBoxManager: service
  })
  Ember.run(this, () ->
    this.$()
    return
  )

  assert.ok(component?)
  return
)

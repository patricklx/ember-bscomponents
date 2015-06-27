`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`

app = startApp()

moduleForComponent('bs-tooltip',
  needs: ['component:bs-tooltip']
)


test('is it there?', (assert) ->
  service = app.__container__.lookup('service:tooltip-box-manager')
  $(app.rootElement).attr(service.attribute, 1)
  component = @subject(
    tip_id: 1
    tooltipBoxManager: service
    title: 'test'
    data: {}
  )
  Ember.run(this, () ->
    this.$()
  )

  assert.ok(component?)
)

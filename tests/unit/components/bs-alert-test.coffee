`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`

startApp()
moduleForComponent('bs-alert', {
  needs: ['component:bs-alert']
})


test('check has button', (assert) ->
  component = @subject()

  assert.ok(@$().find('a').length > 0, 'no close button')


  Ember.run(() ->
    component.set('dismiss', false)
    return
  )
  assert.ok(@$().find('a').length == 0, 'dismiss is false, but close button still there')
  return
)


test('trigger close action', (assert) ->
  assert.expect(3)
  component = @subject()

  targetObject = {
    externalAction: (parameter) ->
      # we have the assertion here which will be
      # called when the action is triggered
      assert.ok(true, 'external Action was called!')
      assert.ok(parameter == 'something', 'parameter was not passed')
      return
  }
  # setup a fake external action to be called when
  # button is clicked
  component.set('close', 'externalAction')
  component.set('closedParam', 'something')

  # set the targetObject to our dummy object (this
  # is where sendAction will send its action to)
  component.set('targetObject', targetObject)
  @$().find('a.close').click()

  assert.ok(@$() == undefined, 'component should have been destroyed')
  return
)


test('auto dismiss', (assert) ->
  assert.expect(1)
  component = @subject({
    dismissAfter: 0.1
  })

  @$()
  wait().then(() =>
    assert.ok(@$() == undefined, 'component should have been destroyed')
    return
  )
  return
)

`import Ember from 'ember'`
`import { test, moduleForComponent } from 'ember-qunit'`
`import startApp from "../../helpers/start-app"`

app = null

moduleForComponent('bs-tabs-panes',
  needs: ['component:bs-tabs-panes', 'component:bs-tabs']
  beforeEach: () ->
    app = startApp()
    return
  afterEach: () ->
    Ember.run(() ->
      app.destroy()
    )
    return
)

Ember.TEMPLATES['test-tab-panes'] = Ember.Handlebars.compile('<div id="some-tab-pane"></div>')


test('does it work?', (assert) ->
  template = Ember.Handlebars.compile("""
    {{bs-tabs id="tabs1" content=data.content}}
    {{bs-tab-panes items-id="tabs1" content=data.content}}
  """)
  data = {
    content: [{
      title: 'a',
      template: 'test-tab-panes'
    }]
  }

  view = Ember.View.create(
    container: app.__container__
    template: template
    data: data
  )
  Ember.run(() ->
    view.appendTo(app.rootElement)
  )
  html = view.$().html()
)

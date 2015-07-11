`import Ember from 'ember'`

WithRouter = Ember.Mixin.create({
  router: Ember.computed(() ->
    return get(this, 'controller').container.lookup('router:main')
  )
})

`export default WithRouter`

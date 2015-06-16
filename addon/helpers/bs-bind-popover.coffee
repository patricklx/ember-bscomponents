
helperFunction = (params, hash, options, env) ->
    newHash = {}
    for k,v of hash
      if v.isStream
        newHash[k+"Binding"] = v
      else
        newHash[k] = v
    hash = Ember.Object.create(newHash)

    manager = env.data.view.container.lookup('service:tooltip-box-manager')
    id = manager.registerTip("popover", hash, options, env)
    env.dom.setAttribute(options.element, manager.attribute, id)
    return

`export default helperFunction`

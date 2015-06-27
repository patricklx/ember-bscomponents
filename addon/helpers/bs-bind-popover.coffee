
helperFunction = (params, hash, options, env) ->
  view = env.view || env.data.view
  manager = view.container.lookup('service:tooltip-box-manager')
  if env.dom.getAttribute? and env.dom.getAttribute(options.element, manager.attribute)
    return
  newHash = {}
  for k,v of hash
    if v.isStream
      newHash[k+"Binding"] = v
    else
      newHash[k] = v
  hash = Ember.Object.create(newHash)

  manager = view.container.lookup('service:tooltip-box-manager')
  id = manager.registerTip("popover", hash, options, env)
  env.dom.setAttribute(options.element, manager.attribute, id)
  return

`export default helperFunction`

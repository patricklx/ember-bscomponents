`import Ember from 'ember'`

BsBindTooltipHelper = (node, env, scope, params, hash, template, inverse, visitor) ->
  view = env.view || env.data.view
  manager = Ember.getOwner(view).lookup('service:tooltip-box-manager')
  if env.dom.getAttribute? and env.dom.getAttribute(node.element, manager.attribute)
    return
  newHash = {}
  for k,v of hash
    if v.isStream
      newHash[k+'Binding'] = v
    else
      newHash[k] = v
  hash = Ember.Object.create(newHash)

  id = manager.registerTip('tooltip', params[0] or hash, node, env)
  env.dom.setAttribute(node.element, manager.attribute, id)
  return

`export default BsBindTooltipHelper`

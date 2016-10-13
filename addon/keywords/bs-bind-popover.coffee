`import Ember from 'ember'`
try
  StreamUtils = Ember.__loader.require('ember-metal/streams/utils')
  if not StreamUtils.isStream
    throw 'no isStream'
catch
  StreamUtils = Ember.__loader.require('ember-htmlbars/streams/utils')

BsBindPopoverHelper = (node, env, scope, params, hash, template, inverse, visitor) ->
  view = env.view || env.data.view
  manager = Ember.getOwner(view).lookup('service:tooltip-box-manager')
  if env.dom.getAttribute? and env.dom.getAttribute(node.element, manager.attribute)
    return
  newHash = {}
  for k,v of hash
    if StreamUtils.isStream(v)
      newHash[k] = v.value()
      v.subscribe((s) ->
        newHash[k] = s.value()
      )
    else
      newHash[k] = v
  hash = Ember.Object.create(newHash)

  id = manager.registerTip('popover', params[0] or hash, node, env)
  env.dom.setAttribute(node.element, manager.attribute, id)
  return

`export default BsBindPopoverHelper`

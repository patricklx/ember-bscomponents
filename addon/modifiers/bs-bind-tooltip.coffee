`import Ember from 'ember'`

bsBindPopover = (state) ->
  {dom, element, params, hash, view, manager} = state
  if dom.getAttribute? and dom.getAttribute(element, manager.attribute)
    return

  out = {};
  for i in [0...hash.names.length]
    key = hash.names[i]
    ref = hash.get(key)
    out[key] = ref.value()
  hash = out
  if params[0]
    hash.content = params[0]
  id = manager.registerTip('tooltip', hash, element, view)
  dom.setAttribute(element, manager.attribute, id)
  state.id = id
  state.hashValues = hash
  return

class TooltipModifierManager
  create: (element, args, dynamicScope, dom) ->
    { named, positional, tag } = args.capture()
    return {
      element: element
      dom: dom
      view: dynamicScope.view
      params: positional
      hash: named
      tag: tag
      manager: Ember.getOwner(dynamicScope.view).lookup('service:tooltip-box-manager')
      destroy: () ->
        pop = @manager.removeTip(@id)
        if pop then $(pop.element).unbind()
        delete @manager.registeredTips[@id]
        return
    }

  getTag: (state) ->
    return state.tag

  install: (state) ->
    bsBindPopover(state)
    return

  update: (state) ->

    { hash, params } = state
    keys = hash.keys;
    values = hash.references;

    for i in [0...keys.length]
      key = keys[i]
      ref = values[i]
      state.hashValues[key] = ref.value()

    if params[0]
      state.hashValues.content = params[0]
    return

  getDestructor: (modifier) ->
    return modifier;


`export default TooltipModifierManager`

`import Ember from 'ember'`
`import TooltipBoxManager from '../services/tooltipbox-manager'`

BsBindTooltipHelper = (morph, env, scope, params, hash, template, inverse, visitor) ->
    newHash = {}
    for k,v of hash
      v = hash[k]
      if v.isStream
        newHash[k+"Binding"] = v
      else
        newHash[k] = v
    hash = Ember.Object.create(newHash)

    id = TooltipBoxManager.registerTip("tooltip", hash, options, env)
    env.dom.setAttribute(options.element, TooltipBoxManager.attribute, id)
    return

`export default BsBindTooltipHelper`

`import Ember from 'ember'`
`import TooltipBoxManager from '../managers/tooltipbox-manager'`

BsBindPopoverHelper = (morph, env, scope, params, hash, template, inverse, visitor) ->
    newHash = {}
    for k,v of hash
      if v.isStream
        newHash[k+"Binding"] = v
      else
        newHash[k] = v
    hash = Ember.Object.create(newHash)

    id = TooltipBoxManager.registerTip("popover", hash, options, env)
    env.dom.setAttribute(options.element, TooltipBoxManager.attribute, id)
    return

`export default BsBindPopoverHelper`
